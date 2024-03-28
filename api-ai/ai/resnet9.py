import torch
import torch.nn as nn
import torch.nn.functional as F


def conv_block(
    in_channels,
    out_channels,
    pool=False,
    kernel_size=3,
    padding=1,
    stride=1,
    pool_kernel_size=2,
):
    layers = [
        nn.Conv2d(
            in_channels,
            out_channels,
            kernel_size=kernel_size,
            padding=padding,
            stride=stride,
        ),
        nn.BatchNorm2d(out_channels),
        nn.ReLU(inplace=True),
    ]

    if pool:
        layers.append(nn.MaxPool2d(kernel_size=pool_kernel_size))

    return nn.Sequential(*layers)


def accuracy(outputs, labels):
    _, preds = torch.max(outputs, dim=1)
    return torch.tensor(torch.sum(preds == labels).item() / len(preds))


class ImageClassificationBase(nn.Module):
    def training_step(self, batch):
        inputs, labels = batch
        outputs = self(inputs)
        loss = F.cross_entropy(outputs, labels)
        acc = accuracy(outputs, labels)
        return {"loss": loss, "acc": acc.detach()}

    def validation_step(self, batch):
        inputs, labels = batch
        outputs = self(inputs)
        loss = F.cross_entropy(outputs, labels)
        acc = accuracy(outputs, labels)
        return {"val_loss": loss.detach(), "val_acc": acc.detach()}

    def get_metrics_epoch_end(self, outputs, validation=True):
        if validation:
            loss_ = "val_loss"
            acc_ = "val_acc"
        else:
            loss_ = "loss"
            acc_ = "acc"

        batch_losses = [x[f"{loss_}"] for x in outputs]
        epoch_loss = torch.stack(batch_losses).mean()

        batch_accs = [x[f"{acc_}"] for x in outputs]
        epoch_acc = torch.stack(batch_accs).mean()

        return {
            f"{loss_}": epoch_loss.detach().item(),
            f"{acc_}": epoch_acc.detach().item(),
        }

    def epoch_end(self, epoch, result, num_epochs):
        print(
            f"Epoch: {epoch+1}/{num_epochs} -> lr: {result['lrs'][-1]:.5f} "
            f"loss: {result['loss']:.4f}, acc: {result['acc']:.4f}, "
            f"val_loss: {result['val_loss']:.4f}, val_acc: {result['val_acc']:.4f}\n"
        )


class ResNet9(ImageClassificationBase):
    def __init__(self, in_channels, num_classes):
        super().__init__()
        # 48 - 3 + 2 + 1 = 48
        self.conv1 = conv_block(in_channels, 48, pool=True)
        self.conv2 = conv_block(48, 96, pool=True)
        self.res1 = nn.Sequential(
            conv_block(96, 96),
            conv_block(96, 96),
        )

        self.conv3 = conv_block(96, 192, pool=True)
        self.conv4 = conv_block(192, 384, pool=True)

        self.res2 = nn.Sequential(conv_block(384, 384), conv_block(384, 384))

        self.classifier = nn.Sequential(
            nn.AdaptiveMaxPool2d((1, 1)),
            nn.Flatten(),
            nn.Dropout(0.2),
            nn.Linear(384, num_classes),
        )
        self.network = nn.Sequential(
            self.conv1,
            self.conv2,
            self.res1,
            self.conv3,
            self.conv4,
            self.res2,
            self.classifier,
        )

    def forward(self, xb):
        out = self.conv1(xb)
        out = self.conv2(out)
        out = self.res1(out) + out
        out = self.conv3(out)
        out = self.conv4(out)
        out = self.res2(out) + out
        out = self.classifier(out)
        return out
