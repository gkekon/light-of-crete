export const siteConfig = {
  brandName: 'Light of Crete',
  brandSubtitle: 'Photoshoots in Crete',
  photographerName: 'Konstantinos Gkekopoulos',
  whatsappNumber: '306976519440',
  whatsappMessage: 'Hello Konstantinos, I am interested in booking a photoshoot in Crete.',
  whatsappLabel: 'WhatsApp',
  floatingWhatsappLabel: 'Chat on WhatsApp',
  emailRecipient: 'gkekon@gmail.com',
  formName: 'photoshoot-request',
  successPath: '/success.html',
};

export const whatsAppUrl = `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(
  siteConfig.whatsappMessage,
)}`;
