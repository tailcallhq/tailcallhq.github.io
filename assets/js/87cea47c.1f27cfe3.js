"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[6265],{7509:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>a,contentTitle:()=>r,default:()=>d,frontMatter:()=>s,metadata:()=>c,toc:()=>l});var i=t(4848),o=t(8453);const s={title:"Optimizing GraphQL Client Performance",description:"Learn how to tune your client for optimal performance. Our guide provides essential tips and techniques to enhance responsiveness and efficiency in your applications. Start optimizing your client today for a faster, smoother user experience.",slug:"graphql-client-performance-tuning",sidebar_label:"Client Performance"},r=void 0,c={id:"client-tuning",title:"Optimizing GraphQL Client Performance",description:"Learn how to tune your client for optimal performance. Our guide provides essential tips and techniques to enhance responsiveness and efficiency in your applications. Start optimizing your client today for a faster, smoother user experience.",source:"@site/docs/client-tuning.md",sourceDirName:".",slug:"/graphql-client-performance-tuning",permalink:"/docs/graphql-client-performance-tuning",draft:!1,unlisted:!1,editUrl:"https://github.com/tailcallhq/tailcallhq.github.io/tree/develop/docs/client-tuning.md",tags:[],version:"current",frontMatter:{title:"Optimizing GraphQL Client Performance",description:"Learn how to tune your client for optimal performance. Our guide provides essential tips and techniques to enhance responsiveness and efficiency in your applications. Start optimizing your client today for a faster, smoother user experience.",slug:"graphql-client-performance-tuning",sidebar_label:"Client Performance"},sidebar:"tutorialSidebar",previous:{title:"Authentication",permalink:"/docs/field-level-access-control-graphql-authentication"},next:{title:"Config Format",permalink:"/docs/tailcall-graphql-configuration-format-conversion"}},a={},l=[{value:"HTTP (Hypertext Transfer Protocol)",id:"http-hypertext-transfer-protocol",level:3},{value:"HTTP Versions: 1.x, 2, and 3",id:"http-versions-1x-2-and-3",level:3},{value:"TCP (Transmission Control Protocol)",id:"tcp-transmission-control-protocol",level:3},{value:"QUIC (Quick UDP Internet Connections)",id:"quic-quick-udp-internet-connections",level:3},{value:"Why Managing Connections is Important?",id:"why-managing-connections-is-important",level:3},{value:"Tuning HTTP Client",id:"tuning-http-client",level:2},{value:"poolMaxIdlePerHost",id:"poolmaxidleperhost",level:3},{value:"tcpKeepAlive",id:"tcpkeepalive",level:3},{value:"connectTimeout",id:"connecttimeout",level:3}];function h(e){const n={a:"a",admonition:"admonition",code:"code",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,o.R)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(n.h3,{id:"http-hypertext-transfer-protocol",children:"HTTP (Hypertext Transfer Protocol)"}),"\n",(0,i.jsx)(n.p,{children:"HTTP, the most widely used protocol for communication between clients and servers, carries your request to the server and then brings back the data to your client. TCP forms the foundation of HTTP."}),"\n",(0,i.jsx)(n.h3,{id:"http-versions-1x-2-and-3",children:"HTTP Versions: 1.x, 2, and 3"}),"\n",(0,i.jsx)(n.p,{children:"Each version has enhanced HTTP's flexibility and performance."}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:"HTTP/1.x"}),": Creates a separate TCP connection for each HTTP request (or reuses one sequentially)."]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:"HTTP/2"}),":\nIntroduces multiplexing to allow concurrent sending of requests and responses over a single TCP connection, enhancing performance."]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:"HTTP/3"}),":\nEmploys QUIC instead of TCP, further reducing connection setup time and improving packet loss and network change handling."]}),"\n"]}),"\n",(0,i.jsx)(n.admonition,{type:"note",children:(0,i.jsx)(n.p,{children:"The server determines the HTTP version. Thus, if the server supports HTTP/1, the client cannot make an HTTP/2 request, even if compatible. If the client supports HTTP/1, the server should, according to the specification, downgrade to serve the request over HTTP/1."})}),"\n",(0,i.jsx)(n.h3,{id:"tcp-transmission-control-protocol",children:"TCP (Transmission Control Protocol)"}),"\n",(0,i.jsx)(n.p,{children:"TCP ensures the data sent and received over the internet reaches its destination and in order."}),"\n",(0,i.jsxs)(n.p,{children:["TCP, like dialing a number before talking on the phone, establishes a connection between the client and server before exchanging data using HTTP. This guide will show how to tune Tailcall's HTTP client to enhance this connection's performance. Learn more about TCP in detail ",(0,i.jsx)(n.a,{href:"https://www.techtarget.com/searchnetworking/definition/TCP",children:"here"}),"."]}),"\n",(0,i.jsx)(n.h3,{id:"quic-quick-udp-internet-connections",children:"QUIC (Quick UDP Internet Connections)"}),"\n",(0,i.jsxs)(n.p,{children:["Developed by Google, QUIC aims to make web communications faster and more efficient than TCP. It reduces connection establishment time, handles packet loss better, and supports multiplexed streams over a single connection, preventing a slow request from holding up others. HTTP/3 uses QUIC.\nLearn more about QUIC in detail ",(0,i.jsx)(n.a,{href:"https://blog.cloudflare.com/the-road-to-quic",children:"here"}),"."]}),"\n",(0,i.jsx)(n.h3,{id:"why-managing-connections-is-important",children:"Why Managing Connections is Important?"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.strong,{children:"Performance Overhead"}),":\nEstablishing TCP connections with HTTP/1.x consumes time due to the complete TCP handshake for each new connection. This process adds latency and increases system resources."]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.strong,{children:"Limited Ports on Client Side"}),":\nA unique combination of an IP address and a port number is necessary for each TCP connection from a client. With each new connection, the IP remains the same because the client is the same, but a new port gets used. The number of available ports on a machine is 65535. These ports get shared among all processes, and not all are available for use. Excessive creation of new connections can lead to port exhaustion on the client side, preventing new connections and causing system failures across running processes."]}),"\n",(0,i.jsx)(n.admonition,{type:"tip",children:(0,i.jsxs)(n.p,{children:["Use ",(0,i.jsx)(n.code,{children:"lsof"})," and ",(0,i.jsx)(n.code,{children:"netstat"})," commands to check the ports to process mapping."]})}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(n.p,{children:"Connection pooling mitigates these issues by reusing existing connections for requests, reducing connection establishment frequency (and thus handshake overhead) and conserving client-side ports. This approach enhances application performance by minimizing the resources and time spent on managing connections."}),"\n",(0,i.jsx)(n.h2,{id:"tuning-http-client",children:"Tuning HTTP Client"}),"\n",(0,i.jsxs)(n.p,{children:["Tailcall uses connection pooling by default and sets up with default tuning suitable for most use cases. You might need to further tune the HTTP client to improve your application's performance. Tailcall DSL provides a directive named ",(0,i.jsx)(n.a,{href:"/docs/tailcall-dsl-graphql-custom-directives#upstream-directive",children:(0,i.jsx)(n.code,{children:"@upstream"})})," for this purpose."]}),"\n",(0,i.jsx)(n.admonition,{type:"note",children:(0,i.jsx)(n.p,{children:"Connection pooling optimizes HTTP/1. Since HTTP/2 and HTTP/3 support multiplexing, pooling enabled does not noticeably affect performance."})}),"\n",(0,i.jsx)(n.p,{children:"When using HTTP/1.x, tune the connection pool with the following parameters:"}),"\n",(0,i.jsx)(n.h3,{id:"poolmaxidleperhost",children:"poolMaxIdlePerHost"}),"\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.code,{children:"poolMaxIdlePerHost"})," specifies the allowed number of idle connections per host, defaulting to ",(0,i.jsx)(n.code,{children:"60"}),". Example:"]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-graphql",metastring:"showLineNumbers",children:"schema\n  @upstream(\n    # highlight-start\n    poolMaxIdlePerHost: 60\n    # highlight-end\n  ) {\n  query: Query\n}\n"})}),"\n",(0,i.jsxs)(n.p,{children:["Too idle connections can unnecessarily consume memory and ports, while too few might cause delays as new connections need frequent establishment. ",(0,i.jsx)(n.code,{children:"poolMaxIdlePerHost"})," ensures judicious use of network and memory resources, avoiding wastage on seldom-used connections."]}),"\n",(0,i.jsx)(n.p,{children:"For applications connecting to hosts, set this value lower to keep connections available for other hosts. Conversely, if you have hosts and all requests must resolve through them, maintain a higher value for this setting."}),"\n",(0,i.jsx)(n.h3,{id:"tcpkeepalive",children:"tcpKeepAlive"}),"\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.code,{children:"tcpKeepAlive"})," keeps TCP connections alive for a duration, during inactivity, by periodically sending packets to the server to check if the connection remains open. In connection pooling, ",(0,i.jsx)(n.code,{children:"tcpKeepAlive"})," maintains reusable connections in a ready-to-use state. This setting is useful for long-lived connections, preventing -lived connections, preventing the client from using a connection the server has closed due to inactivity. Without ",(0,i.jsx)(n.code,{children:"tcpKeepAlive"}),", connections in the pool might get dropped by the server or intermediate network devices (like firewalls or load balancers). When your client tries to use such a dropped connection, it would fail, causing delays and errors. Keeping connections alive and monitored means you can efficiently reuse them, reducing the overhead of establishing new connections frequently."]}),"\n",(0,i.jsxs)(n.p,{children:["Tailcall provides a parameter named ",(0,i.jsx)(n.code,{children:"tcpKeepAlive"})," for the upstream which defaults to 5 seconds. Example:\nschema"]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-graphql",children:"@upstream (\n# highlight-start\n  tcpKeepAlive: 300\n# highlight-end\n) {\nquery: Query\n}\n\n"})}),"\n",(0,i.jsx)(n.h3,{id:"connecttimeout",children:"connectTimeout"}),"\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.code,{children:"connectTimeout"})," specifically applies to the phase where your client attempts to establish a connection with the server. When making a connection request, the client tries to resolve the DNS, complete the SSL handshake, and establish a TCP connection. In environments where pods are frequently created and destroyed, maintaining a low ",(0,i.jsx)(n.code,{children:"connectTimeout"})," is crucial to avoid unnecessary delays. In systems using connection pooling, the system aborts the attempt if it cannot establish a connection within the ",(0,i.jsx)(n.code,{children:"connectTimeout"})," period. This approach prevents indefinite waiting for a connection to establish, which could cause delays and timeouts."]}),"\n",(0,i.jsxs)(n.p,{children:["Tailcall offers a ",(0,i.jsx)(n.code,{children:"connectTimeout"})," parameter to set the connection timeout in seconds for the HTTP client, defaulting to 60 seconds. Example:"]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-graphql",metastring:"showLineNumbers",children:"schema\n  @upstream(\n    # highlight-start\n    connectTimeout: 10\n    # highlight-end\n  ) {\n  query: Query\n}\n"})}),"\n",(0,i.jsx)(n.p,{children:"In summary, maximizing HTTP client performance requires understanding the underlying protocols and configuring client settings through testing. This ensures efficient, robust, and high-performing client-server communication, crucial for the smooth operation of modern web applications."})]})}function d(e={}){const{wrapper:n}={...(0,o.R)(),...e.components};return n?(0,i.jsx)(n,{...e,children:(0,i.jsx)(h,{...e})}):h(e)}}}]);