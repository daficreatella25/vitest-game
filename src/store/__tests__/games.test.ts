import { describe, beforeEach, it, expect } from "vitest";

import { useGameStore } from "../games.store";

import { gameData } from "@/types/games.type";
import { jackpotData } from "@/types/jackpots.type";

describe("Game Store", () => {
  beforeEach(() => {
    useGameStore.setState({
      categories: [],
      byCategories: {},
      gameIds: [],
      byGameIds: {},
      jackpots: {},
    });
  });

  const mockGames: gameData[] = [
    {
      categories: ["top", "slots", "new"],
      name: "The Wish Master",
      image: "//stage.whgstage.com/scontent/images/games/NETHEWISHMASTER.jpg",
      id: "NETHEWISHMASTER",
    },
    {
      categories: ["top", "slots", "new"],
      name: "Aliens",
      image: "//stage.whgstage.com/scontent/images/games/NEALIENS.jpg",
      id: "NEALIENS",
    },
  ];

  describe("setGames", () => {
    it("should correctly set categories and byCategories", () => {
      useGameStore.getState().setGames(mockGames);

      const state = useGameStore.getState();

      expect(state.categories).toEqual(
        expect.arrayContaining(["top", "slots", "new"]),
      );
      expect(state.categories).toHaveLength(3);

      expect(state.byCategories.top).toBeDefined();
      expect(state.byCategories.slots).toBeDefined();
      expect(state.byCategories.new).toBeDefined();

      expect(state.byCategories.top).toHaveLength(2);
      expect(state.byCategories.slots).toHaveLength(2);
      expect(state.byCategories.new).toHaveLength(2);

      const topGames = state.byCategories.top.map((game) => game.id);
      expect(topGames).toContain("NETHEWISHMASTER");
      expect(topGames).toContain("NEALIENS");
    });

    it("should correctly set gameIds and byGameIds", () => {
      useGameStore.getState().setGames(mockGames);

      const state = useGameStore.getState();

      expect(state.gameIds).toHaveLength(2);
      expect(state.gameIds).toEqual(["NETHEWISHMASTER", "NEALIENS"]);

      expect(state.byGameIds.NETHEWISHMASTER).toEqual(mockGames[0]);
      expect(state.byGameIds.NEALIENS).toEqual(mockGames[1]);
    });
  });

  describe("setJackpots", () => {
    it("should correctly set and update jackpots", () => {
      const initialJackpots: jackpotData[] = [
        { game: "NETHEWISHMASTER", amount: 26107 },
        { game: "NEALIENS", amount: 44754 },
      ];

      useGameStore.getState().setJackpots(initialJackpots);

      let state = useGameStore.getState();

      expect(state.jackpots).toEqual({
        NETHEWISHMASTER: 26107,
        NEALIENS: 44754,
      });

      const updatedJackpots: jackpotData[] = [
        { game: "NETHEWISHMASTER", amount: 30000 },
        { game: "NEALIENS", amount: 50000 },
      ];

      useGameStore.getState().setJackpots(updatedJackpots);

      state = useGameStore.getState();

      expect(state.jackpots).toEqual({
        NETHEWISHMASTER: 30000,
        NEALIENS: 50000,
      });
    });
  });

  describe("getGamesByFilter", () => {
    beforeEach(() => {
      const store = useGameStore.getState();
      store.setGames(mockGames);
      store.setJackpots([
        { game: "NETHEWISHMASTER", amount: 26107 },
        { game: "NEALIENS", amount: 44754 },
      ]);
    });

    it("should filter games by category", () => {
      const newGames = useGameStore.getState().getGamesByFilter(["new"]);

      expect(newGames).toHaveLength(2);
      expect(newGames.map((game) => game.id)).toEqual(
        expect.arrayContaining(["NETHEWISHMASTER", "NEALIENS"]),
      );
    });

    it("should filter games by jackpots", () => {
      const jackpotGames = useGameStore
        .getState()
        .getGamesByFilter(["jackpots"]);

      expect(jackpotGames).toHaveLength(2);
      expect(jackpotGames.map((game) => game.id)).toEqual(
        expect.arrayContaining(["NETHEWISHMASTER", "NEALIENS"]),
      );
    });
  });
});
