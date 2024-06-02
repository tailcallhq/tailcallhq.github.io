---
title: "Deploy Tailcall on AWS"
description: "Deploy Tailcall on AWS effortlessly using the tailcall-on-aws template and Terraform. This guide covers everything from setting environment variables to configuring and updating your Tailcall deployment, complete with logging via AWS CloudWatch for comprehensive monitoring and management."
slug: deploy-tailcall-on-aws
---

Tailcall can be hosted on AWS using Lambda and API Gateway using the [tailcall-on-aws](https://github.com/tailcallhq/tailcall-on-aws) template.

1. [Install Terraform.](https://developer.hashicorp.com/terraform/tutorials/aws-get-started/install-cli) The template uses Terraform to orchestrate the required AWS infrastructure, to spare you the time of setting it up by hand.
2. Set the `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY` and `AWS_REGION` environment variables. These are required by Terraform to be able to manage the resourced on AWS. [More info here.](https://registry.terraform.io/providers/hashicorp/aws/latest/docs#environment-variables)
3. [Create a new repository using the tailcall-on-aws template.](https://github.com/new?template_name=tailcall-on-aws&template_owner=tailcallhq)
4. Clone your new repository, run `terraform init`, and then `terraform apply`.
5. Done! The API Gateway URL will be logged to the console when you run `terraform apply`.

Once you've deployed Tailcall for the first time, you can edit `config/config.graphql` to [build your API](../../guides/getting-started-with-graphql-using-tailcall/#configuration). If you [install Tailcall locally](../../guides/getting-started-with-graphql-using-tailcall/#installing-the-tailcall-cli), you can test your config by running:

```bash
tailcall start ./config/config.graphql
```

When you want to push your changes to the deployment, you should run `terraform apply` again. This will also update Tailcall to the latest version.

## Logging

All Tailcall logs will be uploaded to and stored in AWS CloudWatch. Logs of all levels are stored by default, so that you can filter the logs as necessary when viewing them in CloudWatch.

If you would like to filter the logs before they get ingested, you can create the `config/.env` file and specify the minimum log level with the `LOG_LEVEL` environment variable. The available levels are: `TRACE` (default), `DEBUG`, `INFO`, `WARN` and `ERROR`.
