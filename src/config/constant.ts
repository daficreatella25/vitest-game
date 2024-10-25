// constants/navbar.ts
export const API_BASE_URL = import.meta.env.VITE_APP_API_URL;

export const NAVBAR_MENU = [
  { id: "top", name: "Top Games", filter: ["top"] },
  { id: "new", name: "New Games", filter: ["new"] },
  { id: "slots", name: "Slots", filter: ["slots"] },
  { id: "jackpots", name: "Jackpots", filter: ["jackpots"] },
  { id: "live", name: "Live", filter: ["live"] },
  { id: "blackjack", name: "Blackjack", filter: ["blackjack"] },
  { id: "roulette", name: "Roulette", filter: ["roulette"] },
  { id: "table", name: "Table", filter: ["table"] },
  { id: "poker", name: "Poker", filter: ["poker"] },
  { id: "other", name: "Other", filter: ["ball", "virtual", "fun"] },
];
