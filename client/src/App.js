import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { getAllPokemons, getAllTypes } from "./actions/actions";

import Welcome from "./containers/Welcome";
import Home from "./containers/Home";
import Form from "./containers/Form";
import Detail from "./containers/Detail";
import NotFound from "./containers/NotFound";
import DetailCard from "./components/DetailCard";


const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllPokemons());
    dispatch(getAllTypes());
  }, [dispatch]);

  return (
    <Routes>
      <Route path="/" element={<Welcome />} />
      <Route path="/home" element={<Home />} />
      <Route path="/detail" element={<Detail />}>
        <Route path=":id" element={<DetailCard />} />
      </Route>
      <Route path="/form" element={<Form />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
