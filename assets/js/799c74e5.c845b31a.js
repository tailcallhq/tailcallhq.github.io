"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[9924],{6392:(e,r,t)=>{t.r(r),t.d(r,{assets:()=>l,contentTitle:()=>o,default:()=>d,frontMatter:()=>i,metadata:()=>a,toc:()=>c});var s=t(4848),n=t(8453);const i={title:"Macro Benchmarks",description:"Learn how to benchmark a Tailcall server using `wrk` with this comprehensive guide. Discover the steps for building your project in release mode, starting the server with controlled log output, and using `wrk` with a custom Lua script for precise benchmarking. This tutorial also covers how to verify server responsiveness with `curl` and how to interpret benchmark results to assess server performance under load. Perfect for developers looking to optimize their Rust applications."},o=void 0,a={id:"contributors/wrk-benchmark",title:"Macro Benchmarks",description:"Learn how to benchmark a Tailcall server using `wrk` with this comprehensive guide. Discover the steps for building your project in release mode, starting the server with controlled log output, and using `wrk` with a custom Lua script for precise benchmarking. This tutorial also covers how to verify server responsiveness with `curl` and how to interpret benchmark results to assess server performance under load. Perfect for developers looking to optimize their Rust applications.",source:"@site/docs/contributors/wrk-benchmark.md",sourceDirName:"contributors",slug:"/contributors/wrk-benchmark",permalink:"/docs/contributors/wrk-benchmark",draft:!1,unlisted:!1,editUrl:"https://github.com/tailcallhq/tailcallhq.github.io/tree/develop/docs/contributors/wrk-benchmark.md",tags:[],version:"current",lastUpdatedAt:1719818949e3,frontMatter:{title:"Macro Benchmarks",description:"Learn how to benchmark a Tailcall server using `wrk` with this comprehensive guide. Discover the steps for building your project in release mode, starting the server with controlled log output, and using `wrk` with a custom Lua script for precise benchmarking. This tutorial also covers how to verify server responsiveness with `curl` and how to interpret benchmark results to assess server performance under load. Perfect for developers looking to optimize their Rust applications."},sidebar:"docs",previous:{title:"Micro Benchmarks",permalink:"/docs/contributors/micro-benchmark"}},l={},c=[{value:"Prerequisites",id:"prerequisites",level:2},{value:"Step 1: Build Tailcall",id:"step-1-build-tailcall",level:2},{value:"Step 2: Start the Server",id:"step-2-start-the-server",level:2},{value:"Step 3: Verify Server is Running",id:"step-3-verify-server-is-running",level:2},{value:"Step 4: Customize WRK Setup with Lua Script",id:"step-4-customize-wrk-setup-with-lua-script",level:2},{value:"Step 5: Run the Benchmark",id:"step-5-run-the-benchmark",level:2},{value:"Step 6: Interpreting Results",id:"step-6-interpreting-results",level:2}];function h(e){const r={a:"a",code:"code",h2:"h2",li:"li",p:"p",pre:"pre",ul:"ul",...(0,n.R)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsxs)(r.p,{children:["This document outlines the steps to benchmark a Tailcall server using ",(0,s.jsx)(r.code,{children:"wrk"}),", a modern HTTP benchmarking tool. It covers building your Rust project in release mode, starting the server, and performing the benchmark."]}),"\n",(0,s.jsx)(r.h2,{id:"prerequisites",children:"Prerequisites"}),"\n",(0,s.jsxs)(r.ul,{children:["\n",(0,s.jsxs)(r.li,{children:["Rust and Cargo (",(0,s.jsx)(r.a,{href:"https://rustup.rs/",children:"https://rustup.rs/"}),")"]}),"\n",(0,s.jsxs)(r.li,{children:[(0,s.jsx)(r.code,{children:"wrk"})," benchmarking tool (Installation instructions: ",(0,s.jsx)(r.a,{href:"https://github.com/wg/wrk",children:"https://github.com/wg/wrk"}),")"]}),"\n"]}),"\n",(0,s.jsx)(r.h2,{id:"step-1-build-tailcall",children:"Step 1: Build Tailcall"}),"\n",(0,s.jsx)(r.p,{children:"Ensure you are on the desired branch you want to benchmark, and then build Tailcall in release mode to optimize performance:"}),"\n",(0,s.jsx)(r.pre,{children:(0,s.jsx)(r.code,{className:"language-bash",children:"cargo build --release\n"})}),"\n",(0,s.jsx)(r.h2,{id:"step-2-start-the-server",children:"Step 2: Start the Server"}),"\n",(0,s.jsx)(r.p,{children:"Start the Tailcall server by setting the appropriate environment variable to control log output and using the release binary:"}),"\n",(0,s.jsx)(r.pre,{children:(0,s.jsx)(r.code,{className:"language-bash",children:"export TC_LOG_LEVEL=error\ncargo run --release -- start ./jsonplaceholder.graphql\n"})}),"\n",(0,s.jsxs)(r.p,{children:["This command sets the log level to ",(0,s.jsx)(r.code,{children:"error"})," to minimize logging output, which can affect performance during benchmarks."]}),"\n",(0,s.jsx)(r.h2,{id:"step-3-verify-server-is-running",children:"Step 3: Verify Server is Running"}),"\n",(0,s.jsxs)(r.p,{children:["Before running ",(0,s.jsx)(r.code,{children:"wrk"}),", verify that the server is responsive. Use ",(0,s.jsx)(r.code,{children:"curl"})," to send a request:"]}),"\n",(0,s.jsx)(r.pre,{children:(0,s.jsx)(r.code,{className:"language-bash",children:'curl -X POST -H "Content-Type: application/json" \\\n  -d \'{"operationName":null,"variables":{},"query":"{posts{title}}"}\' \\\n  http://127.0.0.1:8000/graphql\n'})}),"\n",(0,s.jsx)(r.p,{children:"Repeat this a couple of times to ensure the server is handling requests correctly."}),"\n",(0,s.jsx)(r.h2,{id:"step-4-customize-wrk-setup-with-lua-script",children:"Step 4: Customize WRK Setup with Lua Script"}),"\n",(0,s.jsxs)(r.p,{children:["To customize the ",(0,s.jsx)(r.code,{children:"wrk"})," setup, create a Lua script named ",(0,s.jsx)(r.code,{children:"wrk_script.lua"})," and paste the following content:"]}),"\n",(0,s.jsx)(r.pre,{children:(0,s.jsx)(r.code,{className:"language-lua",children:'wrk.method = "POST"\nwrk.body = \'{"operationName":null,"variables":{},"query":"{posts{title}}"}\'\nwrk.headers["Connection"] = "keep-alive"\nwrk.headers["Content-Type"] = "application/json"\n'})}),"\n",(0,s.jsxs)(r.p,{children:["This script configures ",(0,s.jsx)(r.code,{children:"wrk"})," to send POST requests with a specific JSON body and headers."]}),"\n",(0,s.jsx)(r.h2,{id:"step-5-run-the-benchmark",children:"Step 5: Run the Benchmark"}),"\n",(0,s.jsxs)(r.p,{children:["Open another terminal window and execute ",(0,s.jsx)(r.code,{children:"wrk"})," to start the benchmark. Here is a basic example:"]}),"\n",(0,s.jsx)(r.pre,{children:(0,s.jsx)(r.code,{className:"language-bash",children:"wrk -t12 -c400 -d30s -s wrk_script.lua http://127.0.0.1:8000/graphql\n"})}),"\n",(0,s.jsx)(r.p,{children:"This command uses 12 threads and maintains 400 open HTTP connections over a duration of 30 seconds, targeting the server running on localhost port 8000."}),"\n",(0,s.jsx)(r.h2,{id:"step-6-interpreting-results",children:"Step 6: Interpreting Results"}),"\n",(0,s.jsxs)(r.p,{children:[(0,s.jsx)(r.code,{children:"wrk"})," will output statistics about the tests, which include:"]}),"\n",(0,s.jsxs)(r.ul,{children:["\n",(0,s.jsx)(r.li,{children:"Total number of requests completed"}),"\n",(0,s.jsx)(r.li,{children:"Throughput, measured in requests per second"}),"\n",(0,s.jsx)(r.li,{children:"Latency distribution"}),"\n"]}),"\n",(0,s.jsx)(r.p,{children:"These metrics help assess the performance capabilities and robustness of your server under high load conditions."})]})}function d(e={}){const{wrapper:r}={...(0,n.R)(),...e.components};return r?(0,s.jsx)(r,{...e,children:(0,s.jsx)(h,{...e})}):h(e)}}}]);