import React from "react";
import { useLocation } from "react-router";
import { routes } from "../../constants/routesPath";
import { Link } from "react-router-dom";
import { ArrowLeftIcon } from "@heroicons/react/20/solid";

export const Header = () => {
  const location = useLocation();
  const back = location.pathname.includes("/pokemon");

  return (
    <div
      className={
        "w-full h-10 bg-slate-600 mb-5 flex justify-start items-center text-white"
      }
    >
      {back && (
        <Link
          className={"ml-5 flex items-center justify-between"}
          to={routes.layout}
        >
          <ArrowLeftIcon className={"h-5 w-5"} />
          <span>back</span>
        </Link>
      )}
      <p className={"mx-5"}>Header</p>
    </div>
  );
};
