import { useNavigate } from "react-router-dom";

import { PUBLIC_ROUTES } from "@/config/routes.public";
import { NAVBAR_MENU } from "@/config/constant";

export const useGameFilter = () => {
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(location.search);
  const currentFilter = queryParams.get("filter") || "top";

  const handleFilterClick = (itemId: string) => {
    if (itemId === "top") {
      // For top games, remove the query parameter
      navigate(PUBLIC_ROUTES.HOME);
    } else {
      navigate(`${PUBLIC_ROUTES.HOME}?filter=${itemId}`);
    }
  };

  const getFilterList =
    NAVBAR_MENU.find((item) => item.id === currentFilter)?.filter ?? [];

  return {
    handleFilterClick,
    currentFilter,
    getFilterList,
  };
};
