import { ApiResponse } from "apisauce";

import { apiInstance, ENDPOINT } from "../main";

import { jackpotData } from "@/types/jackpots.type";

export class JackpotServices {
  async get() {
    const response: ApiResponse<jackpotData[], unknown> = await apiInstance.get(
      ENDPOINT.JACKPOTS.BASE,
    );

    if (!response.ok) throw response.data;

    return response.data;
  }
}
