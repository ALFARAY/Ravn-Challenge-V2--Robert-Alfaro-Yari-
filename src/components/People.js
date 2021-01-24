import React from "react";
import { Link } from "react-router-dom";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";

const STARWARS_QUERY = gql`
  query repoQuery($after: String) {
    allPeople(first: 5, after: $after) {
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
  if (error) {
    return <div className="main-error">Failed to Load data</div>;
  }
  if (loading || !data) {
    return <div className="main-loading">Loading...</div>;
  }

  return (
    <>
      <section className="main-character__item-left">
        <ul className="main-menu">
          <li className="main-menu__item main-menu__item-icon">
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
        <button
          className="main-button"
          onClick={() => {
            const { endCursor } = data.allPeople.pageInfo;
            fetchMore({
              variables: { after: endCursor },
              updateQuery: (prevResult, { fetchMoreResult }) => {
                fetchMoreResult.allPeople.people = [
                  ...prevResult.allPeople.people,
                  ...fetchMoreResult.allPeople.people,
                ];
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
