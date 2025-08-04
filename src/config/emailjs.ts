// EmailJS Configuration
// To set up EmailJS:
// 1. Go to https://www.emailjs.com/
// 2. Create an account and verify your email
// 3. Create a new service (Gmail, Outlook, etc.)
// 4. Create an email template
// 5. Get your Public Key from the Integration page
// 6. Replace the values below with your actual EmailJS credentials

export const emailjsConfig = {
  // Your EmailJS Public Key (found in Account > API Keys)
  publicKey: 'AFL39bF-Mhov-tLkM',
  
  // Your EmailJS Service ID (found in Email Services)
  serviceId: 'service_jiyzxd4',
  
  // Your EmailJS Template ID (found in Email Templates)
  templateId: 'template_oaoe87d',
  
  // Restaurant email where messages will be sent
  restaurantEmail: 'shamillorsan@gmail.com'
};

// Template variables that should be used in your EmailJS template:
// {{from_name}} - Sender's name
// {{from_email}} - Sender's email
// {{subject}} - Message subject
// {{message}} - Message content
// {{to_email}} - Restaurant email (info@theaulddub.se)