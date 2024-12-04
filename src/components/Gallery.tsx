import React from 'react';
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
  className?: string;
}

const galleryItems: GalleryItem[] = [
  {
    id: 1,
    image: pubInterior1,
    title: 'Classic Irish Bar',
    description: 'Experience the warm ambiance of our authentic Irish pub',
    className: 'wide'
  },
  {
    id: 2,
    image: pubInterior2,
    title: 'Cozy Corner',
    description: 'Perfect spot for intimate conversations'
  },
  {
    id: 3,
    image: pubInterior3,
    title: 'Rustic Charm',
    description: 'Authentic Irish pub atmosphere',
    className: 'tall'
  },
  {
    id: 4,
    image: pubInterior4,
    title: 'Evening Ambiance',
    description: 'Where memories are made'
  },
  {
    id: 5,
    image: pubInterior5,
    title: 'The Bar',
    description: 'Where stories are shared',
    className: 'wide'
  },
  {
    id: 6,
    image: pubInterior2,
    title: 'Live Music Venue',
    description: 'Experience authentic Irish music'
  },
  {
    id: 7,
    image: pubInterior3,
    title: 'Relax and Enjoy',
    description: 'Relax and enjoy the atmosphere'
  }
];

const Gallery: React.FC = () => {
  return (
    <section className="gallery">
      <div className="gallery-container">
        <h2 className="gallery-title">Our Gallery</h2>
        <div className="gallery-grid">
          {galleryItems.map((item) => (
            <div key={item.id} className={`gallery-item ${item.className || ''}`}>
              <img src={item.image} alt={item.title} />
              <div className="gallery-item-overlay">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
