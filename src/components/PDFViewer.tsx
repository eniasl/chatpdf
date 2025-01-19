import React from 'react';

type Props = {
    pdfUrl: string;
}

const PDFViewer = ({ pdfUrl }: Props) => {
    return (
        <iframe
            src={`https://docs.google.com/viewer?url=${pdfUrl}&embedded=true`}
            className="w-full h-full bg-gradient-to-br from-emerald-50 via-white to-emerald-100"
        />
    );
};

export default PDFViewer;

