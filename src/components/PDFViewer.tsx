import React, { useState, useEffect } from 'react';
import '../styles/PDFViewer.css';

interface PDFViewerProps {
  isOpen: boolean;
  onClose: () => void;
  pdfUrl: string;
  title: string;
}

const PDFViewer: React.FC<PDFViewerProps> = ({ isOpen, onClose, pdfUrl, title }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setIsLoading(true);
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleIframeLoad = () => {
    setIsLoading(false);
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="pdf-viewer-overlay" onClick={handleOverlayClick}>
      <div className="pdf-viewer-container">
        <div className="pdf-viewer-header">
          <h3 className="pdf-viewer-title">{title}</h3>
          <button className="pdf-viewer-close" onClick={onClose}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
        
        {isLoading && (
          <div className="pdf-viewer-loading">
            <div className="loading-spinner"></div>
            <p>Loading menu...</p>
          </div>
        )}
        
        <div className="pdf-viewer-content">
          <iframe
            src={`${pdfUrl}#toolbar=0&navpanes=0&scrollbar=0&statusbar=0&messages=0&scrollbar=0`}
            title={title}
            className="pdf-iframe"
            onLoad={handleIframeLoad}
          />
        </div>
        
        <div className="pdf-viewer-actions">
          <a 
            href={pdfUrl} 
            download 
            className="pdf-download-btn"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Download
          </a>
        </div>
      </div>
    </div>
  );
};

export default PDFViewer;