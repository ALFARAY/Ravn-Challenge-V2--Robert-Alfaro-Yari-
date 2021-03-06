import React from "react";

import { BrowserRouter } from "react-router-dom";
import { ApolloProvider } from "@apollo/react-hooks";
import client from "../components/Client";
import People from "../components/People";
import Navbar from "../components/Navbar";
import Route from "../components/Router";
import "./dashboard.css";

function Dashboard() {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Navbar />
        <main className="main-character">
          <People /> {/* Sidebar of list of character */}
          <Route /> {/* component where character details are displayed */}
        </main>
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default Dashboard;
