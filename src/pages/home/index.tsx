import React from "react";
import { useAppDispatch, useAppSelector } from "../../store";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import {
  getAll,
  getByType,
  getOneByName,
} from "../../store/slices/pokemonSlice";
import { useNavigate } from "react-router";
import { Pokemon } from "../../types";
import { pokemonTypes } from "../../constants/pokemontypes";
import { baseUrl } from "../../constants/api";

export const Home = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [pageIndex, setPageIndex] = React.useState(0);
  const { pokemons, pokemon, prev, next } = useAppSelector(
    (state) => state.pokemons
  );

  const [state, setState] = React.useState<Pokemon[]>(pokemons);

  React.useEffect(() => {
    setState(pokemons);
  }, [pokemons]);

  const previousPage = () => {
    if (prev !== null) dispatch(getAll(prev));
    setPageIndex((prev) => prev - 1);
  };

  const nextPage = () => {
    if (next !== null) dispatch(getAll(next));
    setPageIndex((prev) => prev + 1);
  };

  const handleClickById = (id: number) => {
    navigate(`pokemon/${id}`);
  };

  const handleClickByName = (name: string | undefined) => {
    if (name != null) {
      dispatch(getOneByName(name));
      navigate(`pokemon/${pokemon.id}`);
    }
  };

  const selectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    event.target.value !== "0"
      ? dispatch(getByType(event.target.value))
      : dispatch(getAll(baseUrl));
  };

  const filteredPokemon = (event: React.ChangeEvent<HTMLInputElement>) => {
    const pokemon = pokemons.filter((item: Pokemon) =>
      item.name
        ? item.name.includes(event.target.value)
        : item.pokemon?.name.includes(event.target.value)
    );
    setState(pokemon);
  };

  return (
    <div className={"w-full flex flex-col items-center"}>
      <div className={"w-6/12 flex justify-between items-center"}>
        <input
          type="text"
          className={"mw-3/12 my-3 border-2 border-black px-3 py-2 rounded-3xl"}
          placeholder={"Write name..."}
          onChange={(event) => filteredPokemon(event)}
        />
        <select onChange={(event) => selectChange(event)}>
          {pokemonTypes.map((item, index) => (
            <option
              className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              key={index}
              value={item.value}
            >
              {item.name}
            </option>
          ))}
        </select>
      </div>
      <div className={"w-11/12 flex items-center justify-center"}>
        {pageIndex !== 0 && (
          <nav
            className="isolate inline-flex -space-x-px rounded-md shadow-sm"
            aria-label="Pagination"
          >
            <button
              onClick={previousPage}
              className="relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-4 py-4 text-sm mr-5 font-medium text-gray-500 hover:bg-gray-50 focus:z-20"
            >
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
              <span className="">Prev</span>
            </button>
          </nav>
        )}
        <div className="grid  lg:grid-cols-5 md:grid-cols-3 min-[480px]:grid-cols-2 gap-4 w-full cursor-pointer">
          {state.map((item: Pokemon, index: number) => {
            return (
              <div
                key={index}
                className="flex justify-center flex-col items-center border-2 border-black rounded-3xl hover:bg-gray-200"
                onClick={() =>
                  item.name
                    ? handleClickById(index + pageIndex * 20 + 1)
                    : handleClickByName(item?.pokemon?.name)
                }
              >
                {item.name ? item.name : item?.pokemon?.name}
                {item.name && (
                  <img
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
                      index + pageIndex * 20 + 1
                    }.png`}
                    alt={item.name}
                  />
                )}
              </div>
            );
          })}
        </div>
        {state.length <= 20 && (
          <nav
            className="isolate inline-flex -space-x-px rounded-md shadow-sm"
            aria-label="Pagination"
          >
            <button
              onClick={nextPage}
              className="relative inline-flex items-center rounded-r-md border border-gray-300 bg-white px-4 py-4 ml-5 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20"
            >
              <span>Next</span>
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          </nav>
        )}
      </div>
    </div>
  );
};
