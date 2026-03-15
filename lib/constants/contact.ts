/**
 * Central contact information for Nyumba Zetu. Use these constants anywhere
 * the app displays or links to email, phone, WhatsApp, or business hours
 * (contact page, listing contact CTAs, structured data, careers, etc.).
 */

/** Primary support/customer contact email. */
export const CONTACT_EMAIL = "support@nyumbazetu.com";

/** Primary phone number (also used for WhatsApp). Format: E.164 without spaces for tel: and wa.me. */
export const CONTACT_PHONE_PRIMARY = "+254741382063";

/** Secondary phone number. Format: E.164 without spaces for tel: links. */
export const CONTACT_PHONE_SECONDARY = "+254716988188";

/** Display form of primary phone (with spaces). */
export const CONTACT_PHONE_PRIMARY_DISPLAY = "+254 741 382063";

/** Display form of secondary phone (with spaces). */
export const CONTACT_PHONE_SECONDARY_DISPLAY = "+254 716 988 188";

/** Business hours string for display (e.g. on contact page). */
export const CONTACT_BUSINESS_HOURS = "Mon - Fri, 8:00 - 17:00";

/** WhatsApp number: same as primary. For wa.me links use digits only (no +). */
export const CONTACT_WHATSAPP_NUMBER = "254741382063";

/** Full wa.me URL for WhatsApp chat. */
export const CONTACT_WHATSAPP_URL = `https://wa.me/${CONTACT_WHATSAPP_NUMBER}`;

/** mailto: URL for support email. */
export const CONTACT_EMAIL_MAILTO = `mailto:${CONTACT_EMAIL}`;

/** tel: URL for primary phone. */
export const CONTACT_PHONE_PRIMARY_TEL = `tel:${CONTACT_PHONE_PRIMARY}`;

/** tel: URL for secondary phone. */
export const CONTACT_PHONE_SECONDARY_TEL = `tel:${CONTACT_PHONE_SECONDARY}`;
