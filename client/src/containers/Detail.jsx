import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Navbar from "../components/Navbar";
import DetailCard from "../components/DetailCard";

import { getPokemonById, clearData } from "../actions/actions";

const Detail = () => {
  const pokemonById = useSelector((state) => state.pokemonById);
  const params = useParams();
  const dispatch = useDispatch();

  const {
    id,
    name,
    image,
    health,
    strength,
    defense,
    speed,
    height,
    weight,
    types,
  } = pokemonById;

  useEffect(() => {
    if(isNaN(params.id)) {
      dispatch(getPokemonById(params.id));
    } else {
      dispatch(getPokemonById(Number(params.id)));
    }
  }, [dispatch, params]);

  useEffect(() => {
    return () => dispatch(clearData('clear-detail'))
  },[dispatch])

  return (
    <>
      <Navbar />
      {pokemonById !== undefined ? (
        <DetailCard
          id={id}
          name={name}
          image={image}
          health={health}
          strength={strength}
          defense={defense}
          speed={speed}
          height={height}
          weight={weight}
          types={types}
        />
      ) : (
        <h1>Loading...</h1>
      )}
    </>
  );
};

export default Detail;
