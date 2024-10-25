import { create } from "zustand";

import { gameData } from "@/types/games.type";
import { jackpotData } from "@/types/jackpots.type";

interface GameState {
  categories: string[];
  byCategories: Record<string, gameData[]>;
  gameIds: string[];
  byGameIds: Record<string, gameData>;
  jackpots: Record<string, number>;

  // Actions
  setGames: (games: gameData[]) => void;
  setJackpots: (jackpots: jackpotData[]) => void;
  getGamesByFilter: (filters: string[]) => gameData[];
}

export const useGameStore = create<GameState>((set, get) => ({
  categories: [],
  byCategories: {},
  gameIds: [],
  byGameIds: {},
  jackpots: {},

  setGames: (games: gameData[]) => {
    // Process categories
    const categoriesSet = new Set<string>();
    const byCategoriesMap: Record<string, gameData[]> = {};
    const byGameIdsMap: Record<string, gameData> = {};

    // Process games
    games.forEach((game) => {
      // Add to byGameIds
      byGameIdsMap[game.id] = game;

      // Process categories
      game.categories.forEach((category) => {
        categoriesSet.add(category);

        if (!byCategoriesMap[category]) {
          byCategoriesMap[category] = [];
        }
        byCategoriesMap[category].push(game);
      });

      // Handle "other" category
      if (
        game.categories.some((cat) => ["ball", "virtual", "fun"].includes(cat))
      ) {
        if (!byCategoriesMap.other) {
          byCategoriesMap.other = [];
        }
        if (!byCategoriesMap.other.includes(game)) {
          byCategoriesMap.other.push(game);
        }
      }
    });

    set({
      categories: Array.from(categoriesSet),
      byCategories: byCategoriesMap,
      gameIds: games.map((game) => game.id),
      byGameIds: byGameIdsMap,
    });
  },

  getGamesByFilter: (filters: string[]) => {
    const { byCategories, jackpots, byGameIds } = get();

    // Special handling for jackpots filter first
    if (filters.includes("jackpots")) {
      const gamesWithJackpots = Object.keys(jackpots)
        .map((gameId) => byGameIds[gameId])
        .filter(Boolean);
      return gamesWithJackpots;
    }

    // Handle "other" category
    if (filters.includes("other")) {
      return byCategories.other || [];
    }

    // If single filter (except jackpots which was handled above)
    if (filters.length === 1) {
      return byCategories[filters[0]] || [];
    }

    // If multiple filters, find games that match all filters
    const gamesByFilter = filters.map((filter) => byCategories[filter] || []);
    if (gamesByFilter.length === 0) return [];

    return gamesByFilter.reduce((acc, games) => {
      return acc.filter((game) =>
        games.some((gameData) => gameData.id === game.id),
      );
    }, gamesByFilter[0]);
  },

  setJackpots: (jackpots: jackpotData[]) => {
    const jackpotsMap = jackpots.reduce(
      (acc, jackpot) => {
        acc[jackpot.game] = jackpot.amount;
        return acc;
      },
      {} as Record<string, number>,
    );

    set({ jackpots: jackpotsMap });
  },
}));
