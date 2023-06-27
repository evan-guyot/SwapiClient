"use client";

import SwapiFilms from "./menus/swapi-films";
import SwapiPeople from "./menus/swapi-people";
import SwapiPlanets from "./menus/swapi-planets";
import SwapiSpecies from "./menus/swapi-species";
import SwapiStarships from "./menus/swapi-starships";
import SwapiVehicles from "./menus/swapi-vehicles";
import { IDictionaryContent } from "@/interfaces/main";

export default function SwapiDisplayer(props: { menu: IDictionaryContent }) {
  const { menu } = props;

  switch (menu.key) {
    case "people":
      return <SwapiPeople />;
    case "planets":
      return <SwapiPlanets />;
    case "films":
      return <SwapiFilms />;
    case "species":
      return <SwapiSpecies />;
    case "vehicles":
      return <SwapiVehicles />;
    case "starships":
      return <SwapiStarships />;
    default:
      return "Select a menu";
  }
}
