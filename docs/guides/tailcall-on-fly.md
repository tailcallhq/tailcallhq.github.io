---
title: Tailcall on Fly
description: "Deploy Tailcall on Fly using the github action `tailcallhq/gh-action`"
---

Tailcall can be deployed on Fly using the github action `tailcallhq/gh-action`. Below is an example of how to deploy Tailcall on Fly using the `tailcallhq/gh-action` action.

```yaml
on: [push]

jobs:
  deploy_tailcall:
    runs-on: ubuntu-latest
    name: Deploy Tailcall
    steps:
      - name: Checkout repository
        uses: actions/checkout@v2
      - name: Deploy Tailcall
        id: deploy-tailcall
        uses: tailcallhq/gh-action@v0.2
        with:
          provider: "fly" # Specify the cloud provider. In this case 'fly'
          fly-api-token: ${{ secrets.FLY_API_TOKEN }}
          fly-app-name: "tailcall"
          fly-region: "lax"
          tailcall-config: "config.graphql"
```

## Inputs for `tailcallhq/gh-action`

The `tailcallhq/gh-action` action requires the following inputs:

| Input             | Description                                                                                                     |
| ----------------- | --------------------------------------------------------------------------------------------------------------- |
| `provider`        | When deploying to Fly, this should be set to `fly`                                                              |
| `fly-api-token`   | The Fly API token required for authentication. Ensure this value is stored securely, such as in GitHub Secrets. |
| `fly-app-name`    | The name of the Fly app being deployed. Defaults to `tailcall` if not specified.                                |
| `fly-region`      | The region where the Fly app will be deployed. Defaults to `ord` if not specified.                              |
| `tailcall-config` | The name of the Tailcall configuration file. This file should be present in the root of the repository.         |
