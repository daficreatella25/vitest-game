import { useQuery } from "@tanstack/react-query";

import { ENDPOINT } from "@/services/main";
import { JackpotServices } from "@/services/jackpots/jackpots.service";

const serviceInstance = new JackpotServices();

export const useGetjackpotGamesList = () => {
  return useQuery({
    queryKey: [ENDPOINT.JACKPOTS.BASE],
    queryFn: serviceInstance.get,
    refetchInterval: 5000,
  });
};
