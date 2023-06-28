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
      return <SwapiPeople data={menu} />;
    case "planets":
      return <SwapiPlanets data={menu} />;
    case "films":
      return <SwapiFilms data={menu} />;
    case "species":
      return <SwapiSpecies data={menu} />;
    case "vehicles":
      return <SwapiVehicles data={menu} />;
    case "starships":
      return <SwapiStarships data={menu} />;
    default:
      return "Select a menu";
  }
}
