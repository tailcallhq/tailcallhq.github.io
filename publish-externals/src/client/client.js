"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.client = void 0;
var client_1 = require("@apollo/client");
var error_1 = require("@apollo/client/link/error");
var constants_1 = require("../utils/constants");
var httpLink = new client_1.HttpLink({
    uri: "https://gql.hashnode.com/",
    headers: {
        Authorization: constants_1.HASHNODE_PAT,
    },
});
var errorLink = (0, error_1.onError)(function (_a) {
    var graphQLErrors = _a.graphQLErrors, networkError = _a.networkError;
    if (graphQLErrors)
        graphQLErrors.forEach(function (_a) {
            var message = _a.message, locations = _a.locations, path = _a.path;
            return console.log("[GraphQL error]: Message: ".concat(message, ", Location: ").concat(JSON.stringify(locations), ", Path: ").concat(JSON.stringify(path)));
        });
    if (networkError) {
        console.log("[Network error]: ".concat(JSON.stringify(networkError)));
    }
});
exports.client = new client_1.ApolloClient({
    link: client_1.ApolloLink.from([errorLink, httpLink]),
    cache: new client_1.InMemoryCache(),
});
