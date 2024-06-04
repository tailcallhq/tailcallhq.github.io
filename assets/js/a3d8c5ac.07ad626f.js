"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[8891],{5517:(e,n,i)=>{i.r(n),i.d(n,{assets:()=>a,contentTitle:()=>r,default:()=>h,frontMatter:()=>l,metadata:()=>o,toc:()=>c});var s=i(4848),t=i(8453);const l={title:"Using Watch Mode with Tailcall CLI",description:"Enable watch mode for your APIs with Tailcall. Follow our guides to set up and utilize watch mode for real-time monitoring.",slug:"graphql-watch-mode-tailcall",sidebar_label:"Watch Mode"},r=void 0,o={id:"watch-mode",title:"Using Watch Mode with Tailcall CLI",description:"Enable watch mode for your APIs with Tailcall. Follow our guides to set up and utilize watch mode for real-time monitoring.",source:"@site/docs/watch-mode.md",sourceDirName:".",slug:"/graphql-watch-mode-tailcall",permalink:"/docs/graphql-watch-mode-tailcall",draft:!1,unlisted:!1,editUrl:"https://github.com/tailcallhq/tailcallhq.github.io/tree/develop/docs/watch-mode.md",tags:[],version:"current",frontMatter:{title:"Using Watch Mode with Tailcall CLI",description:"Enable watch mode for your APIs with Tailcall. Follow our guides to set up and utilize watch mode for real-time monitoring.",slug:"graphql-watch-mode-tailcall",sidebar_label:"Watch Mode"},sidebar:"tutorialSidebar",previous:{title:"Telemetry Guide",permalink:"/docs/graphql-telemetry-guide"}},a={},c=[{value:"Use case",id:"use-case",level:2},{value:"Using <code>entr</code>",id:"using-entr",level:2},{value:"Installation",id:"installation",level:3},{value:"Homebrew",id:"homebrew",level:4},{value:"Windows Subsystem",id:"windows-subsystem",level:4},{value:"apt-get",id:"apt-get",level:4},{value:"Watch Mode",id:"watch-mode",level:3},{value:"Some Best Practices",id:"some-best-practices",level:2}];function d(e){const n={a:"a",code:"code",h2:"h2",h3:"h3",h4:"h4",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,t.R)(),...e.components},{Head:i}=n;return i||function(e,n){throw new Error("Expected "+(n?"component":"object")+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}("Head",!0),(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(i,{children:(0,s.jsx)("title",{children:"Run Your Server in Watch Mode with entr | Tailcall Docs"})}),"\n",(0,s.jsxs)(n.p,{children:["Developers often find themselves in situations where they need to run a server in watch mode to streamline the development process. This guide will introduce you to ",(0,s.jsx)(n.a,{href:"https://eradman.com/entrproject/",children:"entr"}),", a versatile file-watcher tool, and how to run your server in watch mode with it. We'll also touch on the installation process and suggest some best practices to optimize your workflow."]}),"\n",(0,s.jsx)(n.h2,{id:"use-case",children:"Use case"}),"\n",(0,s.jsx)(n.p,{children:"Running a server in watch mode offers a lot of key benefits:"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.code,{children:"Real-time Feedback"}),": Watch mode ensures that your server remains up-to-date with your code changes, instantly reflecting those changes and providing you with real-time feedback during development."]}),"\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.code,{children:"Efficiency"}),": Manually restarting the server each time you change code can be tedious and time-consuming. Watch mode automates this process, enhancing development efficiency."]}),"\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.code,{children:"Debugging"}),": It enables you to identify and resolve issues as they occur, reducing debugging time. With your server automatically restarting upon code changes, you detect errors earlier."]}),"\n"]}),"\n",(0,s.jsxs)(n.h2,{id:"using-entr",children:["Using ",(0,s.jsx)(n.code,{children:"entr"})]}),"\n",(0,s.jsx)(n.p,{children:"It's a powerful file-watching utility that makes running a server in watch mode a breeze. Let's go through the steps for the installation process for different operating system :"}),"\n",(0,s.jsx)(n.h3,{id:"installation",children:"Installation"}),"\n",(0,s.jsx)(n.h4,{id:"homebrew",children:"Homebrew"}),"\n",(0,s.jsxs)(n.ol,{children:["\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsx)(n.p,{children:'Open the Terminal, which you can find in the "Utilities" folder within the "Applications" folder.'}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsx)(n.p,{children:"Install Homebrew if you haven't already. Run the following command in your Terminal:"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-graphql",children:'/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install.sh)"\n'})}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsxs)(n.p,{children:["After installing Homebrew, proceed to install ",(0,s.jsx)(n.code,{children:"entr"})," by executing the following command:"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-graphql",children:"brew install entr\n"})}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsx)(n.p,{children:"To verify the installation, run:"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-graphql",children:"entr --version\n"})}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(n.p,{children:["Upon successful installation, it will display the latest version of ",(0,s.jsx)(n.code,{children:"entr"}),"."]}),"\n",(0,s.jsx)(n.h4,{id:"windows-subsystem",children:"Windows Subsystem"}),"\n",(0,s.jsxs)(n.ol,{children:["\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsx)(n.p,{children:"Install Windows Subsystem for Linux (WSL) on your Windows machine by following Microsoft's official documentation."}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsx)(n.p,{children:"After setting up WSL, open the Linux terminal by running:"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-graphql",children:"    wsl -d <DistributionName>\n"})}),"\n",(0,s.jsxs)(n.p,{children:["Replace ",(0,s.jsx)(n.code,{children:"<DistributionName>"})," with the name of the Linux distribution that you have installed."]}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsx)(n.p,{children:"Install entr within the Linux terminal using the package manager of your chosen Linux distribution. For example, on Ubuntu, you can use:"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-graphql",children:"sudo apt update\nsudo apt install entr\n"})}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsx)(n.p,{children:"Verify the installation by running:"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-graphql",children:"entr --version\n"})}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(n.p,{children:["A successful installation will display the latest version of ",(0,s.jsx)(n.code,{children:"entr"}),"."]}),"\n",(0,s.jsx)(n.h4,{id:"apt-get",children:"apt-get"}),"\n",(0,s.jsxs)(n.ol,{children:["\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsxs)(n.p,{children:["On Linux, you can install ",(0,s.jsx)(n.code,{children:"entr"})," using your distribution's package manager. For example, on Ubuntu, use:"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-graphql",children:"sudo apt update\nsudo apt install entr\n"})}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsx)(n.p,{children:"To verify the installation, run:"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-graphql",children:"entr --version\n"})}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(n.p,{children:["If you install it, it will show the latest version of the ",(0,s.jsx)(n.code,{children:"entr"})]}),"\n",(0,s.jsx)(n.h3,{id:"watch-mode",children:"Watch Mode"}),"\n",(0,s.jsxs)(n.p,{children:["To run your server in watch mode with ",(0,s.jsx)(n.code,{children:"entr"}),", use the ",(0,s.jsx)(n.code,{children:"ls"})," command to list the files you want to track. The general syntax is as follows:"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-graphql",children:"ls *.graphql | entr -r tailcall start ./jsonplaceholder.graphql\n"})}),"\n",(0,s.jsxs)(n.p,{children:["This command uses ",(0,s.jsx)(n.code,{children:"entr"})," to continuously track the ",(0,s.jsx)(n.code,{children:"jsonplaceholder.graphql"})," file and when it changes, It runs the ",(0,s.jsx)(n.code,{children:"tailcall start"})," command with the file as an argument"]}),"\n",(0,s.jsx)(n.p,{children:"Detailing the above command as follows:"}),"\n",(0,s.jsxs)(n.ol,{children:["\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.code,{children:"ls *.graphql"}),' : This part of the code lists the file or files you want to track for changes. In this case, it lists the file named "jsonplaceholder.graphql" within the "examples" directory.']}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.code,{children:"|"})," : The pipe symbol ('|') takes the output of the preceding command (the file listing) and feeds it as input to the following command (entr)."]}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.code,{children:"entr -r tc start ./jsonplaceholder.graphql"}),' : Whenever the file "jsonplaceholder.graphql" changes, this command executes.']}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.code,{children:"entr"})," is a command-line tool for running arbitrary commands whenever files change. It tracks the files specified in the previous command (",(0,s.jsx)(n.code,{children:"ls ./jsonplaceholder.graphql"}),")"]}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.code,{children:"r"})," : This flag instructs entr to persist in running the command through errors, ensuring continuous operation."]}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.code,{children:"tc start ./jsonplaceholder.graphql"})," : This command runs upon detecting changes, executing ",(0,s.jsx)(n.code,{children:"tc start"})," with the file path\n",(0,s.jsx)(n.code,{children:"./jsonplaceholder.graphql"})," as an argument"]}),"\n"]}),"\n"]}),"\n",(0,s.jsx)(n.h2,{id:"some-best-practices",children:"Some Best Practices"}),"\n",(0,s.jsxs)(n.p,{children:["To make the most of running a server in watch mode with ",(0,s.jsx)(n.code,{children:"entr"}),", consider the following best practices:"]}),"\n",(0,s.jsxs)(n.ol,{children:["\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.strong,{children:"Selective File Watching"}),": Be selective about which files you track with ",(0,s.jsx)(n.code,{children:"entr"}),". Watching unnecessary files can lead to increased CPU and memory usage. Focus on the essential files related to your project."]}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.strong,{children:"Organize Your Project"}),": Maintain a well-organized project structure to make it easier to identify which files need tracking."]}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.strong,{children:"Clear Output"}),": Clear the terminal output before running entr to have a clean workspace."]}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.strong,{children:"Version Control"}),": Ensure that your project is under version control (e.g., Git) to track changes and revert if necessary."]}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsxs)(n.p,{children:[(0,s.jsxs)(n.strong,{children:["Update ",(0,s.jsx)(n.code,{children:"entr"})]}),": Ensure ",(0,s.jsx)(n.code,{children:"entr"})," is always updated to the latest version for bug fixes and enhancements."]}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(n.p,{children:["By following these best practices and using ",(0,s.jsx)(n.code,{children:"entr"})," effectively, you can greatly improve your development workflow. Experiment with ",(0,s.jsx)(n.code,{children:"entr"}),", adapt it to your project's specific requirements, and enjoy a smoother and more efficient development process. Happy coding!"]})]})}function h(e={}){const{wrapper:n}={...(0,t.R)(),...e.components};return n?(0,s.jsx)(n,{...e,children:(0,s.jsx)(d,{...e})}):d(e)}}}]);