import React from "react";

import { NAVBAR_MENU } from "@/config/constant";
import { useGameFilter } from "@/hooks/useGameFilter";
import { cn } from "@/lib/utils";

interface Props {
  children: React.ReactNode;
}

export const Navbar = (props: Props) => {
  const { handleFilterClick, currentFilter } = useGameFilter();

  return (
    <>
      <div className="w-full bg-[#373737] sticky top-0 z-50">
        <div className="flex overflow-x-auto justify-evenly">
          {NAVBAR_MENU.map((item) => (
            <button
              type="button"
              key={item.name}
              onClick={() => handleFilterClick(item.id)}
              className={cn(
                `flex items-center justify-center px-6 py-4
                whitespace-nowrap text-white transition-colors
                hover:bg-primary w-full`,
                currentFilter === item.id ? "bg-primary" : "",
              )}
            >
              {item.name}
            </button>
          ))}
        </div>
      </div>
      {props.children}
    </>
  );
};
