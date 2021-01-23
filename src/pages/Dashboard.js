import React from "react";

import { BrowserRouter } from "react-router-dom";
import { ApolloProvider } from "@apollo/react-hooks";
import client from "../complements/Client";
import People from "../complements/People";
import Navbar from "../complements/Navbar";
import Route from "../complements/Router";
// import DetailsPeople from "../complements/DetailsPeople";
import "./dashboard.css";

function Dashboard() {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Navbar />
        <main className="main-character">
          <People />
          <Route />
        </main>
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default Dashboard;
