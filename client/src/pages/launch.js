import React, { Fragment } from "react";
import { gql, useQuery } from "@apollo/client";
import { LaunchDetail } from "../components";
// import { ActionButton } from "../containers";
import { LAUNCH_TILE_DATA } from './launches';

export const GET_LAUNCH_DETAILS = gql`
  query LaunchDetails($launchId: ID!) {
    launch(id: $launchId) {
      id
      site
      isBooked
      rocket {
        type
      }
     ...LaunchTile
    }
  }
  ${LAUNCH_TILE_DATA}
`;

const Launch = ({ launchId }) => {
  const { data, loading, error } = useQuery(GET_LAUNCH_DETAILS, {
    variables: { launchId }
  });
console.log('data in lunch details', data)
  if (loading) return <div>loading...</div>;
  if (error) return <p>ERROR: {error.message}</p>;
  if (!data) return <p>Not found</p>;

  return (
    <Fragment>
      {/* <Header
        image={
          data.launch && data.launch.mission && data.launch.mission.missionPatch
        }
      >
        {data && data.launch && data.launch.mission && data.launch.mission.name}
      </Header> */}
      <LaunchDetail {...data.launch} />
      {/* <ActionButton {...data.launch} /> */}
    </Fragment>
  );
};

export default Launch;