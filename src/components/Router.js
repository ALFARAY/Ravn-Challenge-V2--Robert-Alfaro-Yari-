import React from "react";
import { Switch, Route } from "react-router-dom";
import DetailsPeople from "../components/DetailsPeople";

export default function Router() {
  return (
    <>
      <Switch>
        {/* Sending variable by url to child component */}
        <Route path="/:id" children={<DetailsPeople />} />
      </Switch>
    </>
  );
}
