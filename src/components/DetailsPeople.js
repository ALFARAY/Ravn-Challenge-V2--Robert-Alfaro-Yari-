import React from "react";
import { useParams } from "react-router-dom";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";

const STARWARS_QUERY = gql`
  query {
    person(id: "ZmlsbXM6MQ==") {
      id
      name
      eyeColor
      hairColor
      skinColor
      birthYear
      vehicleConnection {
        vehicles {
          id
          name
        }
      }
    }
  }
`;

export default function DetailsPeople() {
  let { id } = useParams();
  const { data, error, loading } = useQuery(STARWARS_QUERY);

  if (error) {
    return <div className="main-error">Failed to Load data</div>;
  }
  if (loading || !data) {
    return <div className="main-loading">Loading...</div>;
  }

  const characteristics = data["person"];
  const vehicles = data.person.vehicleConnection.vehicles;

  return (
    <>
      <section className="main-character__details">
        <div className="main-character__details-container">
          <table className="main-table">
            <thead>
              <tr>
                <th className="main-table__th" colSpan="2">
                  General Information {id}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="main-table__tr">
                <td className="main-table__td">Eye Color</td>
                <td className="main-table__td">{characteristics.eyeColor}</td>
              </tr>
              <tr className="main-table__tr">
                <td className="main-table__td">Hair Color </td>
                <td className="main-table__td">{characteristics.hairColor}</td>
              </tr>
              <tr className="main-table__tr">
                <td className="main-table__td">Skin Color </td>
                <td className="main-table__td">{characteristics.skinColor}</td>
              </tr>
              <tr className="main-table__tr">
                <td className="main-table__td">Birth Color </td>
                <td className="main-table__td">{characteristics.birthYear}</td>
              </tr>
            </tbody>

            <thead>
              <tr>
                <th className="main-table__th" colSpan="2">
                  Vehicles
                </th>
              </tr>
            </thead>
            <tbody>
              {vehicles.map((value) => {
                return (
                  <tr className="main-table__tr" key={value.id}>
                    <td className="main-table__td">{value.name}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
