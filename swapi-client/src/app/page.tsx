"use client";
import Navbar from "@/components/general/navbar";
import SwapiDisplayer from "@/components/swapi/swapi-displayer";
import SwapiMenus from "@/components/swapi/swapi-menu";
import { IDictionaryContent } from "@/interfaces/main";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Home() {
  const [swapiMenus, setSwapiMenus] = useState<IDictionaryContent[]>();
  const [index, setIndex] = useState<number>(0);

  useEffect(() => {
    axios
      .get<Record<string, string>>(`https://swapi.dev/api/`)
      .then(function (response) {
        var mappedDictionary: IDictionaryContent[] = Object.entries(
          response.data
        ).map(([key, value]) => {
          return {
            key,
            value,
          };
        });
        setSwapiMenus(mappedDictionary);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const changeIndex = (number: number) => {
    if (number >= 0 && number < swapiMenus!.length) {
      setIndex(number);
    }
  };

  return (
    <>
      <Navbar />
      <main className="flex min-h-screen flex-col items-center p-24">
        <SwapiMenus
          menus={swapiMenus}
          indexChanger={changeIndex}
          selectedIndex={index}
        />
        {swapiMenus && <SwapiDisplayer menu={swapiMenus[index]} />}
      </main>
    </>
  );
}
