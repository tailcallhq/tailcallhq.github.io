---
title: Deploy Tailcall on AWS Lambda
sidebar_label: Deploy on AWS
description: "Deploy `tailcall` on AWS Lambda using the github action `tailcallhq/gh-action`"
---

Before deploying `tailcall` on AWS Lambda, you need to generate the AWS Access Key ID and Secret Access Key. If you don't have an AWS account, you can create one [here](https://aws.amazon.com/).

## Generate Access Keys for AWS

Follow the steps below to generate the Access Keys:

1. Go to [AWS Management Console](https://console.aws.amazon.com/) and click the drop down menu in the top right corner and Click on `Security credentials`.

   ![credentials.png](../static/images/aws/credentials.png)

2. Scroll down to the `Access Keys` section and click on `Create access key`.

   ![access-key.png](../static/images/aws/access-key.png)

3. You will get the following warning since we are trying to create access keys for the root user. For this guide, we will continue with creating the access keys. If you do not want to continue with the root user, you can learn more about the AWS security credentials [here](https://docs.aws.amazon.com/IAM/latest/UserGuide/security-creds.html) and managing access keys [here](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_access-keys.html?icmpid=docs_iam_console#Using_CreateAccessKey).

   ![warning.png](../static/images/aws/warning.png)

4. Once you click on `Create access key`, you will get the `Access key ID` and `Secret access key`. Make sure to download the `CSV` file and store it securely.

   ![access-keys.png](../static/images/aws/access-keys.png)

## Terraform setup

Now that you have the AWS Access Key ID and Secret Access Key, you will need to generate API token for terraform and setup a terraform organization and workspace. If you don't have a Terraform Cloud account, you can create one [here](https://app.terraform.io/signup/account).

### Terraform API Token

Follow these steps to generate the Terraform API token:

1. Go to the [Tokens section in Settings](https://app.terraform.io/app/settings/tokens) and click on `Create an API token`.

   ![create-token.png](../static/images/aws/create-token.png)

2. Give a description for the token and change the expiration if required. Click on `Generate token`.

   ![gen-token.png](../static/images/aws/gen-token.png)

3. Copy the generated token and store it securely.

   ![token.png](../static/images/aws/token.png)

### Terraform Organization and Workspace

1. To create an organization, go to the [Organizations section in Settings](https://app.terraform.io/app/organizations) and click on `Create organization`.

   ![terra-org.png](../static/images/aws/terra-org.png)

2. Fill in the organization name and email and click on `Create organization`.

   ![create-org.png](../static/images/aws/create-org.png)

3. Now that you have created an organization, you will be presented with the following page for creating a workspace. Click on `CLI-Driven Workflow`, since the github action which we will be using for deployment, [tailcallhq/gh-action](https://github.com/tailcallhq/gh-action), uses the terraform CLI.

   ![workflow.png](../static/images/aws/workflow.png)

4. Fill in the workspace name. By default the project will be set to `Default Project`, if you have any project in terraform cloud, you can select that project, otherwise continue with the `Default Project` and click on `Create`.

   ![create-workspace.png](../static/images/aws/create-workspace.png)

You now have everything required for a successful deployment of your `tailcall` server on AWS Lambda.

## Setting up the project repo

Now you need to create a new repository on Github and use the Github action `tailcallhq/gh-action` to deploy it. The easiest way to get started is to create a new repository using this template repo [https://github.com/tailcallhq/deploy-tailcall](https://github.com/tailcallhq/deploy-tailcall).

1. Go to the repo and click on `Use this template` and create a new repository.

   ![github-template.png](../static/images/docs/fly/github-template.png)

2. Give your repository a name and click on `Create repository`.

   ![create-repo.png](../static/images/aws/create-repo.png)

3. Now that you have created a repository, you will need to add the AWS access keys and Terraform API token to the repository secrets. To do that, click on `Settings`.

   ![settings.png](../static/images/aws/settings.png)

4. Click on `Secrets and variables` in the left side bar to expand the section and click on `Actions`.

   ![actions.png](../static/images/aws/actions.png)

5. Click on `New repository secret` to add a new secret.

   ![new-secret.png](../static/images/aws/new-secret.png)

6. Add the secret name as `AWS_ACCESS_KEY_ID` or any name you prefer and paste the AWS access key ID that you generated earlier in the value field. Click on `Add secret` to save the secret.

   ![secret.png](../static/images/aws/secret.png)

7. Similarly add the AWS secret access key and the Terraform API token as secrets to the repository.

   ![other-secrets.png](../static/images/aws/other-secrets.png)

You are now ready to deploy your `tailcall` server on AWS Lambda using terraform.

## Deploy on AWS Lambda using terraform

In this example, we will deploy a simple `graphQL` server using `tailcall`, on AWS Lambda using terraform, which will convert the JSONPlaceholder REST API to a GraphQL API.

Below is the config present in the template repo, that will be used for this deployment. You can learn more about this [here](getting-started.mdx#writing-a-graphql-configuration).

```graphql
schema {
  query: Query
}

type Query {
  posts: [Post]
    @http(url: "https://jsonplaceholder.typicode.com/posts")
}

type User {
  id: Int!
  name: String!
  username: String!
  email: String!
  phone: String
  website: String
}

type Post {
  id: Int!
  userId: Int!
  title: String!
  body: String!
  user: User
    @http(
      url: "https://jsonplaceholder.typicode.com/users/{{.value.userId}}"
    )
}
```

To deploy the server, just update the `provider` to `aws` in the `deploy-tailcall` job in the `.github/workflows/main.yml` file, similar to the example below. Also, update the `terraform-workspace` and `terraform-org` as well as the other inputs based on your requirements.

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
          provider: "aws"
          aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
          aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          aws-region: "us-east-1"
          aws-iam-role: "iam_for_tailcall"
          terraform-api-token: ${{ secrets.TERRAFORM_API_TOKEN }}
          terraform-org: "tailcall-demo"
          terraform-workspace: "tailcall"
          tailcall-config: "config.graphql"
```

After updating the `main.yml` file, commit the changes and push them to the repository. This will trigger the deployment of the `tailcall` server on AWS Lambda.
