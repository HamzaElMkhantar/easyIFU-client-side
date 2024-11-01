import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const PdfViewer = () => {
  const { ifuId } = useParams(); // Get the ifuId from the URL params
  const [pdfData, setPdfData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPdf = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/pdf/${ifuId}`, { responseType: 'arraybuffer' });
        const base64 = Buffer.from(response.data, 'binary').toString('base64'); // Convert to base64
        setPdfData(`data:application/pdf;base64,${base64}`); // Set the PDF data as a base64 string
      } catch (err) {
        setError('Failed to load PDF file.');
        console.error(err);
      }
    };

    fetchPdf();
  }, [ifuId]);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div style={{width:'100vw', minHeight:'100vh'}} >
      {pdfData ? (
        <iframe
          src={pdfData}
          style={{ width: '100%', height: '100vh' }}
          title="PDF Viewer"
        />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default PdfViewer;
