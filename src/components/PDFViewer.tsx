import React from 'react';


type props = {
    pdfUrl: string;
}
const PdfViewer = ({pdfUrl}: props) => {
    return (
        <iframe
        src={`https://docs.google.com/viewer?url=${pdfUrl}&embedded=true`}
        className="w-full h-full">
        </iframe>


    );
};

export default PdfViewer;