//People
export interface ISwapiPeople {
  count: number;
  next: string | undefined;
  previous: string | undefined;
  results: Array<ISwapiCharacter>;
}

export interface ISwapiCharacter {
  name: string;
  height: string;
  mass: string;
  gender: string;
  url: string;
}

export interface ISwapiUser {
  name: string;
  height: string;
  birth_year: string;
  gender: string;
}
//Planets
export interface ISwapiPlanet {}
//Films
export interface ISwapiFilm {}
//Species
export interface ISwapiSpecies {}
//Vehicles
export interface ISwapiVehicles {}
//Starships
export interface ISwapiStarship {}
