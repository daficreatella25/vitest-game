import { create } from "apisauce";

export const apiInstance = create({
  baseURL: "https://stage.whgstage.com/front-end-test/",
});

export const ENDPOINT = {
  GAMES: {
    BASE: "games.php",
  },
  JACKPOTS: {
    BASE: "jackpots.php",
  },
};
