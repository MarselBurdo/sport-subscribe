import React, { useEffect } from "react";
import { useQuery, gql } from "@apollo/client";

function Table() {
  const { data, loading, subscribeToMore } = useQuery(GET_TEAMS);

  useEffect(() => {
    subscribeToMore({
      document: GAMES_SUB,
      updateQuery: (prev, { subData }) => {
        if (!subData) return prev;
        const newGame = subData.data.newGame;
        const updatedGameList = Object.assign({}, prev, {
          games: [...prev.games, newGame],
        });
        return updatedGameList;
      },
    });
  }, []);
  if (!loading) {
    var gameMap = data.games.map((game) => {
      console.log(game);
      return (
        <div>
          <p>{game.status}</p>
          {/* <p>{game.teams}</p> */}
        </div>
      );
    });
  }

  return !loading && <div>{gameMap}</div>;
 
}

export default Table;

const GET_GAMES = gql`
  query {
    games {
      id
      pair
      status
    }
  }
`;
const GET_TEAMS = gql`
  query {
    teams {
      name
      skill
    }
  }
`;
const GAMES_SUB = gql`
  subscription {
    allGames {
      id
      pair
      status
    }
  }
`;
