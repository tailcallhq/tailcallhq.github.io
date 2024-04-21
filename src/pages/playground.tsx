import React from "react";
import Layout from "@theme/Layout"
import "graphiql/graphiql.css";
import Playground from "../components/playground/Playground";

const PlaygroundPage = () => {
    return (
        <Layout title="Tailcall Playground" description="Explore, test, and interact with your GraphQL APIs effortlessly">
            <Playground defaultApiEndpoint="http://localhost:8000" />
        </Layout>
    );
}

export default PlaygroundPage;