export type TCGGame = "pokemon" | "magic" | "yugioh";
export type CardRarity = "common" | "uncommon" | "rare" | "ultra-rare" | "secret-rare" | "mythic";
export type CardCondition = "mint" | "near-mint" | "lightly-played" | "moderately-played" | "heavily-played";
export type ProductCategory = "card" | "accessory";

export interface Product {
  id: string;
  name: string;
  game: TCGGame;
  category: ProductCategory;
  price: number;
  originalPrice?: number;
  image: string;
  rarity?: CardRarity;
  condition?: CardCondition;
  set?: string;
  language?: string;
  description: string;
  inStock: boolean;
  isNew?: boolean;
  isFeatured?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export const GAME_LABELS: Record<TCGGame, string> = {
  pokemon: "Pokémon TCG",
  magic: "Magic: The Gathering",
  yugioh: "Yu-Gi-Oh!",
};

export const RARITY_LABELS: Record<CardRarity, string> = {
  common: "Comum",
  uncommon: "Incomum",
  rare: "Rara",
  "ultra-rare": "Ultra Rara",
  "secret-rare": "Secreta Rara",
  mythic: "Mítica",
};

export const CONDITION_LABELS: Record<CardCondition, string> = {
  mint: "Mint",
  "near-mint": "Near Mint",
  "lightly-played": "Levemente Jogada",
  "moderately-played": "Moderadamente Jogada",
  "heavily-played": "Muito Jogada",
};
