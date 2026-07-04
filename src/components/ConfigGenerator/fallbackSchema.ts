import type {JSONSchema} from "./jsonSchema"

// A compact, offline snapshot of `.tailcallrc.schema.json`. The live schema is
// always fetched first; this is only used when the network request fails (for
// example while offline or in CI) so the generator stays usable. It mirrors the
// draft-07 shape schemars emits — `definitions`, `$ref`, `enum`,
// `additionalProperties` maps — so the same renderer drives both.
export const fallbackSchema: JSONSchema = {
  $schema: "http://json-schema.org/draft-07/schema#",
  title: "Config",
  type: "object",
  additionalProperties: false,
  properties: {
    server: {$ref: "#/definitions/Server"},
    upstream: {$ref: "#/definitions/Upstream"},
    schema: {$ref: "#/definitions/RootSchema"},
    links: {
      type: "array",
      description: "External resources linked into the configuration.",
      items: {$ref: "#/definitions/Link"},
    },
    types: {
      type: "object",
      description: "The GraphQL types that make up the schema.",
      additionalProperties: {$ref: "#/definitions/Type"},
    },
    unions: {type: "object", description: "GraphQL union types.", additionalProperties: {$ref: "#/definitions/Union"}},
    enums: {type: "object", description: "GraphQL enum types.", additionalProperties: {$ref: "#/definitions/Enum"}},
  },
  definitions: {
    Server: {
      type: "object",
      description: "Runtime server settings, emitted as @server.",
      additionalProperties: false,
      properties: {
        port: {type: "integer", description: "Port the server listens on. Defaults to 8000."},
        hostname: {type: "string", description: "Host address the server binds to."},
        queryValidation: {type: "boolean", description: "Validate incoming queries against the schema."},
        batchRequests: {type: "boolean", description: "Combine multiple requests into a batch."},
      },
    },
    Upstream: {
      type: "object",
      description: "Upstream connection settings, emitted as @upstream.",
      additionalProperties: false,
      properties: {
        baseURL: {type: "string", description: "Base URL prefixed to every upstream request."},
        httpCache: {type: "integer", description: "Number of responses to keep in the HTTP cache."},
        allowedHeaders: {type: "array", description: "Headers forwarded to the upstream.", items: {type: "string"}},
        batch: {$ref: "#/definitions/Batch"},
      },
    },
    Batch: {
      type: "object",
      additionalProperties: false,
      properties: {
        delay: {type: "integer", description: "Delay in milliseconds before a batch is dispatched."},
        maxSize: {type: "integer", description: "Maximum number of requests in a single batch."},
      },
    },
    RootSchema: {
      type: "object",
      description: "The root operation types of the schema.",
      additionalProperties: false,
      properties: {
        query: {type: "string", description: "Name of the Query type."},
        mutation: {type: "string", description: "Name of the Mutation type."},
        subscription: {type: "string", description: "Name of the Subscription type."},
      },
    },
    Link: {
      type: "object",
      description: "A linked external resource.",
      additionalProperties: false,
      required: ["src"],
      properties: {
        id: {type: "string", description: "Unique identifier for the link."},
        src: {type: "string", description: "Path or URL of the linked resource."},
        type: {
          type: "string",
          description: "The kind of resource being linked.",
          enum: ["Config", "Protobuf", "Script", "Cert", "Key", "Operation", "Htpasswd", "Jwks", "Grpc"],
        },
      },
    },
    Type: {
      type: "object",
      description: "A GraphQL object type.",
      additionalProperties: false,
      properties: {
        fields: {
          type: "object",
          description: "The fields of the type.",
          additionalProperties: {$ref: "#/definitions/Field"},
        },
        doc: {type: "string", description: "Documentation rendered above the type."},
      },
    },
    Field: {
      type: "object",
      description: "A single field on a type.",
      additionalProperties: false,
      required: ["type"],
      properties: {
        type: {type: "string", description: "GraphQL type of the field, e.g. String, Int, [Post], User."},
        required: {type: "boolean", description: "Whether the field is non-nullable."},
        http: {$ref: "#/definitions/Http"},
        const: {$ref: "#/definitions/Const"},
      },
    },
    Http: {
      type: "object",
      description: "Resolve a field from an HTTP endpoint, emitted as @http.",
      additionalProperties: false,
      required: ["url"],
      properties: {
        url: {type: "string", description: "The URL of the endpoint."},
        method: {
          type: "string",
          description: "HTTP method used for the request.",
          enum: ["GET", "POST", "PUT", "PATCH", "DELETE", "HEAD", "OPTIONS"],
        },
        body: {type: "string", description: "Request body, with Mustache template support."},
      },
    },
    Const: {
      type: "object",
      description: "Resolve a field from a constant value, emitted as @const.",
      additionalProperties: false,
      properties: {
        data: {type: "string", description: "The constant value to return."},
      },
    },
    Union: {
      type: "object",
      description: "A GraphQL union type.",
      additionalProperties: false,
      required: ["types"],
      properties: {
        types: {type: "array", description: "The member types of the union.", items: {type: "string"}},
      },
    },
    Enum: {
      type: "object",
      description: "A GraphQL enum type.",
      additionalProperties: false,
      required: ["variants"],
      properties: {
        variants: {type: "array", description: "The variants of the enum.", items: {type: "string"}},
      },
    },
  },
}
