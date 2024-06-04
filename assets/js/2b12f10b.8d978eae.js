"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[8455],{8615:(e,n,s)=>{s.r(n),s.d(n,{assets:()=>a,contentTitle:()=>r,default:()=>h,frontMatter:()=>l,metadata:()=>o,toc:()=>c});var i=s(4848),t=s(8453);const l={title:"Tailcall Developer Community and Resources",sidebar_label:"Contribution Guidelines",description:"Join the Tailcall developer community! Access resources, tools, and guides to enhance your API development and integration projects.",slug:"/"},r=void 0,o={id:"guidelines",title:"Tailcall Developer Community and Resources",description:"Join the Tailcall developer community! Access resources, tools, and guides to enhance your API development and integration projects.",source:"@site/developers/guidelines.md",sourceDirName:".",slug:"/",permalink:"/developers/",draft:!1,unlisted:!1,tags:[],version:"current",frontMatter:{title:"Tailcall Developer Community and Resources",sidebar_label:"Contribution Guidelines",description:"Join the Tailcall developer community! Access resources, tools, and guides to enhance your API development and integration projects.",slug:"/"},sidebar:"tutorialSidebar",previous:{title:"Bounty Program",permalink:"/developers/bounty"},next:{title:"Integration Testing",permalink:"/developers/integration-testing"}},a={},c=[{value:"The Basics",id:"the-basics",level:2},{value:"Making and Discussing Changes",id:"making-and-discussing-changes",level:2},{value:"Pull Requests and Code Quality",id:"pull-requests-and-code-quality",level:2},{value:"Community Engagement",id:"community-engagement",level:2},{value:"Final Notes",id:"final-notes",level:2}];function d(e){const n={a:"a",code:"code",h2:"h2",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,t.R)(),...e.components},{Head:s}=n;return s||function(e,n){throw new Error("Expected "+(n?"component":"object")+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}("Head",!0),(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(s,{children:(0,i.jsx)("title",{children:"Tailcall For Developers | Contribution Guidelines"})}),"\n",(0,i.jsxs)(n.p,{children:["Welcome to the ",(0,i.jsx)(n.strong,{children:"Tailcall"})," project! If you haven't stared us yet, make sure you do by clicking ",(0,i.jsx)(n.a,{href:"https://github.com/tailcallhq/tailcall",children:"here"}),".\nThis document provides an overview of the best practices for contributing effectively. Follow these guidelines to ensure a smooth collaboration process."]}),"\n",(0,i.jsx)(n.h2,{id:"the-basics",children:"The Basics"}),"\n",(0,i.jsxs)(n.ol,{children:["\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.strong,{children:"Fork and Clone:"})," Fork the repository on GitHub and clone your fork locally."]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-bash",children:"git clone https://github.com/yourusername/tailcall.git\n"})}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.strong,{children:"Set Up Your Environment:"})}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:"Install Rust:"})," Use ",(0,i.jsx)(n.a,{href:"https://rustup.rs/",children:"rustup"})," to install Rust and the ",(0,i.jsx)(n.code,{children:"nightly"})," toolchain."]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:"Install Prettier:"})," Required for linting, install ",(0,i.jsx)(n.a,{href:"https://prettier.io/",children:"Prettier"}),"."]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:"Build the Application:"})," Navigate to the project directory and execute ",(0,i.jsx)(n.code,{children:"cargo build"}),"."]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:"Start the Server:"})," Run ",(0,i.jsx)(n.code,{children:"cargo run -- start ./examples/jsonplaceholder.graphql"})," to start the server and access the GraphiQL interface at ",(0,i.jsx)(n.a,{href:"https://tailcall.run/playground",children:"https://tailcall.run/playground"}),"."]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(n.h2,{id:"making-and-discussing-changes",children:"Making and Discussing Changes"}),"\n",(0,i.jsxs)(n.ol,{children:["\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.strong,{children:"Create a New Branch:"})," Always work on a new branch created from the latest main branch."]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-bash",children:"git checkout -b feature/your-feature-name\n"})}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.strong,{children:"Develop Incrementally:"})," Use small, ",(0,i.jsx)(n.a,{href:"https://benjamincongdon.me/blog/2022/07/17/In-Praise-of-Stacked-PRs/",children:"stacked PRs"})," for complex features. Break down large tasks into smaller, manageable pieces, each with its own PR. If you are working on a large bounty item add the bounty on your main PR and create stacked PRs wrt to your main PR."]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.strong,{children:"Discuss on Discord:"})," For real-time discussions, use the ",(0,i.jsx)(n.code,{children:"#contributors"})," channel on Discord. Create a thread for each PR to facilitate focused discussions."]}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(n.h2,{id:"pull-requests-and-code-quality",children:"Pull Requests and Code Quality"}),"\n",(0,i.jsxs)(n.ol,{children:["\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.strong,{children:"Keep PRs Small:"})," Focus each PR on a single topic to simplify review and potential reverts. Describe your changes clearly in the PR description, explaining the solution and linking to any relevant discussions or issues."]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.strong,{children:"Commit Clearly:"})," Write concise, descriptive commit messages. Each commit should represent a self-contained change."]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.strong,{children:"Submit PRs:"})," Push your branch to GitHub and open a PR against the main branch. In the PR description, detail the purpose of your changes and any additional context needed."]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.strong,{children:"Code Review:"})," Engage with reviewers on GitHub and address feedback promptly. Use discussions on Discord to resolve complex issues or debates efficiently."]}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(n.h2,{id:"community-engagement",children:"Community Engagement"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:"Star and Share:"})," Star the repository if you find it helpful and share your contributions on social media using ",(0,i.jsx)(n.code,{children:"#tailcall"})," and tagging ",(0,i.jsx)(n.a,{href:"https://twitter.com/tailcallhq",children:"@tailcallhq"}),"."]}),"\n"]}),"\n",(0,i.jsx)(n.h2,{id:"final-notes",children:"Final Notes"}),"\n",(0,i.jsx)(n.p,{children:"Tailcall thrives through your contributions. We aim to maintain a respectful and inclusive community. Thank you for helping to enhance Tailcall for everyone!"})]})}function h(e={}){const{wrapper:n}={...(0,t.R)(),...e.components};return n?(0,i.jsx)(n,{...e,children:(0,i.jsx)(d,{...e})}):d(e)}}}]);