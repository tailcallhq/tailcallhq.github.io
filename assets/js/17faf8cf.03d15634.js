"use strict";(self.webpackChunktailcall_run=self.webpackChunktailcall_run||[]).push([[364],{5733:(e,a,t)=>{t.r(a),t.d(a,{assets:()=>s,contentTitle:()=>r,default:()=>u,frontMatter:()=>i,metadata:()=>o,toc:()=>p});var l=t(7462),n=(t(7294),t(3905));t(614),t(2578);const i={title:"Installation & Updates",sidebar_position:2},r=void 0,o={unversionedId:"guides/installation",id:"guides/installation",title:"Installation & Updates",description:"To run Tailcall, you need to have Java 20 or above installed on your machine.",source:"@site/docs/guides/installation.mdx",sourceDirName:"guides",slug:"/guides/installation",permalink:"/docs/guides/installation",draft:!1,editUrl:"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/docs/guides/installation.mdx",tags:[],version:"current",sidebarPosition:2,frontMatter:{title:"Installation & Updates",sidebar_position:2},sidebar:"tutorialSidebar",previous:{title:"Tackling N + 1",permalink:"/docs/guides/n+1"}},s={},p=[{value:"Homebrew",id:"homebrew",level:2},{value:"Curl",id:"curl",level:2}],c={toc:p},d="wrapper";function u(e){let{components:a,...t}=e;return(0,n.kt)(d,(0,l.Z)({},c,t,{components:a,mdxType:"MDXLayout"}),(0,n.kt)("p",null,"To run Tailcall, you need to have Java 20 or above installed on your machine."),(0,n.kt)("h2",{id:"homebrew"},"Homebrew"),(0,n.kt)("ol",null,(0,n.kt)("li",{parentName:"ol"},(0,n.kt)("p",{parentName:"li"},"If you don't already have Homebrew installed, you can find the instructions ",(0,n.kt)("a",{parentName:"p",href:"https://brew.sh/"},"here"),".")),(0,n.kt)("li",{parentName:"ol"},(0,n.kt)("p",{parentName:"li"},"Add the Tailcall repository to Homebrew by running the following command in your terminal:"),(0,n.kt)("pre",{parentName:"li"},(0,n.kt)("code",{parentName:"pre",className:"language-shell"},"brew tap tailcallhq/tailcall\nbrew install tailcall\n"))),(0,n.kt)("li",{parentName:"ol"},(0,n.kt)("p",{parentName:"li"},"Verify that Tailcall is installed correctly by running:"),(0,n.kt)("pre",{parentName:"li"},(0,n.kt)("code",{parentName:"pre",className:"language-shell"},"tc\n"))),(0,n.kt)("li",{parentName:"ol"},(0,n.kt)("p",{parentName:"li"},"To start the Tailcall server, execute the following command:"),(0,n.kt)("pre",{parentName:"li"},(0,n.kt)("code",{parentName:"pre",className:"language-shell"},"tc-server\n")),(0,n.kt)("p",{parentName:"li"},"This will initiate the server at ",(0,n.kt)("inlineCode",{parentName:"p"},"http://localhost:8080/graphql"),".")),(0,n.kt)("li",{parentName:"ol"},(0,n.kt)("p",{parentName:"li"},"Once installation is done, ",(0,n.kt)("strong",{parentName:"p"},"upgrades")," can be performed via:"),(0,n.kt)("pre",{parentName:"li"},(0,n.kt)("code",{parentName:"pre",className:"language-bash"},"brew update\nbrew upgrade tailcall\n")))),(0,n.kt)("h2",{id:"curl"},"Curl"),(0,n.kt)("p",null,"Follow the steps below to manually install the cli on your system:"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-bash"},"curl -sSL https://raw.githubusercontent.com/tailcallhq/tailcall/main/install.sh | bash -s -- {versionData.tag_name}\n")),(0,n.kt)("p",null,"This command fetches and executes the Tailcall installation script. The installed files are located in the ",(0,n.kt)("inlineCode",{parentName:"p"},"~/.tailcall")," directory."),(0,n.kt)("p",null,"Upon completion of the installation, extend your ",(0,n.kt)("inlineCode",{parentName:"p"},"PATH")," environment variable to include the ",(0,n.kt)("inlineCode",{parentName:"p"},"~/.tailcall/bin")," directory:"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-bash"},"export PATH=$PATH:~/.tailcall/bin\n")))}u.isMDXComponent=!0},2578:e=>{e.exports={yT:"v0.5.0"}}}]);