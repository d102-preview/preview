import Modal from '@/components/@common/Modal/Modal';
import { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const PDFViewer = ({ file, onClose }: { file: string; onClose: () => void }) => {
  const [numPages, setNumPages] = useState(0);

  function onDocumentLoadSuccess({ numPages }: any) {
    setNumPages(numPages);
  }

  return (
    <Modal width="w-[800px]" onClose={onClose}>
      <div className="w-full max-h-[90vh] overflow-y-scroll">
        <Document file={file} onLoadSuccess={onDocumentLoadSuccess}>
          {Array.from(new Array(numPages), (_, index) => (
            <Page key={`page_${index + 1}`} pageNumber={index + 1} width={760} />
          ))}
        </Document>
      </div>
    </Modal>
  );
};

export default PDFViewer;
