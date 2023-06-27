"use client";

import { ISwapiUser } from "@/interfaces/swapi";
import axios from "axios";
import { useEffect, useState } from "react";

export default function SwapiUser(props: { userId: number }) {
  const [swapiUser, setSwapiUser] = useState<ISwapiUser>();

  const { userId } = props;

  useEffect(() => {
    axios
      .get<ISwapiUser>(`https://swapi.dev/api/people/${userId}`)
      .then(function (response) {
        setSwapiUser(response.data);
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    swapiUser && (
      <tr className="bg-gray-800">
        <td className="p-3">
          <div className="flex align-items-center">
            <div className="ml-3">
              <div className="">{swapiUser.name}</div>
            </div>
          </div>
        </td>
        <td className="p-3">{swapiUser.height}</td>
        <td className="p-3 font-bold">{swapiUser.birth_year}</td>
        <td className="p-3">
          <span className="bg-green-400 text-gray-50 rounded-md px-2">
            {swapiUser.gender}
          </span>
        </td>
        <td className="p-3 ">
          <a href="#" className="text-gray-400 hover:text-gray-100 mr-2">
            <i className="material-icons-outlined text-base">visibility</i>
          </a>
          <a href="#" className="text-gray-400 hover:text-gray-100  mx-2">
            <i className="material-icons-outlined text-base">edit</i>
          </a>
          <a href="#" className="text-gray-400 hover:text-gray-100  ml-2">
            <i className="material-icons-round text-base">delete_outline</i>
          </a>
        </td>
      </tr>
    )
  );
}
