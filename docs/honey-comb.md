---
title: Honeycomb Telemetry Integration with Tailcall
description: "Integrate Honeycomb telemetry with Tailcall for detailed insights. Follow our guides to monitor and optimize your API performance."
slug: graphql-honeycomb-telemetry-tailcall
sidebar_label: Honeycomb Integration
---

<Head>
  <title>Tailcall Honeycomb: Enhance Your Honeycomb Experience | Tailcall Docs</title>
</Head>

1. Go to [honeycomb.io](https://www.honeycomb.io)
2. Login to your account
3. Go to `Account -> Team Settings -> Environments and API Keys -> Configuration` and create new or copy existing api key
4. Go to tailcall config and update settings:
   ```graphql
   schema
     @telemetry(
       export: {
         otlp: {
           url: "https://api.honeycomb.io:443"
           headers: [
             {
               key: "x-honeycomb-team"
               value: "{{.env.HONEYCOMB_API_KEY}}"
             }
             {
               key: "x-honeycomb-dataset"
               value: "<your-dataset>"
             }
           ]
         }
       }
     ) {
     query: Query
   }
   ```
5. Set the api key you've copied before to the environment variable named `HONEYCOMB_API_KEY` and start tailcall with updated config

Now make some requests to running service and wait a little bit until honeycomb proceeds the data. After that you can go to `Home -> Total traces` and click on the trace with name `request`. Now choose `Traces` in the bottom and click on the first trace from the list. You should see the picture similar to this:

![trace view](../static/images/telemetry/honeycomb-trace.png)

Here you can see data about the request that was made to tailcall and what actions were made to handle this request.

To see metrics now go `Query` and run a query to fetch the data about metrics. You can use following screenshot as an example:

![metrics view](../static/images/telemetry/honeycomb-metrics.png)
