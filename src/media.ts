import portrait from './assets/portrait.jpg';
import gematik from './assets/logos/gematik-logo.png';
import ibm from './assets/logos/ibm-logo.png';
import rewe from './assets/logos/rewe-logo.png';
import authada from './assets/logos/authada-logo.png';
import tud from './assets/logos/tud.png';
import annaUniv from './assets/logos/anna_univ_logo.png';
import isaqb from './assets/logos/isaqb_badge.png';

export { portrait, isaqb };

/** Company logo per experience id (see content.ts). */
export const experienceLogos: Record<string, string> = {
  'gematik-arch': gematik,
  'gematik-sr': gematik,
  ibm,
  rewe,
  authada,
};

/** University logo per education entry, in content order. */
export const educationLogos = [tud, annaUniv];

export const links = {
  github: 'https://github.com/dineshvg',
  linkedin: 'https://www.linkedin.com/in/dineshvg2310/',
  email: 'dineshvg1023@gmail.com',
  certificate: 'https://www.credly.com/badges/7d95218f-8be4-455a-950c-c17663d5b9e9/linked_in_profile',
};
