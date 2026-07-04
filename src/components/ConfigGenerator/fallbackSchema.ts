import type {JSONSchema} from "./jsonSchema"

// A compact, offline snapshot of `.tailcallrc.schema.json`. The live schema is
// always fetched first; this is only used when the network request fails (for
// example while offline or in CI) so the generator stays usable. It mirrors the
// runtime configuration Tailcall's schema actually describes — server, upstream,
// telemetry and links — using the same draft-07 idioms schemars emits
// (`allOf` + `$ref`, nullable `type` arrays, `anyOf` with null, string enums).
export const fallbackSchema: JSONSchema = {
  $schema: "http://json-schema.org/draft-07/schema#",
  title: "Config",
  type: "object",
  properties: {
    server: {
      description: "Dictates how the server behaves and helps tune Tailcall for all ingress requests.",
      allOf: [{$ref: "#/definitions/Server"}],
    },
    upstream: {
      description: "Dictates how Tailcall should handle upstream requests and responses.",
      allOf: [{$ref: "#/definitions/Upstream"}],
    },
    telemetry: {
      description: "Enable OpenTelemetry support.",
      allOf: [{$ref: "#/definitions/Telemetry"}],
    },
    links: {
      description: "A list of all links in the schema.",
      type: "array",
      items: {$ref: "#/definitions/Link"},
    },
  },
  definitions: {
    Server: {
      type: "object",
      properties: {
        port: {type: ["integer", "null"], description: "The port Tailcall listens on. Defaults to 8000."},
        hostname: {type: ["string", "null"], description: "The host address the server binds to."},
        version: {
          description: "The HTTP version for the server.",
          anyOf: [{$ref: "#/definitions/HttpVersion"}, {type: "null"}],
        },
        workers: {type: ["integer", "null"], description: "The number of worker threads the server spawns."},
        queryValidation: {type: ["boolean", "null"], description: "Validate incoming queries against the schema."},
        introspection: {type: ["boolean", "null"], description: "Allow GraphQL introspection queries."},
        globalResponseTimeout: {type: ["integer", "null"], description: "Max time, in milliseconds, for a request."},
      },
    },
    Upstream: {
      type: "object",
      properties: {
        httpCache: {type: ["integer", "null"], description: "Number of responses to keep in the HTTP cache."},
        timeout: {type: ["integer", "null"], description: "Max time, in seconds, to wait for an upstream response."},
        connectTimeout: {type: ["integer", "null"], description: "Max time, in seconds, to establish a connection."},
        http2Only: {type: ["boolean", "null"], description: "Use HTTP/2 for all upstream requests."},
        allowedHeaders: {
          type: ["array", "null"],
          description: "Headers forwarded to the upstream.",
          items: {type: "string"},
        },
        batch: {
          description: "Group upstream requests into batches.",
          anyOf: [{$ref: "#/definitions/Batch"}, {type: "null"}],
        },
        userAgent: {type: ["string", "null"], description: "The User-Agent header sent to the upstream."},
      },
    },
    Batch: {
      type: "object",
      properties: {
        maxSize: {type: ["integer", "null"], description: "Maximum number of requests in a single batch."},
        delay: {type: ["integer", "null"], description: "Delay in milliseconds before a batch is dispatched."},
      },
    },
    Telemetry: {
      type: "object",
      properties: {
        requestHeaders: {
          type: ["array", "null"],
          description: "Request headers to record on each span.",
          items: {type: "string"},
        },
      },
    },
    Link: {
      type: "object",
      required: ["src", "type"],
      properties: {
        id: {type: ["string", "null"], description: "An id to refer to the link."},
        src: {type: "string", description: "The path or URL of the linked resource."},
        type: {description: "The type of the linked resource.", allOf: [{$ref: "#/definitions/LinkType"}]},
      },
    },
    HttpVersion: {type: "string", enum: ["HTTP1", "HTTP2"]},
    LinkType: {
      type: "string",
      enum: ["Config", "Protobuf", "Script", "Cert", "Key", "Operation", "Htpasswd", "Jwks", "Grpc"],
    },
  },
}
