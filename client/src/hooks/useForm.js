import axios from "axios";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'

import { getAllPokemons } from "../actions/actions";

export const useForm = (initialForm) => {
  const [inputs, setInputs] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [response, setResponse] = useState(null)
  const allPokemons = useSelector(state => state.allPokemons)

  const dispatch = useDispatch()

  useEffect(() =>{
    if(inputs.types.length > 3) setErrors(prevState => ({...prevState, types: 'max three types'}))
    if(inputs.types.length <= 3) setErrors(prevState => {
    let copy = {...prevState};
    delete copy.types
    return {
      ...copy
    }
  })
},[inputs.types])
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleClick = (e) => {
    const value = e.target.value;
    if(inputs.types.includes(value)) {
      return setInputs(prevState => ({...prevState, types: [...prevState.types.filter(type => type !== value)] }))
    }
    
    setInputs((prevState) => ({
      ...prevState,
      types: [...prevState.types, value],
    }));
  };


  const handleBlur = (e) => {
    const { name, value } = e.target;
    if (name === "name") {
      
      if (value.length === 0) setErrors((prevState) => ({ ...prevState, [name]: "Cant be empty" }));
      
      else if (value.includes(" ")) setErrors((prevState) => ({...prevState, [name]: "Cant have spaces",}));
      
      else if (/[0-9]/.test(value)) setErrors((prevState) => ({...prevState, [name]: "Only letters are allowed",}));

      else if (allPokemons.length !== 0 && errors[name] === undefined) {
        let searchExistence = allPokemons.some(pkm => pkm.name === value)
        if (searchExistence) setErrors(prevState => ({...prevState, [name]: "Already Exists"}))
      }
      else {
        setErrors((prevState) => {
          let copy = {...prevState}
          delete copy[name];
          return {
            ...copy,
          };
        });
      }
    }

    if (
      name === "health" ||
      name === "strength" ||
      name === "defense" ||
      name === "speed" ||
      name === "height" ||
      name === "weight"
    ) {
      if (value === "") setErrors((prevState) => ({ ...prevState, [name]: "Cant be empty" }));
      
      else if (Number(value) > 100 || Number(value) < 1) setErrors((prevState) => ({...prevState,[name]: "The number must be between 1 and 100",}));
      
      else {
        let errorsCopy = { ...errors };
        delete errorsCopy[name];
        setErrors((prevState) => (prevState = errorsCopy));
      }
    }
  };

  const handleSubmit = async (e) => {
    let form = {
      name: inputs.name,
      health: Number(inputs.health),
      strength: Number(inputs.strength),
      defense: Number(inputs.defense),
      speed: Number(inputs.speed),
      height: Number(inputs.height),
      weight: Number(inputs.weight),
      image: "https://svgsilh.com/svg_v2/1574006.svg",
      types: inputs.types,
    }
    e.preventDefault();
    await axios({
      method: "POST",
      url: "http://localhost:3001/pokemons",
      data: form,
    })
    .then(response => {
        setResponse(prevState => (prevState = response.data.msj))
    })
    .catch(err => console.error(err));
  };

  useEffect(() => {
    return ()=> dispatch(getAllPokemons())
  },[dispatch])

  return {
    inputs,
    errors,
    response,
    handleChange,
    handleClick,
    handleBlur,
    handleSubmit,
  };
};
