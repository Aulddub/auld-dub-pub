import React, { useState, useEffect } from 'react';
import '../styles/Menu.css';
import menuPreview from '../assets/menu-preview.png';
import PDFViewer from './PDFViewer';
import { db } from '../config/firebase';
import { collection, getDocs } from 'firebase/firestore';
import menuPdf from '../assets/menu_drinks/menu.pdf';
import drinksPdf from '../assets/menu_drinks/drinks.pdf';

interface MenuPDF {
  id: string;
  name: string;
  type: 'food' | 'drinks' | 'seasonal';
  pdfUrl: string;
  fileName: string;
  isActive: boolean;
  uploadDate: string;
}

const Menu: React.FC = () => {
  const [pdfViewer, setPdfViewer] = useState<{
    isOpen: boolean;
    pdfUrl: string;
    title: string;
  }>({ isOpen: false, pdfUrl: '', title: '' });
  
  const [dynamicMenus, setDynamicMenus] = useState<MenuPDF[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMenus = async () => {
      try {
        const menusCollection = collection(db, 'menus');
        const menusSnapshot = await getDocs(menusCollection);
        const menusList = menusSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as MenuPDF[];
        
        // Фильтруем только активные меню
        const activeMenus = menusList.filter(menu => menu.isActive);
        setDynamicMenus(activeMenus);
      } catch (error) {
        console.error('Error fetching menus:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMenus();
  }, []);

  const openPDF = (pdfUrl: string, title: string) => {
    setPdfViewer({ isOpen: true, pdfUrl, title });
  };

  const closePDF = () => {
    setPdfViewer({ isOpen: false, pdfUrl: '', title: '' });
  };

  // Получаем активные меню по типу
  const getActiveMenuByType = (type: 'food' | 'drinks' | 'seasonal') => {
    return dynamicMenus.find(menu => menu.type === type && menu.isActive);
  };

  // Определяем какое меню использовать (динамическое или статическое)
  const getFoodMenu = () => {
    const dynamicMenu = getActiveMenuByType('food');
    return dynamicMenu ? { url: dynamicMenu.pdfUrl, title: dynamicMenu.name } : { url: menuPdf, title: 'Food Menu' };
  };

  const getDrinksMenu = () => {
    const dynamicMenu = getActiveMenuByType('drinks');
    return dynamicMenu ? { url: dynamicMenu.pdfUrl, title: dynamicMenu.name } : { url: drinksPdf, title: 'Drinks Menu' };
  };

  const getSeasonalMenu = () => {
    return getActiveMenuByType('seasonal');
  };

  if (loading) {
    return (
      <section className="menu" id="menu">
        <div className="menu-container">
          <h2 className="menu-title">THE MENUS</h2>
          <div className="loading-message">Loading menus...</div>
        </div>
      </section>
    );
  }

  const foodMenu = getFoodMenu();
  const drinksMenu = getDrinksMenu();
  const seasonalMenu = getSeasonalMenu();

  return (
    <section className="menu" id="menu">
      <div className="menu-container">
        <h2 className="menu-title">THE MENUS</h2>
        
        <div className="menu-showcase">
          <div className="menu-section food-section" onClick={() => openPDF(foodMenu.url, foodMenu.title)}>
            <h3>Food</h3>
            <p className="menu-section-subtitle">VIEW MENU</p>
            {getActiveMenuByType('food') && (
              <p className="menu-section-note">Updated: {new Date(getActiveMenuByType('food')!.uploadDate).toLocaleDateString()}</p>
            )}
          </div>
          
          <div className="menu-image-container">
             <img 
               src={menuPreview} 
               alt="Menu Preview" 
               className="menu-preview-image" 
               onClick={() => openPDF(foodMenu.url, foodMenu.title)}
             />
             <button className="see-full-menu-btn" onClick={() => openPDF(foodMenu.url, foodMenu.title)}>See Full Menu</button>
           </div>
          
          <div className="menu-section drinks-section" onClick={() => openPDF(drinksMenu.url, drinksMenu.title)}>
            <h3>Drinks</h3>
            <p className="menu-section-subtitle">VIEW MENU</p>
            {getActiveMenuByType('drinks') && (
              <p className="menu-section-note">Updated: {new Date(getActiveMenuByType('drinks')!.uploadDate).toLocaleDateString()}</p>
            )}
          </div>
        </div>
        
        {/* Показываем сезонное меню если оно есть */}
        {seasonalMenu && (
          <div className="seasonal-menu-section">
            <div className="seasonal-menu-card" onClick={() => openPDF(seasonalMenu.pdfUrl, seasonalMenu.name)}>
              <h3>🍂 {seasonalMenu.name}</h3>
              <p className="menu-section-subtitle">LIMITED TIME</p>
              <p className="menu-section-note">Available until: {new Date(seasonalMenu.uploadDate).toLocaleDateString()}</p>
            </div>
          </div>
        )}
        
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
