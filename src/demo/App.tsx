import React from "react";
import "./app.less";
import { Examples } from "./Examples";
import { Tester } from "./Tester";

export const App = () => {
  return (
    <div className="x-body">
      <h1 className="x-header">
        <img src="/ant-logo.svg" height={48} /> React Date Selector with DateMath
      </h1>
      <Examples />

      <hr className="x-hr" />

      <Tester />
    </div>
  );
};
