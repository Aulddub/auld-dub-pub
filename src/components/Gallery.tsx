import React, { useState, useEffect } from 'react';
import '../styles/Gallery.css';

// Import existing images
import pubInterior1 from '../assets/irish-pub-interior.jpeg';
import pubInterior2 from '../assets/denise-leisner-alpD96AjyY8-unsplash.jpg';
import pubInterior3 from '../assets/frank-luca--UNJMMexxv8-unsplash.jpg';
import pubInterior4 from '../assets/patrick-browne-jMwvJ5aj5eA-unsplash.jpg';
import pubInterior5 from '../assets/rob-maxwell-hzU536WNqsM-unsplash.jpg';

interface GalleryItem {
  id: number;
  image: string;
  title: string;
  description: string;
  category: string;
}

const galleryItems: GalleryItem[] = [
  {
    id: 1,
    image: pubInterior1,
    title: 'Classic Irish Bar',
    description: 'Experience the warm ambiance of our authentic Irish pub',
    category: 'interior'
  },
  {
    id: 2,
    image: pubInterior2,
    title: 'Cozy Corner',
    description: 'Perfect spot for intimate conversations',
    category: 'seating'
  },
  {
    id: 3,
    image: pubInterior3,
    title: 'Rustic Charm',
    description: 'Authentic Irish pub atmosphere',
    category: 'interior'
  },
  {
    id: 4,
    image: pubInterior4,
    title: 'Evening Ambiance',
    description: 'Where memories are made',
    category: 'evening'
  },
  {
    id: 5,
    image: pubInterior5,
    title: 'The Bar',
    description: 'Where stories are shared',
    category: 'bar'
  },
  {
    id: 6,
    image: pubInterior2,
    title: 'Live Music Venue',
    description: 'Experience authentic Irish music',
    category: 'events'
  },
  {
    id: 7,
    image: pubInterior3,
    title: 'Relax and Enjoy',
    description: 'Relax and enjoy the atmosphere',
    category: 'seating'
  }
];

const categories = ['all', 'interior', 'seating', 'bar', 'evening', 'events'];

const Gallery: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [visibleItems, setVisibleItems] = useState<GalleryItem[]>([]);

  useEffect(() => {
    const filtered = selectedCategory === 'all'
      ? galleryItems
      : galleryItems.filter(item => item.category === selectedCategory);
    setVisibleItems(filtered);
  }, [selectedCategory]);

  return (
    <section className="gallery" id="gallery">
      <div className="gallery-container">
        <h2 className="gallery-title">Our Gallery</h2>
        
        <div className="gallery-categories">
          {categories.map(category => (
            <button
              key={category}
              className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category)}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>

        <div className="gallery-masonry">
          {visibleItems.map((item) => (
            <div key={item.id} className="gallery-item">
              <div className="gallery-item-inner">
                <img src={item.image} alt={item.title} loading="lazy" />
                <div className="gallery-item-overlay">
                  <div className="overlay-content">
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                    <span className="category-tag">{item.category}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
