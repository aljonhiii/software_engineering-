/**
 * Service definitions, shoe categories, and pricing.
 * Central configuration — single source of truth for all customer offerings.
 */

import { CleaningService, ServiceAddon, ShoeCategory, ShoeCategoryId } from '../types';

export const SHOE_CATEGORIES: ShoeCategory[] = [
  {
    id: 'sneakers',
    name: 'Sneakers',
    description: 'Everyday casual sneakers, knit, and synthetic lifestyle kicks.',
    badge: 'Popular',
    icon: 'footsteps',
    materialCareNote: 'Gentle foam with rubber-midsole scrub and warm air drying.',
  },
  {
    id: 'canvas',
    name: 'Canvas Shoes',
    description: 'Converse, Vans, and fabric slip-ons requiring color protection.',
    badge: 'Color-Safe',
    icon: 'shirt-outline',
    materialCareNote: 'Balanced agitation prevents fabric fading and sole edge separation.',
  },
  {
    id: 'leather',
    name: 'Leather Shoes',
    description: 'Formal dress shoes, leather boots, and smooth grain leather.',
    badge: 'Conditioning',
    icon: 'shield-checkmark',
    materialCareNote: 'Low-moisture foam with buffing to preserve natural oils and shine.',
  },
  {
    id: 'suede',
    name: 'Suede & Nubuck',
    description: 'Delicate nap leather requiring dry foam and soft brushing.',
    badge: 'Special Care',
    icon: 'sparkles',
    materialCareNote: 'Dry foam technology with soft bristles; protects delicate nap texture.',
  },
  {
    id: 'sports',
    name: 'Sports Shoes',
    description: 'Running, basketball, training shoes, and active sports footwear.',
    badge: 'High Odor Removal',
    icon: 'fitness',
    materialCareNote: 'Traction grip clean with dual antibacterial sweat-odor treatment.',
  },
  {
    id: 'other',
    name: 'Other Footwear',
    description: 'Mixed materials, hiking boots, work slip-ons, and specialty shoes.',
    badge: 'Adaptive Cycle',
    icon: 'grid',
    materialCareNote: 'Adaptive sensor-adjusted wash cycle for multi-material footwear.',
  },
];

export const CLEANING_SERVICES: CleaningService[] = [
  {
    id: 'quick',
    name: 'Quick Refresh',
    description: 'Fast surface dirt & dust removal for lightly worn shoes.',
    price: 30,
    durationMinutes: 3,
    features: ['Surface foam wash', 'Midsole dust removal', 'Quick air dry'],
    icon: 'flash',
  },
  {
    id: 'standard',
    name: 'Standard Clean',
    description: 'Complete all-around cleaning cycle with deep brushing and rinse.',
    price: 50,
    durationMinutes: 5,
    features: ['360° brush cycle', 'Deep foam cleansing', 'Sole traction scrub', 'Warm air dry'],
    icon: 'sparkles',
  },
  {
    id: 'deep',
    name: 'Deep Restoration',
    description: 'Intensive deep treatment for stubborn stains and heavy soiling.',
    price: 80,
    durationMinutes: 8,
    features: [
      'Pre-soak stain treatment',
      'High-pressure water pulse',
      'Dual foam wash',
      'Deep deodorizing spray',
      'Hot air dry & UV sanitize',
    ],
    icon: 'diamond',
  },
];

export const SERVICE_ADDONS: ServiceAddon[] = [
  {
    id: 'deodorizer',
    name: 'Antibacterial Deodorizer',
    description: 'Eliminates 99.9% of bacteria and foot odors with fresh scent spray.',
    price: 15,
    icon: 'leaf',
  },
  {
    id: 'water-repellent',
    name: 'Hydrophobic Shield',
    description: 'Applies water and stain repellent nano-coating for rain protection.',
    price: 20,
    icon: 'water',
  },
];

/** Currency symbol used throughout the app */
export const CURRENCY_SYMBOL = '₱';

/** Calculate total price for a service + addons */
export function calculateTotal(
  service: CleaningService | null,
  addons: ServiceAddon[]
): number {
  const servicePrice = service?.price ?? 0;
  const addonsPrice = addons.reduce((sum, addon) => sum + addon.price, 0);
  return servicePrice + addonsPrice;
}

/** Get recommended services or customized notes based on shoe category */
export function getCategoryCareHint(categoryId?: ShoeCategoryId): string {
  switch (categoryId) {
    case 'leather':
      return 'Leather Mode: Uses gentle conditioning foam and soft brush rotations.';
    case 'suede':
      return 'Suede Mode: Low-water dry foam with nap restoring air jets.';
    case 'canvas':
      return 'Canvas Mode: Color-lock detergent with gentle rinse cycle.';
    case 'sports':
      return 'Sports Mode: High-intensity sole cleanse with odor extraction.';
    default:
      return 'Universal Mode: Standard balanced cleaning and warm air drying.';
  }
}
