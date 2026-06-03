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
