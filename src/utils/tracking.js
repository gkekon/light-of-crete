const hasBrowserWindow = () => typeof window !== 'undefined';

export function trackGoogleEvent(eventName, params = {}) {
  if (!hasBrowserWindow() || typeof window.gtag !== 'function') {
    return;
  }

  window.gtag('event', eventName, params);
}

export function trackMetaEvent(eventName, params = {}) {
  if (!hasBrowserWindow() || typeof window.fbq !== 'function') {
    return;
  }

  window.fbq('track', eventName, params);
}

export function trackMetaCustomEvent(eventName, params = {}) {
  if (!hasBrowserWindow() || typeof window.fbq !== 'function') {
    return;
  }

  window.fbq('trackCustom', eventName, params);
}

export function trackLead(source, params = {}) {
  const payload = {
    event_category: 'lead',
    lead_source: source,
    ...params,
  };

  trackGoogleEvent('generate_lead', payload);
  trackGoogleEvent(source, payload);
  trackMetaEvent('Lead', {
    content_name: source,
    ...params,
  });
  trackMetaCustomEvent(source, payload);
}

export function trackContactClick(channel, params = {}) {
  const payload = {
    event_category: 'contact',
    contact_channel: channel,
    ...params,
  };

  trackGoogleEvent('contact_click', payload);
  trackGoogleEvent(channel, payload);
  trackMetaEvent('Contact', {
    content_name: channel,
    ...params,
  });
  trackMetaCustomEvent(channel, payload);
}

/**
 * Ένας delegated listener για όλα τα lead links (WhatsApp / email / τηλέφωνο).
 * Προτιμάται από το να συνδέεται onClick σε κάθε ένα από τα ~7 σημεία που
 * εμφανίζεται το whatsAppUrl — έτσι δεν ξαναχάνεται το tracking αν κάποιο
 * refactor του App.jsx ξαναγράψει τα components (ακριβώς αυτό συνέβη στο 335e456).
 */
export function initLinkTracking() {
  if (!hasBrowserWindow() || window.__locLinkTracking) {
    return;
  }

  window.__locLinkTracking = true;

  document.addEventListener(
    'click',
    (event) => {
      const link = event.target?.closest?.('a[href]');

      if (!link) {
        return;
      }

      const href = link.getAttribute('href') || '';

      if (href.includes('wa.me')) {
        trackLead('whatsapp_click', { link_url: href });
      } else if (href.startsWith('mailto:')) {
        trackContactClick('email_click', { link_url: href });
      } else if (href.startsWith('tel:')) {
        trackContactClick('phone_click', { link_url: href });
      }
    },
    true,
  );
}
