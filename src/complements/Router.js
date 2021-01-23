import React from "react";
import { Switch, Route } from "react-router-dom";
import DetailsPeople from "../complements/DetailsPeople";

export default function Router() {
  return (
    <>
      <Switch>
        <Route path="/:id" children={<DetailsPeople />} />
      </Switch>
    </>
  );
}
