---
title: Github Action for Deploying GraphQL
sidebar_label: Deployments
description: "Deploy GraphQL servers effortlessly with GitHub Actions."
slug: deploy-graphql-github-actions
---

The Github Action [tailcallhq/gh-action](https://github.com/tailcallhq/gh-action) can be used to easily deploy a `tailcall` server to any supported cloud provider. Currently, AWS Lambda and Fly are supported.

## Deploying to Fly

Below is an example of how to deploy a `tailcall` server to Fly using the `tailcallhq/gh-action` action.

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
        uses: tailcallhq/gh-action@<version> # Replace <version> with the desired version
        with:
          provider: "fly" # Specifies the cloud provider as 'fly'
          fly-api-token: ${{ secrets.FLY_API_TOKEN }}
          fly-app-name: "tailcall"
          fly-region: "lax"
          tailcall-config: "config.graphql"
```

### Inputs for `tailcallhq/gh-action`

Following are the inputs for the `tailcallhq/gh-action` action when deploying to Fly:

| Input              | Description                                                                                                                      |
| ------------------ | -------------------------------------------------------------------------------------------------------------------------------- |
| `provider`         | When deploying to Fly, this should be set to `fly`.                                                                              |
| `tailcall-config`  | The path of the `tailcall` configuration file.                                                                                   |
| `tailcall-version` | Specifies the version of `tailcall` to use for deployment. If not provided, the Action defaults to the latest available version. |
| `fly-api-token`    | The Fly API token required for authentication. Ensure this value is stored securely, such as in GitHub Secrets.                  |
| `fly-app-name`     | The name of the Fly app being deployed. Defaults to `<orgname>-<reponame>` if not specified.                                     |
| `fly-region`       | The region where the Fly app will be deployed. Defaults to `ord` if not specified.                                               |

## Deploying to AWS Lambda

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
        uses: tailcallhq/gh-action@<version> # Replace <version> with the desired version
        with:
          provider: "aws"
          aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
          aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          aws-region: "us-east-1"
          aws-iam-role: "iam_for_tailcall"
          terraform-api-token: ${{ secrets.TERRAFORM_API_TOKEN }}
          tailcall-config: "config.graphql"
```

### Inputs for `tailcallhq/gh-action`

Following are the inputs for the `tailcallhq/gh-action` action when deploying to AWS Lambda:

| Input                      | Description                                                                                                                      |
| -------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| `provider`                 | When deploying to AWS Lambda, this should be set to `aws`.                                                                       |
| `tailcall-config`          | The path to the `tailcall` configuration file used for deployment.                                                               |
| `tailcall-version`         | Specifies the version of `tailcall` to use for deployment. If not provided, the Action defaults to the latest available version. |
| `aws-access-key-id`        | The AWS access key ID required for authentication. Ensure this value is stored securely, such as in GitHub Secrets.              |
| `aws-secret-access-key`    | The AWS secret access key required for authentication. Store this securely, such as in GitHub Secrets.                           |
| `aws-region`               | The AWS region where the Lambda function will be deployed (e.g., `us-east-1`).                                                   |
| `aws-iam-role`             | The IAM role name to be created and used for the deployment. If not specified, defaults to `iam_for_tailcall`.                   |
| `aws-lambda-function-name` | The name assigned to the created Lambda function. Defaults to `tailcall` if not specified.                                       |
| `terraform-api-token`      | The Terraform Cloud API token required for authentication. Ensure this value is stored securely, such as in GitHub Secrets.      |
