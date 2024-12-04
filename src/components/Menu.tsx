import React, { useState } from 'react';
import '../styles/Menu.css';

interface MenuItem {
  name: string;
  description: string;
  price: string;
  tag?: string;
}

interface MenuItems {
  [key: string]: MenuItem[];
}

const Menu: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('starters');

  const categories = [
    { id: 'starters', name: 'Starters/Snacks' },
    { id: 'mains', name: 'Mains' },
    { id: 'burgers', name: 'Burgers' },
    { id: 'classics', name: 'Classics' },
    { id: 'kids', name: 'Kids Menu' },
    { id: 'dessert', name: 'Dessert' },
    { id: 'sides', name: 'Sides' }
  ];

  const menuItems: MenuItems = {
    'starters': [
      {
        name: "Dirty Fries",
        description: "Chips served with crispy bacon, spring onion and aioli dip",
        price: "99:-"
      },
      {
        name: "Nachos",
        description: "With melted cheese sauce, guacamole, salsa",
        price: "95:-"
      },
      {
        name: "Loaded Nachos",
        description: "Slow cooked pulled pork with a hint of barbecue sauce, melted cheese and spring onion",
        price: "149:-"
      },
      {
        name: "Combo Plate",
        description: "Mozzarella sticks, onion rings, chili cheese",
        price: "125:-"
      },
      {
        name: "Chicken wings",
        description: "In a sweet and spicy marinade served with celery sticks and blue cheese dip",
        price: "10p - 149:-"
      },
      {
        name: "Chips",
        description: "Served with bearnaise sauce",
        price: "79:-"
      }
    ],
    'mains': [
      {
        name: "Entrecote",
        description: "Served with chips side salad and bearnaise sauce (250g)",
        price: "339:-"
      },
      {
        name: "Auld Dub Meatballs",
        description: "Meatballs in gravy, served with lingonberries, pressed cucumber and mashed potatoes",
        price: "249:-"
      },
      {
        name: "BBQ Ribs",
        description: "Served with coleslaw, buttered corn on the cob and chips",
        price: "249:-"
      },
      {
        name: "Irish beef stew",
        description: "With carrot, potato, parsnip and served with soda bread",
        price: "220:-"
      },
      {
        name: "Caesar salad",
        description: "With grilled chicken, bacon, lettuce, croutons and Caesar dressing",
        price: "219:-"
      },
      {
        name: "Chicken Club Sandwich",
        description: "With bacon, salad, onion and aioli dip served with chips",
        price: "249:-"
      }
    ],
    'burgers': [
      {
        name: "Bacon 'n cheese burger",
        description: "With cheese, caramelized onion, and bacon",
        price: "209:-",
        tag: "Popular"
      },
      {
        name: "Blue cheeseburger",
        description: "With bacon, bbq sauce and fried egg",
        price: "209:-"
      },
      {
        name: "Chicken burger",
        description: "Breaded chicken whit curry mayo",
        price: "209:-"
      },
      {
        name: "Mexican burger",
        description: "With jalapeños and salsa sauce",
        price: "209:-"
      },
      {
        name: "Vegetarian burger",
        description: "Made with halloumi, carrot and zucchini",
        price: "209:-"
      }
    ],
    'classics': [
      {
        name: "Fish n' chips",
        description: "Beer battered deep fried cod served with chips, curry remoulade and mushy peas",
        price: "229:-",
        tag: "Signature"
      },
      {
        name: "Bangers 'N' Mash",
        description: "Pork sausage with mashed potatoes, sautéed spinach, caramelized onion and gravy",
        price: "229:-"
      }
    ],
    'kids': [
      {
        name: "Chips",
        description: "Served with bearnaise sauce",
        price: "69:-"
      },
      {
        name: "Chicken nuggets",
        description: "Served with chips",
        price: "69:-"
      },
      {
        name: "Vanilla ice-cream",
        description: "Kids portion",
        price: "69:-"
      }
    ],
    'dessert': [
      {
        name: "Apple pie",
        description: "With vanilla sauce and ice cream",
        price: "95:-"
      },
      {
        name: "Vanilla Ice Cream",
        description: "With whipped cream",
        price: "85:-"
      },
      {
        name: "Chocolate Brownie",
        description: "With ice cream and whipped cream",
        price: "95:-"
      }
    ],
    'sides': [
      {
        name: "Side salad",
        description: "",
        price: "30:-"
      },
      {
        name: "Garlic dip",
        description: "",
        price: "30:-"
      },
      {
        name: "BBQ dip",
        description: "",
        price: "30:-"
      },
      {
        name: "Guacamole",
        description: "",
        price: "30:-"
      },
      {
        name: "Coleslaw",
        description: "",
        price: "30:-"
      },
      {
        name: "Bearnaise",
        description: "",
        price: "30:-"
      },
      {
        name: "Corn on the cob",
        description: "",
        price: "30:-"
      }
    ]
  };

  return (
    <section className="menu" id="menu">
      <div className="menu-container">
        <h2>Our Menu</h2>
        
        <div className="menu-navigation">
          {categories.map(category => (
            <button
              key={category.id}
              className={`menu-nav-button ${activeCategory === category.id ? 'active' : ''}`}
              onClick={() => setActiveCategory(category.id)}
            >
              {category.name}
            </button>
          ))}
        </div>

        <div className="menu-content">
          <div className="menu-items">
            {menuItems[activeCategory].map((item, index) => (
              <div className="menu-item" key={index}>
                <div className="menu-item-header">
                  <h4>{item.name}</h4>
                  <span className="price">{item.price}</span>
                </div>
                <p className="description">{item.description}</p>
                {item.tag && <span className="tag">{item.tag}</span>}
              </div>
            ))}
          </div>
          {activeCategory === 'burgers' && (
            <p className="menu-note">All burgers are served with fries, lettuce, tomato, onion, coleslaw and a garlic dip</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default Menu;
