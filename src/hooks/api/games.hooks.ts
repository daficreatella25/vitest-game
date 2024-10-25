import { useQuery } from "@tanstack/react-query";

import { ENDPOINT } from "@/services/main";
import { GameServices } from "@/services/games/games.service";

const serviceInstance = new GameServices();

export const useGetGameList = () => {
  return useQuery({
    queryKey: [ENDPOINT.GAMES.BASE],
    queryFn: serviceInstance.get,
  });
};
