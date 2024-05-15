"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[4444],{6600:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>c,contentTitle:()=>r,default:()=>h,frontMatter:()=>a,metadata:()=>o,toc:()=>l});var s=t(5893),i=t(1151);const a={title:"Integration Testing",description:"Discover Tailcall's innovative markdown-based snapshot testing framework, designed to enhance testing across various programming languages seamlessly. This framework focuses on simplicity and maintainability, utilizing Markdown to make test cases easy to write and understand. Tailored for users of Tailcall, the framework supports extensive testing of GraphQL backends without language constraints. Features include detailed instructions on running and filtering tests, a structured test syntax guide, and comprehensive sections on test processes and snapshot maintenance. Ideal for developers seeking a straightforward, language-agnostic testing solution. Learn more about implementing and maintaining effective tests with Tailcall's unique approach.",sidebar_position:4},r=void 0,o={id:"integration-testing",title:"Integration Testing",description:"Discover Tailcall's innovative markdown-based snapshot testing framework, designed to enhance testing across various programming languages seamlessly. This framework focuses on simplicity and maintainability, utilizing Markdown to make test cases easy to write and understand. Tailored for users of Tailcall, the framework supports extensive testing of GraphQL backends without language constraints. Features include detailed instructions on running and filtering tests, a structured test syntax guide, and comprehensive sections on test processes and snapshot maintenance. Ideal for developers seeking a straightforward, language-agnostic testing solution. Learn more about implementing and maintaining effective tests with Tailcall's unique approach.",source:"@site/developers/integration-testing.md",sourceDirName:".",slug:"/integration-testing",permalink:"/developers/integration-testing",draft:!1,unlisted:!1,tags:[],version:"current",sidebarPosition:4,frontMatter:{title:"Integration Testing",description:"Discover Tailcall's innovative markdown-based snapshot testing framework, designed to enhance testing across various programming languages seamlessly. This framework focuses on simplicity and maintainability, utilizing Markdown to make test cases easy to write and understand. Tailored for users of Tailcall, the framework supports extensive testing of GraphQL backends without language constraints. Features include detailed instructions on running and filtering tests, a structured test syntax guide, and comprehensive sections on test processes and snapshot maintenance. Ideal for developers seeking a straightforward, language-agnostic testing solution. Learn more about implementing and maintaining effective tests with Tailcall's unique approach.",sidebar_position:4},sidebar:"tutorialSidebar",previous:{title:"Unit Testing",permalink:"/developers/testing"},next:{title:"Telemetry",permalink:"/developers/telemetry"}},c={},l=[{value:"How does it work?",id:"how-does-it-work",level:2},{value:"Run all tests",id:"run-all-tests",level:3},{value:"Run a single test",id:"run-a-single-test",level:3},{value:"Skipping a test",id:"skipping-a-test",level:3},{value:"Folder Structure",id:"folder-structure",level:2},{value:"File Structure",id:"file-structure",level:2},{value:"Heading",id:"heading",level:3},{value:"Config",id:"config",level:3},{value:"Test",id:"test",level:3},{value:"Mock",id:"mock",level:3},{value:"Env",id:"env",level:3},{value:"File",id:"file",level:3},{value:"Snapshots",id:"snapshots",level:2}];function d(e){const n={a:"a",admonition:"admonition",code:"code",em:"em",h2:"h2",h3:"h3",li:"li",ol:"ol",p:"p",pre:"pre",ul:"ul",...(0,i.a)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(n.p,{children:"As you may be aware, Tailcall offers a method for writing a configuration to generate a GraphQL backend. Additionally, you can link multiple configurations to compose them together. Extending the behavior of Tailcall is also possible by integrating custom JavaScript scripts. Managing this involves handling multiple files in various formats, which complicates the experience of writing integration tests."}),"\n",(0,s.jsx)(n.p,{children:"To maintain control, we have opted to utilize markdown files, allowing us to consolidate various types of configurations and scripts into a single document."}),"\n",(0,s.jsx)(n.p,{children:"Here is an example of how the test looks:"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-md",metastring:"showLineNumbers",children:'---\nidentity: true\n---\n\n\x3c!-- Test Configuration --\x3e\n\n```graphql @config\nschema\n  @upstream(\n    baseURL: "http://jsonplaceholder.typicode.com"\n  ) {\n  query: Query\n}\n\ntype Query {\n  post: Post @http(path: "/post")\n}\n\ntype Post {\n  id: Int\n  title: String\n  body: String\n}\n```\n'})}),"\n",(0,s.jsx)(n.admonition,{type:"tip",children:(0,s.jsxs)(n.p,{children:["Try to play around with the ",(0,s.jsx)(n.code,{children:"cargo test"})," command by modifying the tests written in the ",(0,s.jsx)(n.a,{href:"https://github.com/tailcallhq/tailcall/tree/main/tests/execution",children:"tests/execution"})," folder."]})}),"\n",(0,s.jsx)(n.h2,{id:"how-does-it-work",children:"How does it work?"}),"\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.a,{href:"https://github.com/tailcallhq/tailcall/blob/main/tests/execution_spec.rs",children:"Execution Spec"})," implements a custom markdown-based testing framework for Tailcall. The framework is designed to help write integration tests for Tailcall configs."]}),"\n",(0,s.jsx)(n.h3,{id:"run-all-tests",children:"Run all tests"}),"\n",(0,s.jsx)(n.p,{children:"The integration tests are executed as usual integration test so you can use test options and filters like with usual test."}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-sh",children:"cargo test\n"})}),"\n",(0,s.jsx)(n.p,{children:"To run integration tests skipping other tests run following command:"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-sh",children:"cargo test --test execution_spec\n"})}),"\n",(0,s.jsx)(n.p,{children:"After running you will get an output of all executed integration tests."}),"\n",(0,s.jsx)(n.h3,{id:"run-a-single-test",children:"Run a single test"}),"\n",(0,s.jsxs)(n.p,{children:["Similar to ",(0,s.jsx)(n.a,{href:"/developers/testing#filtering-running-tests",children:"filtering unit tests"})," to execute a single markdown configuration you can pass it's name to the test command:"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-sh",children:"cargo test --test execution_spec grpc\n   Compiling tailcall-fixtures v0.1.0 (/Users/tushar/Documents/Projects/tailcall/tailcall-fixtures)\n   Compiling tailcall v0.1.0 (/Users/tushar/Documents/Projects/tailcall)\n    Finished `test` profile [unoptimized + debuginfo] target(s) in 15.96s\n     Running tests/execution_spec.rs (target/debug/deps/execution_spec-6779d7c5c29b9b0b)\n\nrunning 18 tests\ntest run_execution_spec::test-grpc-invalid-method-format.md ... ok\ntest run_execution_spec::test-grpc-invalid-proto-id.md      ... ok\ntest run_execution_spec::test-grpc-group-by.md              ... ok\ntest run_execution_spec::test-grpc-missing-fields.md        ... ok\ntest run_execution_spec::test-grpc-nested-optional.md       ... ok\ntest run_execution_spec::test-grpc-nested-data.md           ... ok\ntest run_execution_spec::test-grpc-proto-path.md            ... ok\ntest run_execution_spec::grpc-proto-with-same-package.md    ... ok\ntest run_execution_spec::grpc-reflection.md                 ... ok\ntest run_execution_spec::test-grpc-optional.md              ... ok\ntest run_execution_spec::test-grpc-service-method.md        ... ok\ntest run_execution_spec::test-grpc-service.md               ... ok\ntest run_execution_spec::grpc-error.md                      ... ok\ntest run_execution_spec::grpc-simple.md                     ... ok\ntest run_execution_spec::grpc-batch.md                      ... ok\ntest run_execution_spec::grpc-url-from-upstream.md          ... ok\ntest run_execution_spec::grpc-override-url-from-upstream.md ... ok\ntest run_execution_spec::test-grpc.md                       ... ok\n"})}),"\n",(0,s.jsxs)(n.p,{children:["In the above command all tests with the name ",(0,s.jsx)(n.code,{children:"grpc"})," will be executed."]}),"\n",(0,s.jsx)(n.h3,{id:"skipping-a-test",children:"Skipping a test"}),"\n",(0,s.jsxs)(n.p,{children:["Skipping the test is also possible by passing the ",(0,s.jsx)(n.code,{children:"--skip"})," parameter:"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-sh",children:"cargo test --test execution_spec -- --skip grpc\n"})}),"\n",(0,s.jsxs)(n.p,{children:["Sometimes, you might want to skip the test per permanently for everyone and the CI. You could achieve it by setting the ",(0,s.jsx)(n.code,{children:"skip"})," configuration in your markdown:"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-md",children:"---\nskip: true\n---\n\n\x3c!-- Rest of the configurations --\x3e\n"})}),"\n",(0,s.jsx)(n.h2,{id:"folder-structure",children:"Folder Structure"}),"\n",(0,s.jsxs)(n.p,{children:["All ",(0,s.jsx)(n.code,{children:"execution_spec"})," tests are located in ",(0,s.jsx)(n.a,{href:"https://github.com/tailcallhq/tailcall/tree/main/tests/execution",children:"tests/execution"}),". The results generated by these tests are stored as snapshots in ",(0,s.jsx)(n.a,{href:"https://github.com/tailcallhq/tailcall/tree/main/tests/execution",children:"tests/snapshots"}),". An ",(0,s.jsx)(n.code,{children:"execution_spec"})," test is always a markdown file with a ",(0,s.jsx)(n.code,{children:".md"})," extension."]}),"\n",(0,s.jsx)(n.h2,{id:"file-structure",children:"File Structure"}),"\n",(0,s.jsxs)(n.p,{children:["Each ",(0,s.jsx)(n.code,{children:".md"})," file runs in its own scope, so no two tests can interfere with each other. The file structure is as follows:"]}),"\n",(0,s.jsx)(n.h3,{id:"heading",children:"Heading"}),"\n",(0,s.jsx)(n.p,{children:"The heading of file is used to provide metadata about the test. It is a YAML front matter block that contains the following fields:"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.code,{children:"identity"})," - This instructs the runner to check if the configuration when parsed and then printed back, is the same as the original configuration. This is useful to check whenever a new feature is added in the configuration and the parsers + printer needs to be updated."]}),"\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.code,{children:"error"})," - This instructs the runner to expect a validation error while parsing the configuration. This is useful to test validation logic written while converting config to blueprint."]}),"\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.code,{children:"skip"})," - This is a special annotation that ensures that the test is skipped."]}),"\n"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-md",children:"---\nidentity: true\nerror: true\nskip: true\n---\n"})}),"\n",(0,s.jsx)(n.p,{children:"The rest of the file is the test's body consisting of code blocks and descriptions."}),"\n",(0,s.jsx)(n.h3,{id:"config",children:"Config"}),"\n",(0,s.jsxs)(n.p,{children:["Codeblocks can be enhanced with additional meta information for the test parser to make sense of the code. So for example a Tailcall configuration could be written in a code block with the ",(0,s.jsx)(n.code,{children:"graphql"})," language and a ",(0,s.jsx)(n.code,{children:"@config"})," meta information could be attached to it."]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-md",metastring:"showLineNumbers {1}",children:"```graphql @config\nschema {\n  query: Query\n}\n\ntype Query {\n  users: [User]\n  posts: [Post]\n}\n```\n"})}),"\n",(0,s.jsx)(n.p,{children:"For each config a few tests are automatically executed:"}),"\n",(0,s.jsxs)(n.ol,{children:["\n",(0,s.jsxs)(n.li,{children:["We check if the config written is valid. If it's not and unless ",(0,s.jsx)(n.code,{children:"error: true"})," is set in the front matter, the test will fail."]}),"\n",(0,s.jsx)(n.li,{children:"We check if the config when parsed and then printed back is the same as the original config. This is useful to check whenever a new feature is added in the configuration and the parsers + printer needs to be updated."}),"\n",(0,s.jsx)(n.li,{children:"We check if the config when merged with an empty configuration is the same as the original config. This is useful to check whenever a new feature is added in the configuration and the merger needs to be updated."}),"\n",(0,s.jsx)(n.li,{children:"We autogenerate the schema of the GraphQL server and snapshot it for later. This is useful to see what would the final GraphQL schema look like."}),"\n"]}),"\n",(0,s.jsx)(n.h3,{id:"test",children:"Test"}),"\n",(0,s.jsxs)(n.p,{children:["An ",(0,s.jsx)(n.code,{children:"@test"})," block specifies HTTP requests that the runner should perform in ",(0,s.jsx)(n.code,{children:"YAML"})," format. It solely contains requests. The response for each request is automatically generated and compared with the snapshot."]}),"\n",(0,s.jsx)(n.admonition,{type:"note",children:(0,s.jsxs)(n.p,{children:["There may be at most one ",(0,s.jsx)(n.code,{children:"@test"})," block in a test."]})}),"\n",(0,s.jsx)(n.p,{children:"Example:"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-md",metastring:"showLineNumbers {1}",children:"```yml @test\n- method: POST\n  url: http://localhost:8080/graphql\n  body:\n    query: query { user { name } }\n```\n"})}),"\n",(0,s.jsx)(n.h3,{id:"mock",children:"Mock"}),"\n",(0,s.jsx)(n.p,{children:"Mock provides a way to match requests and send back a predefined response. It is used to mock HTTP & gRPC requests in the test."}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-md",metastring:"showLineNumbers {1}",children:"```yml @mock\n- request:\n    # The method to match on (default: Any)\n    method: POST\n\n    # The URL to match on (default: Any)\n    url: http://jsonplaceholder.typicode.com/users/1\n\n  # Predefined response\n  response:\n    status: 200\n    body:\n      id: 1\n      name: foo\n\n  # Number of time we expect this request to be hit (default: 1)\n  expectedHits: 1\n\n  # Whether we should assert the number of hits (default: true)\n  assertHits: true\n```\n"})}),"\n",(0,s.jsx)(n.h3,{id:"env",children:"Env"}),"\n",(0,s.jsxs)(n.p,{children:["An ",(0,s.jsx)(n.code,{children:"@env"})," block specifies environment variables in ",(0,s.jsx)(n.code,{children:"YAML"})," that the runner should use in the app context. There may be at most one ",(0,s.jsx)(n.code,{children:"@env"})," block in a test."]}),"\n",(0,s.jsx)(n.p,{children:"Example:"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-md",metastring:"showLineNumbers {1}",children:"```yml @env\nTEST_ID: 1\n```\n"})}),"\n",(0,s.jsx)(n.h3,{id:"file",children:"File"}),"\n",(0,s.jsxs)(n.p,{children:["A ",(0,s.jsx)(n.code,{children:"@file"})," block creates a file in the spec's ",(0,s.jsx)(n.em,{children:"virtual file system"}),". The ",(0,s.jsxs)(n.a,{href:"#config",children:[(0,s.jsx)(n.code,{children:"@config"})," "]})," block will have exclusive access to files created in this way: the true filesystem is not available to it."]}),"\n",(0,s.jsxs)(n.p,{children:["Every ",(0,s.jsx)(n.code,{children:"@file"})," block has the filename declared in the header. The language of the code block is optional and does not matter."]}),"\n",(0,s.jsx)(n.p,{children:"Example:"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-md",metastring:"showLineNumbers {1,8}",children:'```js @file:worker.js\nfunction onRequest({request}) {\n  request.headers["x-test"] = "test"\n  return {request}\n}\n```\n\n```graphql @config\nschema @link(file: "worker.js") {\n  query: Query\n}\n```\n'})}),"\n",(0,s.jsxs)(n.p,{children:["In the above example we are able to link the ",(0,s.jsx)(n.code,{children:"worker.js"})," file to the schema and write an integration test where all the requests will be modified by the ",(0,s.jsx)(n.code,{children:"onRequest"})," function."]}),"\n",(0,s.jsx)(n.h2,{id:"snapshots",children:"Snapshots"}),"\n",(0,s.jsxs)(n.p,{children:["Tailcall uses the ",(0,s.jsx)(n.a,{href:"https://insta.rs",children:"Insta"})," snapshot engine. Snapshots are automatically generated with a ",(0,s.jsx)(n.code,{children:".new"})," suffix if there is no pre-existing snapshot, or if the compared data didn't match the existing snapshot."]}),"\n",(0,s.jsxs)(n.p,{children:["Instead of writing result cases in tests and updating them when behaviour changes, a snapshot-based testing workflow relies on auto-generation. Whenever a ",(0,s.jsx)(n.code,{children:".new"})," snapshot is generated, it means one of the following:"]}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"Your code made an unexpected breaking change, and you need to fix it."}),"\n",(0,s.jsx)(n.li,{children:"Your code made an expected breaking change, and you need to accept the new snapshot."}),"\n"]}),"\n",(0,s.jsx)(n.p,{children:"You need to determine which one is the case, and take action accordingly."}),"\n",(0,s.jsxs)(n.p,{children:["Usage of ",(0,s.jsx)(n.a,{href:"https://insta.rs/docs/cli/",children:"cargo-insta"})," is recommended:"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-sh",children:"cargo insta test --review\n"})}),"\n",(0,s.jsxs)(n.p,{children:["This will regenerate all snapshots without interrupting the test every time there's a diff, and it will also open the snapshot review interface, so that you can accept or reject ",(0,s.jsx)(n.code,{children:".new"})," snapshots."]}),"\n",(0,s.jsx)(n.p,{children:"To clean unused snapshots, run:"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-sh",children:"cargo insta test --delete-unreferenced-snapshots\n"})})]})}function h(e={}){const{wrapper:n}={...(0,i.a)(),...e.components};return n?(0,s.jsx)(n,{...e,children:(0,s.jsx)(d,{...e})}):d(e)}},1151:(e,n,t)=>{t.d(n,{Z:()=>o,a:()=>r});var s=t(7294);const i={},a=s.createContext(i);function r(e){const n=s.useContext(a);return s.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function o(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:r(e.components),s.createElement(a.Provider,{value:n},e.children)}}}]);