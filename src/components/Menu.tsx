import React, { useState } from 'react';
import '../styles/Menu.css';
import menuPreview from '../assets/menu-preview.png';
import PDFViewer from './PDFViewer';
import menuPdf from '../assets/menu_drinks/menu.pdf';
import drinksPdf from '../assets/menu_drinks/drinks.pdf';

const Menu: React.FC = () => {
  const [pdfViewer, setPdfViewer] = useState<{
    isOpen: boolean;
    pdfUrl: string;
    title: string;
  }>({ isOpen: false, pdfUrl: '', title: '' });

  const openPDF = (pdfUrl: string, title: string) => {
    setPdfViewer({ isOpen: true, pdfUrl, title });
  };

  const closePDF = () => {
    setPdfViewer({ isOpen: false, pdfUrl: '', title: '' });
  };

  return (
    <section className="menu" id="menu">
      <div className="menu-container">
        <h2 className="menu-title">THE MENUS</h2>
        
        <div className="menu-showcase">
          <div className="menu-section food-section" onClick={() => openPDF(menuPdf, 'Food Menu')}>
            <h3>Food</h3>
            <p className="menu-section-subtitle">VIEW MENU</p>
          </div>
          
          <div className="menu-image-container">
             <img src={menuPreview} alt="Menu Preview" className="menu-preview-image" />
             <button className="see-full-menu-btn" onClick={() => openPDF(menuPdf, 'Food Menu')}>See Full Menu</button>
           </div>
          
          <div className="menu-section drinks-section" onClick={() => openPDF(drinksPdf, 'Drinks Menu')}>
            <h3>Drinks</h3>
            <p className="menu-section-subtitle">VIEW MENU</p>
          </div>
        </div>
        
        <PDFViewer
          isOpen={pdfViewer.isOpen}
          onClose={closePDF}
          pdfUrl={pdfViewer.pdfUrl}
          title={pdfViewer.title}
        />
      </div>
    </section>
  );
};

export default Menu;
