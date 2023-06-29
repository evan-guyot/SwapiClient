/* eslint-disable @next/next/no-img-element */
import { GetGenderChip } from "@/app/functions/characters";
import { IDictionaryContent } from "@/interfaces/main";
import { ISwapiCharacter, ISwapiPeople } from "@/interfaces/swapi";
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
  const [modalInfos, setModalInfos] = useState<ISwapiCharacter | undefined>();

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
      {modalInfos && (
        <div
          id="defaultModal"
          aria-hidden="true"
          className="fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-full max-h-full m-auto bg-gray-50p"
        >
          <div className="relative w-full max-w-2xl max-h-full top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {modalInfos.name}
                </h3>
                <button
                  type="button"
                  onClick={() => setModalInfos(undefined)}
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              <div className="p-6 space-y-6">
                <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                  Gender : {GetGenderChip(modalInfos.gender)}
                </p>
                <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                  Height :{" "}
                  <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-2 py-1 text-xs font-semibold text-green-600">
                    {modalInfos.height + " "}cm
                  </span>
                </p>
                <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                  Mass :
                  <span className="inline-flex items-center gap-1 rounded-full bg-yellow-100 px-2 py-1 text-xs font-semibold text-yellow-600">
                    {" " + modalInfos.mass + " "}kg
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
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
                          <a
                            onClick={() =>
                              setModalInfos(swapiPeople.results[index])
                            }
                            className="cursor-pointer"
                          >
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
                        <a className="cursor-wait">
                          <EyeIcon
                            className="block h-6 w-6"
                            aria-hidden="true"
                          />
                        </a>
                      </div>
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>
        <div className="flex flex-row text-gray-900 w-full justify-between bg-gray-200">
          <div className="flex justify-center px-6 py-4 w-1/6">
            <button
              className=" flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              onClick={() => prevPage()}
            >
              <ChevronLeftIcon className="h-4 w-4" />
            </button>
          </div>
          <div className="flex justify-center px-6 py-4 w-4/6 items-center">
            {swapiPeople ? (
              <p>{`${currentPageNumber} | ${totalPages(swapiPeople.count)}`}</p>
            ) : (
              <div className="animate-pulse bg-gray-200 h-6 w-40"></div>
            )}{" "}
          </div>
          <div className="flex justify-center px-6 py-4 w-1/6">
            {" "}
            <button
              className=" flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              onClick={() => nextPage()}
            >
              <ChevronRightIcon className="h-4 w-4" />
            </button>
          </div>
        </div>
      </>
    </>
  );
}
