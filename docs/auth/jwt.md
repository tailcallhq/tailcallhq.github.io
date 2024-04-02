---
title: JWT
description: "Learn how you can provide granular access to types and fields in GraphQL schema with the help of authentication providers"
---

**JWT Authentication** uses digitally signed tokens to authenticate and transmit user information in a compact JSON format, allowing stateless and secure communication between clients and servers. It offers greater flexibility and security, supporting expiration times and custom data embedding within the token itself.

## Prerequisites

To be able to use JWT authentication you should have configured [`JSON Web Key Sets`](https://supertokens.com/blog/understanding-jwks) (JWKS for short) file.

To create this file you can use available web-tools like [JWK creator](https://russelldavies.github.io/jwk-creator/) in case you already have RSA key-pair or [mkjwk](https://mkjwk.org) if you don't.

## Tailcall config

To use JWT you should first include JWKS file generated from [Prerequisites](#prerequisites) with the help of [`@link` directive](../directives/link.md#jwks).

We can use that file as an example for it:

```json title="jwks.json"
{
  "keys": [
    {
      "kty": "RSA",
      "use": "sig",
      "alg": "RS256",
      "kid": "I48qMJp566SSKQogYXYtHBo9q6ZcEKHixNPeNoxV1c8",
      "n": "ksMb5oMlhJ_HzAebCuBG6-v5Qc4J111ur7Aux6-8SbxzqFONsf2Bw6ATG8pAfNeZ-USA3_T1mGkYTDvfoggXnxsduWV_lePZKKOq_Qp_EDdzic1bVTJQDad3CXldR3wV6UFDtMx6cCLXxPZM5n76e7ybPt0iNgwoGpJE28emMZJXrnEUFzxwFMq61UlzWEumYqW3uOUVp7r5XAF5jQ_1nQAnpHBnRFzdNPVb3E6odMGu3jgp8mkPbPMP16Fund4LVplLz8yrsE9TdVrSdYJThylRWn_BwvJ0DjUcp8ibJya86iClUlixAmBwR9NdStHwQqHwmMXMKkTXo-ytRmSUobzxX9T8ESkij6iBhQpmDMD3FbkK30Y7pUVEBBOyDfNcWOhholjOj9CRrxu9to5rc2wvufe24VlbKb9wngS_uGfK4AYvVyrcjdYMFkdqw-Mft14HwzdO2BTS0TeMDZuLmYhj_bu5_g2Zu6PH5OpIXF6Fi8_679pCG8wWAcFQrFrM0eA70wD_SqD_BXn6pWRpFXlcRy_7PWTZ3QmC7ycQFR6Wc6Px44y1xDUoq3rH0RlZkeicfvP6FRlpjFU7xF6LjAfd9ciYBZfJll6PE7zf-i_ZXEslv-tJ5-30-I4Slwj0tDrZ2Z54OgAg07AIwAiI5o4y-0vmuhUscNpfZsGAGhE",
      "e": "AQAB"
    }
  ]
}
```

After adding `@link` you can use the [`@protected` directive](../directives/protected.md) to mark the fields that requiring success authentication to be requested.

The whole example could look like this:

```graphql
schema
  @server(port: 8000, graphiql: true)
  @upstream(baseURL: "http://jsonplaceholder.typicode.com")
  @link(id: "auth-jwks", type: Jwks, src: "jwks.json") {
  query: Query
}

type Query {
  user(id: Int!): User @http(path: "/users/{{args.id}}")
}

type User @protected {
  id: Int!
  name: String!
  username: String!
  email: String!
  phone: String
  website: String
}
```

## Making test request

Now you can run the example file with Tailcall and try to make a query for data with specifying credentials.

To make the request first obtain JWT token compatible with JWKS file you've linked before (if you've used the example `jwks.json` file from above then you can use the token from the example below).

An request example with curl:

```sh
curl --request POST \
  --url http://localhost:8000/graphql \
  --header 'Authorization: Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6Ikk0OHFNSnA1NjZTU0tRb2dZWFl0SEJvOXE2WmNFS0hpeE5QZU5veFYxYzgifQ.eyJleHAiOjIwMTkwNTY0NDEuMCwiaXNzIjoibWUiLCJzdWIiOiJ5b3UiLCJhdWQiOlsidGhlbSJdfQ.cU-hJgVGWxK3-IBggYBChhf3FzibBKjuDLtq2urJ99FVXIGZls0VMXjyNW7yHhLLuif_9t2N5UIUIq-hwXVv7rrGRPCGrlqKU0jsUH251Spy7_ppG5_B2LsG3cBJcwkD4AVz8qjT3AaE_vYZ4WnH-CQ-F5Vm7wiYZgbdyU8xgKoH85KAxaCdJJlYOi8mApE9_zcdmTNJrTNd9sp7PX3lXSUu9AWlrZkyO-HhVbXFunVtfduDuTeVXxP8iw1wt6171CFbPmQJU_b3xCornzyFKmhSc36yvlDfoPPclWmWeyOfFEp9lVhQm0WhfDK7GiuRtaOxD-tOvpTjpcoZBeJb7bSg2OsneyeM_33a0WoPmjHw8WIxbroJz_PrfE72_TzbcTSDttKAv_e75PE48Vvx0661miFv4Gq8RBzMl2G3pQMEVCOm83v7BpodfN_YVJcqZJjVHMA70TZQ4K3L4_i9sIK9jJFfwEDVM7nsDnUu96n4vKs1fVvAuieCIPAJrfNOUMy7TwLvhnhUARsKnzmtNNrJuDhhBx-X93AHcG3micXgnqkFdKn6-ZUZ63I2KEdmjwKmLTRrv4n4eZKrRN-OrHPI4gLxJUhmyPAHzZrikMVBcDYfALqyki5SeKkwd4v0JAm87QzR4YwMdKErr0Xa5JrZqHGe2TZgVO4hIc-KrPw' \
  --data '{"query":"query {\n\tuser(id: 1) { name }\n}"}'
```

Executing such request should be resolved with the user and its name.
