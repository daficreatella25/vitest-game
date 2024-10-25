import { ApiResponse } from "apisauce";

import { apiInstance, ENDPOINT } from "../main";

import { gameData } from "@/types/games.type";

export class GameServices {
  async get() {
    const response: ApiResponse<gameData[], unknown> = await apiInstance.get(
      ENDPOINT.GAMES.BASE,
    );

    if (!response.ok) throw response.data;

    return response.data;
  }
}
