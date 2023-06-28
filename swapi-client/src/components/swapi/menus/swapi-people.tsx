/* eslint-disable @next/next/no-img-element */
import { GetGenderChip } from "@/app/functions/characters";
import { IDictionaryContent } from "@/interfaces/main";
import { ISwapiPeople } from "@/interfaces/swapi";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  EyeIcon,
} from "@heroicons/react/24/outline";
import axios from "axios";
import { useEffect, useState } from "react";

export default function SwapiPeople(props: { data: IDictionaryContent }) {
  const { data } = props;
  const [swapiPeople, setSwapiPeople] = useState<ISwapiPeople>();
  const [apiRequest, setApiRequest] = useState<string>(data.value);
  const [currentPageNumber, setCurrentPageNumber] = useState<number>(1);

  useEffect(() => {
    axios
      .get<ISwapiPeople>(apiRequest)
      .then(function (response) {
        setSwapiPeople(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [apiRequest]);

  const prevPage = () => {
    if (swapiPeople && swapiPeople?.previous) {
      setSwapiPeople(undefined);
      setApiRequest(swapiPeople.previous);
      setCurrentPageNumber((prevNumber) => prevNumber - 1);
    }
  };

  const nextPage = () => {
    if (swapiPeople && swapiPeople?.next) {
      setSwapiPeople(undefined);
      setApiRequest(swapiPeople.next);
      setCurrentPageNumber((prevNumber) => prevNumber + 1);
    }
  };

  const totalPages = (numberItems: number) => {
    var numberPages = numberItems / 10;
    return numberPages % 1 === 0 ? numberPages : (numberPages + 1).toFixed(0);
  };

  return (
    <>
      <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-4 font-medium text-gray-900">
              Name
            </th>
            <th scope="col" className="px-6 py-4 font-medium text-gray-900">
              Height
            </th>
            <th scope="col" className="px-6 py-4 font-medium text-gray-900">
              Mass
            </th>
            <th scope="col" className="px-6 py-4 font-medium text-gray-900">
              Gender
            </th>
            <th
              scope="col"
              className="px-6 py-4 font-medium text-gray-900 text-center"
            >
              Full Infos
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 border-t border-gray-100">
          {swapiPeople
            ? swapiPeople.results &&
              swapiPeople.results.map((character, index) => {
                return (
                  <tr className="hover:bg-gray-50" key={index}>
                    <th className="flex gap-3 px-6 py-4 font-normal text-gray-900">
                      <div className="font-medium text-gray-700">
                        {character.name}
                      </div>
                    </th>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-2 py-1 text-xs font-semibold text-green-600">
                        {character.height + " "}cm
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1 rounded-full bg-yellow-100 px-2 py-1 text-xs font-semibold text-yellow-600">
                        {character.mass + " "}kg
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {GetGenderChip(character.gender)}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex justify-center gap-4">
                        <a href="#">
                          <EyeIcon
                            className="block h-6 w-6"
                            aria-hidden="true"
                          />
                        </a>
                      </div>
                    </td>
                  </tr>
                );
              })
            : Array.from({ length: 10 }, (_, index) => (
                <tr className="hover:bg-gray-50" key={index}>
                  <th className="flex gap-3 px-6 py-4 font-normal text-gray-900">
                    <div className="animate-pulse bg-gray-200 h-6 w-40"></div>
                  </th>
                  <td className="px-6 py-4">
                    <div className="animate-pulse bg-gray-200 h-6 w-40"></div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="animate-pulse bg-gray-200 h-6 w-40"></div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="animate-pulse bg-gray-200 h-6 w-40"></div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-center gap-4">
                      <a href="#">
                        <EyeIcon className="block h-6 w-6" aria-hidden="true" />
                      </a>
                    </div>
                  </td>
                </tr>
              ))}
        </tbody>
      </table>
      <div className="flex flex-row text-gray-900 w-full justify-between bg-gray-200">
        <div className="flex justify-center px-6 py-4 w-1/6">
          <a
            className="hover:text-purple-600 cursor-pointer"
            onClick={() => prevPage()}
          >
            <ChevronLeftIcon className="h-4 w-4" />
          </a>
        </div>
        <div className="flex justify-center px-6 py-4 w-4/6">
          {swapiPeople ? (
            <p>{`${currentPageNumber} | ${totalPages(swapiPeople.count)}`}</p>
          ) : (
            <div className="animate-pulse bg-gray-200 h-6 w-40"></div>
          )}{" "}
        </div>
        <div className="flex justify-center px-6 py-4 w-1/6">
          {" "}
          <a
            className="hover:text-purple-600 cursor-pointer"
            onClick={() => nextPage()}
          >
            <ChevronRightIcon className="h-4 w-4" />
          </a>
        </div>
      </div>
    </>
  );
}
