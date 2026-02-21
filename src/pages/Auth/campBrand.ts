import type { CampBranding } from './components/AuthLayout';
import campTallPinesLogo from '@/assets/camp-tall-pines-logo.svg';
import campTallPinesBg from '@/assets/camp-bg.jpeg';

/**
 * Shared camp brand config — single source of truth.
 * Used by all auth flows and the camp website mockup.
 */
export const CAMP_TALL_PINES: CampBranding = {
  name: 'Camp Tall Pines',
  accentColor: '#2d6a4f',
  initials: 'TP',
  logoUrl: campTallPinesLogo,
  backgroundUrl: campTallPinesBg,
};

export const CAMP_SUNSHINE: CampBranding = {
  name: 'Camp Sunshine',
  accentColor: '#e07c24',
  initials: 'CS',
};

export const CAMP_BLUE_RIDGE: CampBranding = {
  name: 'Camp Blue Ridge',
  accentColor: '#2266cc',
  initials: 'BR',
};

/** Default camp for most flows */
export const CAMP = CAMP_TALL_PINES;

/** All camps (for multi-camp and branded flow demos) */
export const ALL_CAMPS = [CAMP_TALL_PINES, CAMP_SUNSHINE, CAMP_BLUE_RIDGE];
