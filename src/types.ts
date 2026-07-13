export interface Character {
  id: string;
  name: string;
  icon: string;
  books: string;
  role: string;
  tagline: string;
  themePrimary: string;
  themeGlow: string;
  lore: string[];
  traits: string[];
}

export interface Book {
  id: string;
  volume: string;
  title: string;
  subtitle: string;
  description1: string;
  description2: string;
  stakes: string;
  characters: string[];
}

export interface Chapter {
  num: string;
  title: string;
}

export interface SupportTier {
  id: string;
  name: string;
  concept: string;
  subtitle: string;
  price: string;
  priceNote: string;
  perks: string[];
  glyph: string;
  recommended?: boolean;
  p2w?: boolean;
}

export interface Message {
  id: string;
  sender: 'system' | 'user' | 'response' | 'denied';
  text: string;
  isTyping?: boolean;
}
