import React from "react";
import { useParams } from "react-router";
import { useAppDispatch, useAppSelector } from "../../store";
import { getOneById } from "../../store/slices/pokemonSlice";
import { Stats } from "../../components";

export const Pokemon = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = React.useState<boolean>(false);
  const { pokemon } = useAppSelector((store) => store.pokemons);

  React.useEffect(() => {
    if (id != null) {
      setLoading(true);
      dispatch(getOneById(id));
      setTimeout(() => {
        setLoading(false);
      }, 1500);
    }
  }, []);

  return loading ? (
    <>
      <p className="animate-bounce text-green-500 text-6xl">
        Data is loading...
      </p>
    </>
  ) : (
    <div className={"w-full flex justify-center items-center flex-col"}>
      <h2 className={"text-3xl text-center text-gray-900"}>{pokemon?.name}</h2>
      <img
        className={"w-2/12 h-2/12"}
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon?.id}.png`}
        alt={pokemon?.name}
      />
      <div>
        <Stats props={pokemon?.stats} />
      </div>
      <div className={"w-full"}>
        <h2 className={"text-3xl text-center text-gray-900"}>Moves:</h2>
        <div className={"grid grid-cols-12"}>
          {pokemon?.moves.map((item: any, index: number) => {
            return (
              <p key={index} className={"text-center"}>
                {item?.move.name}
              </p>
            );
          })}
        </div>
      </div>
    </div>
  );
};
