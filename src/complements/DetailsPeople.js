import React from "react";
import { useParams } from "react-router-dom";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";

const STARWARS_QUERY = gql`
  {
    allPeople {
      people {
        id
        name
        species {
          id
          name
        }
        homeworld {
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
  // let people = data.allPeople.people;

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
                <td className="main-table__td">Eye Color</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
