import React from "react";
import Layout from "@theme/Layout"
import "graphiql/graphiql.css";
import Playground from "../components/playground/Playground";

const PlaygroundPage = () => {
    return (
        <Layout title="GraphQL Playground" description="Explore, test, and interact with your GraphQL APIs effortlessly">
            <Playground />
        </Layout>
    );
}

export default PlaygroundPage;