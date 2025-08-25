import React, { useState, useEffect } from 'react';
import '../styles/Menu.css';
import menuPreview from '../assets/menu-preview.png';
import { databaseService } from '../services/database';

interface MenuPDF {
  id: string;
  name: string;
  type: 'food' | 'drinks';
  file_url: string;
  file_name: string;
  is_active: boolean;
  upload_date: string;
}

const Menu: React.FC = () => {
  const [dynamicMenus, setDynamicMenus] = useState<MenuPDF[]>([]);
  const [loading, setLoading] = useState(true);
  const [showUnavailableModal, setShowUnavailableModal] = useState(false);
  const [modalMenuType, setModalMenuType] = useState<'food' | 'drinks'>('food');

  useEffect(() => {
    const fetchMenus = async () => {
      try {
        const menusList = await databaseService.getMenus();
        
        
        const activeMenus = menusList.filter(menu => {
          const isActive = menu.is_active ?? false;
          return isActive;
        });
        setDynamicMenus(activeMenus);
      } catch (error) {
        console.error('Error fetching menus:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMenus();
  }, []);

  const openPDF = (fileUrl: string | undefined, _title: string) => {
    if (fileUrl) {
      window.open(fileUrl, '_blank');
    }
  };

  const handleMenuClick = (menuType: 'food' | 'drinks') => {
    const menu = menuType === 'food' ? getFoodMenu() : getDrinksMenu();
    if (menu) {
      openPDF(menu.url, menu.title);
    } else {
      setModalMenuType(menuType);
      setShowUnavailableModal(true);
    }
  };

  
  const getActiveMenuByType = (type: 'food' | 'drinks') => {
    return dynamicMenus.find(menu => {
      const isActive = menu.is_active ?? false;
      return menu.type === type && isActive;
    });
  };

  
  const getFoodMenu = () => {
    const dynamicMenu = getActiveMenuByType('food');
    if (dynamicMenu) {
      const url = dynamicMenu.file_url || '';
      return { url, title: dynamicMenu.name };
    }
    return null;
  };

  const getDrinksMenu = () => {
    const dynamicMenu = getActiveMenuByType('drinks');
    if (dynamicMenu) {
      const url = dynamicMenu.file_url || '';
      return { url, title: dynamicMenu.name };
    }
    return null;
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

  // const foodMenu = getFoodMenu();
  // const drinksMenu = getDrinksMenu();

  return (
    <section className="menu" id="menu">
      <div className="menu-container">
        <h2 className="menu-title">THE MENUS</h2>
        
        <div className="menu-showcase">
          <div className="menu-section food-section" onClick={() => handleMenuClick('food')}>
            <h3>Food</h3>
            <p className="menu-section-subtitle">VIEW MENU</p>
          </div>
          
          <div className="menu-image-container">
             <img 
               src={menuPreview} 
               alt="Menu Preview" 
               className="menu-preview-image" 
               onClick={() => handleMenuClick('food')}
             />
             <button className="see-full-menu-btn" onClick={() => handleMenuClick('food')}>See Full Menu</button>
           </div>
          
          <div className="menu-section drinks-section" onClick={() => handleMenuClick('drinks')}>
            <h3>Drinks</h3>
            <p className="menu-section-subtitle">VIEW MENU</p>
          </div>
        </div>
        

      </div>

      {/* Modal for unavailable menu */}
      {showUnavailableModal && (
        <div className="menu-modal-overlay" onClick={() => setShowUnavailableModal(false)}>
          <div className="menu-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="menu-modal-icon">
              <div className="menu-icon-circle">
                <span className="menu-icon-utensils">🍽️</span>
              </div>
            </div>
            <div className="menu-modal-body">
              <h3 className="menu-modal-title">
                {modalMenuType === 'food' ? 'Food Menu' : 'Drinks Menu'} Temporarily Unavailable
              </h3>
              <p className="menu-modal-message">
                We're currently updating our {modalMenuType === 'food' ? 'food' : 'drinks'} menu to bring you 
                the best selection possible. Our delicious offerings will be back online shortly.
              </p>
              <p className="menu-modal-submessage">
                Thank you for your patience!
              </p>
            </div>
            <button 
              className="menu-modal-close"
              onClick={() => setShowUnavailableModal(false)}
              aria-label="Close modal"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Menu;
