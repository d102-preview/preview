import numpy as np

np.bool = np.bool_

import os

import gluonnlp as nlp
import numpy as np
import pandas as pd
import torch
from kobert_tokenizer import KoBERTTokenizer
from loguru import logger
from torch import nn
from torch.utils.data import Dataset
from transformers import BertModel


class BERTSentenceTransform:

    def __init__(self, tokenizer, max_seq_length, vocab, pad=True, pair=True):
        self._tokenizer = tokenizer
        self._max_seq_length = max_seq_length
        self._pad = pad
        self._pair = pair
        self._vocab = vocab

    def __call__(self, line):
        # convert to unicode
        text_a = line[0]
        if self._pair:
            assert len(line) == 2
            text_b = line[1]

        tokens_a = self._tokenizer.tokenize(text_a)
        tokens_b = None

        if self._pair:
            tokens_b = self._tokenizer(text_b)

        if tokens_b:
            # Modifies `tokens_a` and `tokens_b` in place so that the total
            # length is less than the specified length.
            # Account for [CLS], [SEP], [SEP] with "- 3"
            self._truncate_seq_pair(tokens_a, tokens_b, self._max_seq_length - 3)
        else:
            # Account for [CLS] and [SEP] with "- 2"
            if len(tokens_a) > self._max_seq_length - 2:
                tokens_a = tokens_a[0 : (self._max_seq_length - 2)]

        # The embedding vectors for `type=0` and `type=1` were learned during
        # pre-training and are added to the wordpiece embedding vector
        # (and position vector). This is not *strictly* necessary since
        # the [SEP] token unambiguously separates the sequences, but it makes
        # it easier for the model to learn the concept of sequences.

        # For classification tasks, the first vector (corresponding to [CLS]) is
        # used as as the "sentence vector". Note that this only makes sense because
        # the entire model is fine-tuned.
        # vocab = self._tokenizer.vocab
        vocab = self._vocab
        tokens = []
        tokens.append(vocab.cls_token)
        tokens.extend(tokens_a)
        tokens.append(vocab.sep_token)
        segment_ids = [0] * len(tokens)

        if tokens_b:
            tokens.extend(tokens_b)
            tokens.append(vocab.sep_token)
            segment_ids.extend([1] * (len(tokens) - len(segment_ids)))

        input_ids = self._tokenizer.convert_tokens_to_ids(tokens)

        # The valid length of sentences. Only real  tokens are attended to.
        valid_length = len(input_ids)

        if self._pad:
            # Zero-pad up to the sequence length.
            padding_length = self._max_seq_length - valid_length
            # use padding tokens for the rest
            input_ids.extend([vocab[vocab.padding_token]] * padding_length)
            segment_ids.extend([0] * padding_length)

        return (
            np.array(input_ids, dtype="int32"),
            np.array(valid_length, dtype="int32"),
            np.array(segment_ids, dtype="int32"),
        )


class BERTDataset(Dataset):
    def __init__(
        self, dataset, sent_idx, label_idx, bert_tokenizer, vocab, max_len, pad, pair
    ):
        transform = BERTSentenceTransform(
            bert_tokenizer, max_seq_length=max_len, vocab=vocab, pad=pad, pair=pair
        )

        self.sentences = [transform([i[sent_idx]]) for i in dataset]
        self.labels = [np.int32(i[label_idx]) for i in dataset]

    def __getitem__(self, i):
        return self.sentences[i] + (self.labels[i],)

    def __len__(self):
        return len(self.labels)


class BERTClassifier(nn.Module):
    def __init__(self, bert, hidden_size=768, num_classes=2, dr_rate=None, params=None):
        super(BERTClassifier, self).__init__()
        self.bert = bert
        self.dr_rate = dr_rate

        self.classifier = nn.Linear(hidden_size, num_classes)
        if dr_rate:
            self.dropout = nn.Dropout(p=dr_rate)

    def gen_attention_mask(self, token_ids, valid_length):
        attention_mask = torch.zeros_like(token_ids)
        for i, v in enumerate(valid_length):
            attention_mask[i][:v] = 1
        return attention_mask.float()

    def forward(self, token_ids, valid_length, segment_ids):
        attention_mask = self.gen_attention_mask(token_ids, valid_length)

        _, pooler = self.bert(
            input_ids=token_ids,
            token_type_ids=segment_ids.long(),
            attention_mask=attention_mask.float().to(token_ids.device),
        )
        if self.dr_rate:
            out = self.dropout(pooler)
        else:
            out = pooler
        return self.classifier(out)


class KobertModel:
    def __init__(self) -> None:
        self._pretrained = "skt/kobert-base-v1"
        self._tokenizer = KoBERTTokenizer.from_pretrained(self._pretrained)
        self._vocab = nlp.vocab.BERTVocab.from_sentencepiece(
            self._tokenizer.vocab_file, padding_token="[PAD]"
        )

        self._max_len = 128
        self._batch_size = 64

        self._device = torch.device("cpu")

        self._bertmodel = BertModel.from_pretrained(self._pretrained, return_dict=False)
        self._model = BERTClassifier(self._bertmodel, num_classes=16)
        self._model.load_state_dict(
            torch.load(
                os.path.join(os.getcwd(), "ai/models/KoBERT/model_state_dict.pt"),
                map_location=self._device,
            )
        )
        self._model.to(self._device)

        self._intent_labels = pd.read_csv(
            os.path.join(os.getcwd(), "ai/data/intent_labels.tsv"),
            sep="\t",
            encoding="utf8",
        )

    def get_intent_labels(self) -> pd.DataFrame:
        return self._intent_labels

    def predict(self, sentence):
        dataset = [[sentence, "0"]]
        test = BERTDataset(
            dataset, 0, 1, self._tokenizer, self._vocab, self._max_len, True, False
        )
        test_dataloader = torch.utils.data.DataLoader(
            test, batch_size=self._batch_size, num_workers=2
        )

        self._model.eval()

        answer = 0

        for batch_id, (token_ids, valid_length, segment_ids, label) in enumerate(
            test_dataloader
        ):
            token_ids = token_ids.long().to(self._device)
            segment_ids = segment_ids.long().to(self._device)
            label = label.long().to(self._device)
            out = self._model(token_ids, valid_length, segment_ids)
            for logits in out:
                logits = logits.detach().cpu().numpy()
                answer = np.argmax(logits)
        return answer


kobert_model = KobertModel()
