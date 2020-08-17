import React, { Fragment } from "react";
import { gql, useQuery } from "@apollo/client";
import { LaunchTile, Header, Button, Loading } from "../components";

export const LAUNCH_TILE_DATA = gql`
  fragment LaunchTile on Launch {
    id
    isBooked
    rocket {
      id
      name
    }
    mission {
      name
      missionPatch
    }
  }
`;

const GET_LAUNCHES = gql`
  query launchList($after: String) {
    launches(after: $after) {
      cursor
      hasMore
      launches {
       ...LaunchTile
      }
    }
  }
  ${LAUNCH_TILE_DATA}
`;

const Launches = () => {
  const launchesRes = useQuery(GET_LAUNCHES);
  console.log('data in launches', launchesRes);
  const { data, loading, error, fetchMore } = launchesRes;
  if (loading) return <div>loading ...</div>;
  if (error) return <p>ERROR</p>;
  if (!data) return <p>Not found</p>;
  return (
    <Fragment>
      {/* <Header /> */}
      {data.launches &&
        data.launches.launches &&
        data.launches.launches.map(launch => (
          <LaunchTile key={launch.id} launch={launch} />
        ))}

{data.launches &&
  data.launches.hasMore && (
    <button
      onClick={() =>
        fetchMore({
          variables: {
            after: data.launches.cursor,
          },
          updateQuery: (prev, { fetchMoreResult, ...rest }) => {
            console.log('fetch more res', fetchMoreResult);
            if (!fetchMoreResult) return prev;
            return {
              ...fetchMoreResult,
              launches: {
                ...fetchMoreResult.launches,
                launches: [
                  ...prev.launches.launches,
                  ...fetchMoreResult.launches.launches,
                ],
              },
            };
          },
        })
      }
    >
      Load More
    </button>
  )
}
    </Fragment>
  );
};

export default Launches;
