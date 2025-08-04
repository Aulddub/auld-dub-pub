import React from 'react';
import '../styles/Menu.css';
import menuPreview from '../assets/menu-preview.png';

const Menu: React.FC = () => {

  return (
    <section className="menu" id="menu">
      <div className="menu-container">
        <h2 className="menu-title">THE MENUS</h2>
        
        <div className="menu-showcase">
          <div className="menu-section food-section">
            <h3>Food</h3>
            <p className="menu-section-subtitle">VIEW MENU</p>
          </div>
          
          <div className="menu-image-container">
             <img src={menuPreview} alt="Menu Preview" className="menu-preview-image" />
             <button className="see-full-menu-btn">See Full Menu</button>
           </div>
          
          <div className="menu-section drinks-section">
            <h3>Drinks</h3>
            <p className="menu-section-subtitle">VIEW MENU</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Menu;
