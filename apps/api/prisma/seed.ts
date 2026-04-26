/**
 * Seed blueprint for Sprint 1 foundational entities.
 * This intentionally documents records expected by the product flow.
 */
export const seedBlueprint = {
  users: [{ email: "collector@cardnexus.com", name: "Morgan Lee" }],
  collections: [{ name: "Primary Portfolio" }],
  cards: [
    { name: "Charizard EX", set: "Obsidian Flames", rarity: "Ultra Rare", condition: "Near Mint" },
    { name: "Pikachu VMAX", set: "Vivid Voltage", rarity: "Rare Holo VMAX", condition: "Mint" },
    { name: "Mewtwo GX", set: "Shining Legends", rarity: "Rare Holo GX", condition: "Lightly Played" },
  ],
  marketplaceListings: [{ price: 215 }, { price: 96 }],
  sharedCollection: { role: "EDITOR" },
};
