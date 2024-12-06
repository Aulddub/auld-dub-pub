import React, { useState } from 'react';
import '../styles/Contact.css';
import { FaPhone, FaEnvelope, FaClock, FaMapMarkerAlt } from 'react-icons/fa';

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const Contact: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    console.log('Form submitted:', formData);
    // Reset form after submission
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
    alert('Thank you for your message! We will get back to you soon.');
  };

  return (
    <section id="contact" className="contact">
      <div className="contact-container">
        <h2>Contact Us</h2>
        
        <div className="contact-content">
          <div className="contact-info">
            <div className="contact-details-grid">
              <div className="info-card">
                <div className="info-header">
                  <FaMapMarkerAlt className="info-icon" />
                  <h3>Location</h3>
                </div>
                <p className="address">
                  123 O'Connell Street<br />
                  Dublin City Centre<br />
                  Dublin 1, Ireland
                </p>
                <a href="https://goo.gl/maps/your-map-link" 
                   target="_blank" 
                   rel="noopener noreferrer" 
                   className="directions-button">
                  Get Directions
                </a>
              </div>

              <div className="info-card">
                <div className="info-header">
                  <FaClock className="info-icon" />
                  <h3>Opening Hours</h3>
                </div>
                <div className="hours-list">
                  <div className="hours-item">
                    <span>Mon - Thu</span>
                    <span>12:00 - 23:00</span>
                  </div>
                  <div className="hours-item">
                    <span>Fri - Sat</span>
                    <span>12:00 - 01:00</span>
                  </div>
                  <div className="hours-item">
                    <span>Sun</span>
                    <span>12:00 - 22:00</span>
                  </div>
                </div>
              </div>

              <div className="info-card">
                <div className="contact-links">
                  <div>
                    <div className="info-header">
                      <FaPhone className="info-icon" />
                      <h3>Phone</h3>
                    </div>
                    <a href="tel:+353-1-234-5678" className="contact-link">+353 1 234 5678</a>
                  </div>
                  <div>
                    <div className="info-header">
                      <FaEnvelope className="info-icon" />
                      <h3>Email</h3>
                    </div>
                    <a href="mailto:info@aulddubpub.ie" className="contact-link">info@aulddubpub.ie</a>
                  </div>
                </div>
              </div>
            </div>

            <div className="contact-section info-card">
              <div className="info-header">
                <FaEnvelope className="info-icon" />
                <h3>Send us a Message</h3>
              </div>
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-grid">
                  <div className="form-group">
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Your Name"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Your Email"
                      required
                    />
                  </div>
                </div>
                <div className="form-group">
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select Subject</option>
                    <option value="reservation">Make a Reservation</option>
                    <option value="event">Private Event Inquiry</option>
                    <option value="feedback">Feedback</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div className="form-group">
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Your Message"
                    required
                  />
                </div>
                <button type="submit" className="submit-button">
                  Send Message
                </button>
              </form>
            </div>
          </div>

          <div className="map-container">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2381.7399659243538!2d-6.2617!3d53.3498!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zM0zCsDIwJzU5LjIiTiA2wrAxNScxOC4xIlc!5e0!3m2!1sen!2sie!4v1234567890!5m2!1sen!2sie"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="The Auld Dub Pub Location"
            />
          </div>
        </div>

        <div className="social-proof">
          <div className="review-cards">
            <div className="review-card">
              <div className="stars">★★★★★</div>
              <p className="review-text">"Amazing authentic Irish pub experience! Great food and fantastic atmosphere."</p>
              <p className="reviewer">- John D.</p>
            </div>
            <div className="review-card">
              <div className="stars">★★★★★</div>
              <p className="review-text">"Best Guinness in Dublin! The live music sessions are brilliant."</p>
              <p className="reviewer">- Sarah M.</p>
            </div>
            <div className="review-card">
              <div className="stars">★★★★★</div>
              <p className="review-text">"A must-visit pub in Dublin. The quiz nights are super fun!"</p>
              <p className="reviewer">- Mike R.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
