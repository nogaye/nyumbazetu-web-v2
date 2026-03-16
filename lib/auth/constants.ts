/**
 * Auth validation and security constants.
 */

/** Minimum password length for sign-up and reset. */
export const MIN_PASSWORD_LENGTH = 8;

/** Simple email regex for client-side format check. */
export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isEmailFormatValid(email: string): boolean {
  return EMAIL_REGEX.test(email.trim());
}

export function isPasswordStrongEnough(password: string): boolean {
  return password.length >= MIN_PASSWORD_LENGTH;
}
