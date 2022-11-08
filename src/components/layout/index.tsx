import React from "react";
import { Outlet } from "react-router";
import { useAppDispatch } from "../../store";
import { getAll } from "../../store/slices/pokemonSlice";
import { baseUrl } from "../../constants/api";
import { Header } from "../header";
import { Footer } from "../footer";

export const Layout = () => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = React.useState<boolean>(false);
  React.useEffect(() => {
    setLoading(true);
    dispatch(getAll(baseUrl));
    setLoading(false);
  }, []);

  return (
    <>
      <Header />
      <div className="container h-full justify-center items-center max-[480px]:items-start flex mx-auto px-4 ">
        {loading ? <p>Data is loading</p> : <Outlet />}
      </div>
      <Footer />
    </>
  );
};
