import React from "react";

interface StatsProps {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
    url: string;
  };
}

export const Stats: React.FC<any> = ({ props }) => {
  return (
    <div>
      <h1 className={"text-3xl text-center text-gray-900"}>Stats: </h1>
      <table className="table-auto">
        <thead>
          <tr>
            {props?.map((i: StatsProps, index: number) => {
              return (
                <th className={"border-black border-2 p-2"} key={index}>
                  {i.stat?.name}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          <tr>
            {props?.map((i: StatsProps, index: number) => {
              return (
                <th className={"border-black border-2 p-2"} key={index}>
                  {i?.base_stat}
                </th>
              );
            })}
          </tr>
        </tbody>
      </table>
    </div>
  );
};
