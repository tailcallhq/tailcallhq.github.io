---
title: Compose
---

The Tailcall CLI's `compose` command facilitates the merging of configuration files and their conversion between different formats using the `--format` option.

It supports `gql` or `graphql`, `yml` or `yaml`, `json`. Default is `json`.

## Converting Formats with `compose --format`

To convert files between different formats, use the following syntax:

```bash
tailcall compose <input_files> <output_file> --format format_type
```

## Example Usage

Let's try to convert a Tailcall graphql file to json and then back to graphql

To convert graphql to json

```bash
tailcall compose examples/jsonplaceholder.graphql --format json > "examples/jsonplaceholder.json"
```

Now to convert back to graphql

```bash
tailcall compose examples/jsonplaceholder.json --format graphql > "examples/jsonplaceholder2.graphql"
```

![Example Image](/static/images/docs/compose.png)
