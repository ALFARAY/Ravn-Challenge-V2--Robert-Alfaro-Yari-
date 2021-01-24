import React from "react";
import { Link } from "react-router-dom";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";

const STARWARS_QUERY = gql`
  query repoQuery($after: String) {
    # see the first 5 characters
    allPeople(first: 5, after: $after) {
      # search for each character id, name, species and planet
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
      # endpoint to find the next 5 characters
      pageInfo {
        endCursor
      }
    }
  }
`;

export default function People() {
  const { data, error, loading, fetchMore } = useQuery(STARWARS_QUERY, {
    variables: { after: null },
  });

  // if something went wrong when consulting the information
  if (error) {
    return <div className="main-error">Failed to Load data</div>;
  }

  // If there is an error or there is no data
  if (loading || !data) {
    return <div className="main-loading">Loading...</div>;
  }

  return (
    <>
      <section className="main-character__item-left">
        <ul className="main-menu">
          <li className="main-menu__item main-menu__item-icon">
            {/* foreach to show star wars characters */}
            {data.allPeople.people.map((value) => {
              return (
                <Link
                  className="menu-item__item-a main-character__list-box"
                  to={`/${value.id}`}
                  key={value.id}
                >
                  <span></span>
                  <p className="main-character__list-itemTitle">{value.name}</p>
                  <p className="main-character__list-itemDetails">
                    {value.species == null ? "Humano" : value.species.name} from{" "}
                    {value.homeworld.name}
                  </p>
                </Link>
              );
            })}
          </li>
        </ul>

        {/* button to request 5 more characters */}
        <button
          className="main-button"
          onClick={() => {
            const { endCursor } = data.allPeople.pageInfo;
            fetchMore({
              variables: { after: endCursor },
              updateQuery: (prevResult, { fetchMoreResult }) => {
                // create a new array to display the information
                fetchMoreResult.allPeople.people = [
                  ...prevResult.allPeople.people,
                  ...fetchMoreResult.allPeople.people,
                ];

                // create a new arrangement with the following 5 characters
                return fetchMoreResult;
              },
            });
          }}
        >
          More
        </button>
      </section>
    </>
  );
}
