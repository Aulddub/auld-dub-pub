import React, { useState } from 'react';
import '../styles/Contact.css';
import { FaPhone, FaEnvelope, FaClock, FaMapMarkerAlt } from 'react-icons/fa';
import emailjs from '@emailjs/browser';
import { emailjsConfig } from '../config/emailjs';

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
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Send email using EmailJS with public key in options
      const result = await emailjs.send(
        emailjsConfig.serviceId,
        emailjsConfig.templateId,
        {
          from_name: formData.name,
          from_email: formData.email,
          subject: formData.subject,
          message: formData.message,
          to_email: emailjsConfig.restaurantEmail
        },
        {
          publicKey: emailjsConfig.publicKey
        }
      );
      
      console.log('Email sent successfully:', result);
      
      // Reset form after successful submission
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      
      setShowSuccessModal(true);
    } catch (error) {
      console.error('Error sending email:', error);
      setShowErrorModal(true);
    } finally {
      setIsSubmitting(false);
    }
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
                  Holländargatan 1<br />
                  111 36 Stockholm<br />
                  Sweden
                </p>
                
              </div>

              <div className="info-card">
                <div className="info-header">
                  <FaClock className="info-icon" />
                  <h3>Opening Hours</h3>
                </div>
                <div className="hours-list">
                  <div className="hours-item">
                    <span>Mon - Thu</span>
                    <span>15:00 - 01:00</span>
                  </div>
                  <div className="hours-item">
                    <span>Fri</span>
                    <span>14:00 - 03:00</span>
                  </div>
                  <div className="hours-item">
                    <span>Sat</span>
                    <span>12:00 - 03:00</span>
                  </div>
                  <div className="hours-item">
                    <span>Sun</span>
                    <span>12:00 - 23:00</span>
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
                    <a href="tel:08-679-77-07" className="contact-link">08-679 77 07</a>
                  </div>
                  <div>
                    <div className="info-header">
                      <FaEnvelope className="info-icon" />
                      <h3>Email</h3>
                    </div>
                    <a href="mailto:info@theaulddub.se" className="contact-link">info@theaulddub.se</a>
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
                <button type="submit" className="submit-button" disabled={isSubmitting}>
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>
          </div>

          <div className="map-container">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2000.1234567890123!2d18.0592!3d59.3376!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x465f9d6799555555%3A0x1234567890abcdef!2sHoll%C3%A4ndargatan%201%2C%20111%2036%20Stockholm%2C%20Sweden!5e0!3m2!1sen!2sse!4v1234567890!5m2!1sen!2sse"
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

        {/* Success Modal */}
        {showSuccessModal && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h3>Message Sent Successfully!</h3>
              <p>Thank you for your message! We will get back to you soon.</p>
              <div className="modal-buttons">
                <button onClick={() => setShowSuccessModal(false)} className="confirm-button">
                  OK
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Error Modal */}
        {showErrorModal && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h3>Error Sending Message</h3>
              <p>Sorry, there was an error sending your message. Please try again or contact us directly at info@theaulddub.se</p>
              <div className="modal-buttons">
                <button onClick={() => setShowErrorModal(false)} className="confirm-button">
                  OK
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Contact;
