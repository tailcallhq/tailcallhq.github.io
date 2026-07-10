import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

const QUERY = gql`
  query {
    playground {
      data
    }
  }
`;

const PlaygroundPage = ({ data }) => {
  if (data.loading) return <div>Loading...</div>;
  if (data.error) return <div>Error: {data.error.message}</div>;

  return (
    <div>
      <h1>Playground</h1>
      <pre>{JSON.stringify(data.playground.data, null, 2)}</pre>
    </div>
  );
};

export default graphql(QUERY)(PlaygroundPage);
