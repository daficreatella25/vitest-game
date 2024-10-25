import { useEffect } from "react";

import { useGetGameList } from "@/hooks/api/games.hooks";
import { useGameStore } from "@/store/games.store";
import { useGameFilter } from "@/hooks/useGameFilter";
import { useGetjackpotGamesList } from "@/hooks/api/jackpots.hook";
import { gameData } from "@/types/games.type";
import { ASSETS } from "@/assets";
import { cn } from "@/lib/utils";
import useCheckMobileScreen from "@/hooks/useCheckMobileScreen";

export const Home = () => {
  // data are processed behind, and cached, what we need to do only to show if its loading
  const { data, isLoading: isGameLoading } = useGetGameList();
  const { data: jackpotData, isLoading: isJackpotLoading } =
    useGetjackpotGamesList();
  const { setGames, getGamesByFilter, setJackpots, jackpots } = useGameStore();
  const { currentFilter } = useGameFilter();

  const isLoading = isGameLoading || isJackpotLoading;
  const isMobile = useCheckMobileScreen();

  useEffect(() => {
    if (!data || !jackpotData) return;
    setJackpots(jackpotData);

    setGames(data);
  }, [data, jackpotData]);

  const filteredGames = getGamesByFilter([currentFilter]);

  const getRibbons = (game: gameData) => {
    const ribbons = [];

    // Only show ribbons when in categories other than 'top' and 'new'

    if (game.categories.includes("new")) {
      if (currentFilter !== "new") ribbons.push("new");
    }
    if (game.categories.includes("top")) {
      if (currentFilter !== "top") ribbons.push("top");
    }

    return ribbons;
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (filteredGames.length < 1) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl">No Game Detected</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {filteredGames.map((game) => (
          <div
            key={game.id}
            className={cn(
              "relative group cursor-pointer overflow-hidden rounded-lg shadow-lg transition-transform duration-300 ",
              !isMobile && "hover:scale-105",
            )}
          >
            {/* Image container */}
            <div className="aspect-[4/3] overflow-hidden rounded-xl">
              <img
                src={`https:${game.image}`}
                alt={game.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Ribbons */}
            {getRibbons(game).map((ribbonType) => (
              <div
                key={ribbonType}
                className={`
                  absolute z-10
                  ${ribbonType === "new" ? "right-[-20px]" : "left-[-20px]"}
                  top-[-10px]
                `}
              >
                <img
                  src={
                    ribbonType === "top"
                      ? ASSETS.RIBBON_TOP
                      : ASSETS.RIBBON_GREEN
                  }
                  alt=""
                  className="w-[100px]"
                />
              </div>
            ))}

            {/* Jackpot overlay */}
            {jackpots[game.id] && (
              <div className="absolute top-0 left-0 right-0 flex justify-center">
                <div className="bg-black/70 text-white w-full text-center py-2 rounded-t-xl text-sm font-semibold">
                  £{jackpots[game.id].toLocaleString()}
                </div>
              </div>
            )}

            {/* Hover overlay */}
            {!isMobile && (
              <div className="absolute inset-0 bg-black rounded-xl bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center">
                <h3 className="text-white text-lg font-bold text-center px-4 mb-3">
                  {game.name}
                </h3>
                <button
                  type="button"
                  className="bg-primary text-white px-6 py-2 rounded-full hover:bg-opacity-90 transition-colors"
                >
                  Play
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
