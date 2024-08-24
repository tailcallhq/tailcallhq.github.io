"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[8179],{64653:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>o,contentTitle:()=>i,default:()=>h,frontMatter:()=>r,metadata:()=>c,toc:()=>l});var s=t(74848),a=t(28453);const r={title:"Deploy Tailcall on AWS Lambda",sidebar_label:"Deploy on AWS",description:"Deploy `tailcall` on AWS Lambda using the github action `tailcallhq/gh-action`"},i=void 0,c={id:"tailcall-on-aws",title:"Deploy Tailcall on AWS Lambda",description:"Deploy `tailcall` on AWS Lambda using the github action `tailcallhq/gh-action`",source:"@site/docs/tailcall-on-aws.md",sourceDirName:".",slug:"/tailcall-on-aws",permalink:"/docs/tailcall-on-aws",draft:!1,unlisted:!1,editUrl:"https://github.com/tailcallhq/tailcallhq.github.io/tree/develop/docs/tailcall-on-aws.md",tags:[],version:"current",lastUpdatedAt:1719818949e3,frontMatter:{title:"Deploy Tailcall on AWS Lambda",sidebar_label:"Deploy on AWS",description:"Deploy `tailcall` on AWS Lambda using the github action `tailcallhq/gh-action`"},sidebar:"docs",previous:{title:"Deploy on Fly",permalink:"/docs/deploy-tailcall-graphql-fly-actions"},next:{title:"Performance Tuning",permalink:"/docs/graphql-client-performance-tuning"}},o={},l=[{value:"Generate Access Keys for AWS",id:"generate-access-keys-for-aws",level:2},{value:"Terraform setup",id:"terraform-setup",level:2},{value:"Terraform API Token",id:"terraform-api-token",level:3},{value:"Terraform Organization and Workspace",id:"terraform-organization-and-workspace",level:3},{value:"Setting up the project repo",id:"setting-up-the-project-repo",level:2},{value:"Deploy on AWS Lambda using terraform",id:"deploy-on-aws-lambda-using-terraform",level:2}];function d(e){const n={a:"a",code:"code",h2:"h2",h3:"h3",img:"img",li:"li",ol:"ol",p:"p",pre:"pre",...(0,a.R)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsxs)(n.p,{children:["Before deploying ",(0,s.jsx)(n.code,{children:"tailcall"})," on AWS Lambda, you need to generate the AWS Access Key ID and Secret Access Key. If you don't have an AWS account, you can create one ",(0,s.jsx)(n.a,{href:"https://aws.amazon.com/",children:"here"}),"."]}),"\n",(0,s.jsx)(n.h2,{id:"generate-access-keys-for-aws",children:"Generate Access Keys for AWS"}),"\n",(0,s.jsx)(n.p,{children:"Follow the steps below to generate the Access Keys:"}),"\n",(0,s.jsxs)(n.ol,{children:["\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsxs)(n.p,{children:["Go to ",(0,s.jsx)(n.a,{href:"https://console.aws.amazon.com/",children:"AWS Management Console"})," and click the drop down menu in the top right corner and Click on ",(0,s.jsx)(n.code,{children:"Security credentials"}),"."]}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.img,{alt:"credentials.png",src:t(43164).A+"",width:"1512",height:"928"})}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsxs)(n.p,{children:["Scroll down to the ",(0,s.jsx)(n.code,{children:"Access Keys"})," section and click on ",(0,s.jsx)(n.code,{children:"Create access key"}),"."]}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.img,{alt:"access-key.png",src:t(22612).A+"",width:"1512",height:"882"})}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsxs)(n.p,{children:["You will get the following warning since we are trying to create access keys for the root user. For this guide, we will continue with creating the access keys. If you do not want to continue with the root user, you can learn more about the AWS security credentials ",(0,s.jsx)(n.a,{href:"https://docs.aws.amazon.com/IAM/latest/UserGuide/security-creds.html",children:"here"})," and managing access keys ",(0,s.jsx)(n.a,{href:"https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_access-keys.html?icmpid=docs_iam_console#Using_CreateAccessKey",children:"here"}),"."]}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.img,{alt:"warning.png",src:t(51250).A+"",width:"1512",height:"883"})}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsxs)(n.p,{children:["Once you click on ",(0,s.jsx)(n.code,{children:"Create access key"}),", you will get the ",(0,s.jsx)(n.code,{children:"Access key ID"})," and ",(0,s.jsx)(n.code,{children:"Secret access key"}),". Make sure to download the ",(0,s.jsx)(n.code,{children:"CSV"})," file and store it securely."]}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.img,{alt:"access-keys.png",src:t(79333).A+"",width:"1512",height:"884"})}),"\n"]}),"\n"]}),"\n",(0,s.jsx)(n.h2,{id:"terraform-setup",children:"Terraform setup"}),"\n",(0,s.jsxs)(n.p,{children:["Now that you have the AWS Access Key ID and Secret Access Key, you will need to generate API token for terraform and setup a terraform organization and workspace. If you don't have a Terraform Cloud account, you can create one ",(0,s.jsx)(n.a,{href:"https://app.terraform.io/signup/account",children:"here"}),"."]}),"\n",(0,s.jsx)(n.h3,{id:"terraform-api-token",children:"Terraform API Token"}),"\n",(0,s.jsx)(n.p,{children:"Follow these steps to generate the Terraform API token:"}),"\n",(0,s.jsxs)(n.ol,{children:["\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsxs)(n.p,{children:["Go to the ",(0,s.jsx)(n.a,{href:"https://app.terraform.io/app/settings/tokens",children:"Tokens section in Settings"})," and click on ",(0,s.jsx)(n.code,{children:"Create an API token"}),"."]}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.img,{alt:"create-token.png",src:t(2416).A+"",width:"1512",height:"883"})}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsxs)(n.p,{children:["Give a description for the token and change the expiration if required. Click on ",(0,s.jsx)(n.code,{children:"Generate token"}),"."]}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.img,{alt:"gen-token.png",src:t(55320).A+"",width:"1512",height:"882"})}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsx)(n.p,{children:"Copy the generated token and store it securely."}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.img,{alt:"token.png",src:t(38745).A+"",width:"1512",height:"882"})}),"\n"]}),"\n"]}),"\n",(0,s.jsx)(n.h3,{id:"terraform-organization-and-workspace",children:"Terraform Organization and Workspace"}),"\n",(0,s.jsxs)(n.ol,{children:["\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsxs)(n.p,{children:["To create an organization, go to the ",(0,s.jsx)(n.a,{href:"https://app.terraform.io/app/organizations",children:"Organizations section in Settings"})," and click on ",(0,s.jsx)(n.code,{children:"Create organization"}),"."]}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.img,{alt:"terra-org.png",src:t(63693).A+"",width:"1512",height:"881"})}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsxs)(n.p,{children:["Fill in the organization name and email and click on ",(0,s.jsx)(n.code,{children:"Create organization"}),"."]}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.img,{alt:"create-org.png",src:t(89381).A+"",width:"1512",height:"880"})}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsxs)(n.p,{children:["Now that you have created an organization, you will be presented with the following page for creating a workspace. Click on ",(0,s.jsx)(n.code,{children:"CLI-Driven Workflow"}),", since the github action which we will be using for deployment, ",(0,s.jsx)(n.a,{href:"https://github.com/tailcallhq/gh-action",children:"tailcallhq/gh-action"}),", uses the terraform CLI."]}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.img,{alt:"workflow.png",src:t(66503).A+"",width:"1512",height:"880"})}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsxs)(n.p,{children:["Fill in the workspace name. By default the project will be set to ",(0,s.jsx)(n.code,{children:"Default Project"}),", if you have any project in terraform cloud, you can select that project, otherwise continue with the ",(0,s.jsx)(n.code,{children:"Default Project"})," and click on ",(0,s.jsx)(n.code,{children:"Create"}),"."]}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.img,{alt:"create-workspace.png",src:t(46216).A+"",width:"1512",height:"883"})}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(n.p,{children:["You now have everything required for a successful deployment of your ",(0,s.jsx)(n.code,{children:"tailcall"})," server on AWS Lambda."]}),"\n",(0,s.jsx)(n.h2,{id:"setting-up-the-project-repo",children:"Setting up the project repo"}),"\n",(0,s.jsxs)(n.p,{children:["Now you need to create a new repository on Github and use the Github action ",(0,s.jsx)(n.code,{children:"tailcallhq/gh-action"})," to deploy it. The easiest way to get started is to create a new repository using this template repo ",(0,s.jsx)(n.a,{href:"https://github.com/tailcallhq/deploy-tailcall",children:"https://github.com/tailcallhq/deploy-tailcall"}),"."]}),"\n",(0,s.jsxs)(n.ol,{children:["\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsxs)(n.p,{children:["Go to the repo and click on ",(0,s.jsx)(n.code,{children:"Use this template"})," and create a new repository."]}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.img,{alt:"github-template.png",src:t(86384).A+"",width:"1512",height:"924"})}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsxs)(n.p,{children:["Give your repository a name and click on ",(0,s.jsx)(n.code,{children:"Create repository"}),"."]}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.img,{alt:"create-repo.png",src:t(26315).A+"",width:"1512",height:"882"})}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsxs)(n.p,{children:["Now that you have created a repository, you will need to add the AWS access keys and Terraform API token to the repository secrets. To do that, click on ",(0,s.jsx)(n.code,{children:"Settings"}),"."]}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.img,{alt:"settings.png",src:t(7143).A+"",width:"1512",height:"882"})}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsxs)(n.p,{children:["Click on ",(0,s.jsx)(n.code,{children:"Secrets and variables"})," in the left side bar to expand the section and click on ",(0,s.jsx)(n.code,{children:"Actions"}),"."]}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.img,{alt:"actions.png",src:t(74963).A+"",width:"1512",height:"883"})}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsxs)(n.p,{children:["Click on ",(0,s.jsx)(n.code,{children:"New repository secret"})," to add a new secret."]}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.img,{alt:"new-secret.png",src:t(99255).A+"",width:"1512",height:"882"})}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsxs)(n.p,{children:["Add the secret name as ",(0,s.jsx)(n.code,{children:"AWS_ACCESS_KEY_ID"})," or any name you prefer and paste the AWS access key ID that you generated earlier in the value field. Click on ",(0,s.jsx)(n.code,{children:"Add secret"})," to save the secret."]}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.img,{alt:"secret.png",src:t(90364).A+"",width:"1512",height:"881"})}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsx)(n.p,{children:"Similarly add the AWS secret access key and the Terraform API token as secrets to the repository."}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.img,{alt:"other-secrets.png",src:t(20816).A+"",width:"1512",height:"879"})}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(n.p,{children:["You are now ready to deploy your ",(0,s.jsx)(n.code,{children:"tailcall"})," server on AWS Lambda using terraform."]}),"\n",(0,s.jsx)(n.h2,{id:"deploy-on-aws-lambda-using-terraform",children:"Deploy on AWS Lambda using terraform"}),"\n",(0,s.jsxs)(n.p,{children:["In this example, we will deploy a simple ",(0,s.jsx)(n.code,{children:"graphQL"})," server using ",(0,s.jsx)(n.code,{children:"tailcall"}),", on AWS Lambda using terraform, which will convert the JSONPlaceholder REST API to a GraphQL API."]}),"\n",(0,s.jsxs)(n.p,{children:["Below is the config present in the template repo, that will be used for this deployment. You can learn more about this ",(0,s.jsx)(n.a,{href:"/docs/#writing-a-graphql-configuration",children:"here"}),"."]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-graphql",children:'schema\n  @upstream(\n    baseURL: "http://jsonplaceholder.typicode.com"\n  ) {\n  query: Query\n}\n\ntype Query {\n  posts: [Post] @http(path: "/posts")\n}\n\ntype User {\n  id: Int!\n  name: String!\n  username: String!\n  email: String!\n  phone: String\n  website: String\n}\n\ntype Post {\n  id: Int!\n  userId: Int!\n  title: String!\n  body: String!\n  user: User @http(path: "/users/{{.value.userId}}")\n}\n'})}),"\n",(0,s.jsxs)(n.p,{children:["To deploy the server, just update the ",(0,s.jsx)(n.code,{children:"provider"})," to ",(0,s.jsx)(n.code,{children:"aws"})," in the ",(0,s.jsx)(n.code,{children:"deploy-tailcall"})," job in the ",(0,s.jsx)(n.code,{children:".github/workflows/main.yml"})," file, similar to the example below. Also, update the ",(0,s.jsx)(n.code,{children:"terraform-workspace"})," and ",(0,s.jsx)(n.code,{children:"terraform-org"})," as well as the other inputs based on your requirements."]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-yaml",children:'on: [push]\n\njobs:\n  deploy_tailcall:\n    runs-on: ubuntu-latest\n    name: Deploy Tailcall\n    steps:\n      - name: Checkout repository\n        uses: actions/checkout@v2\n      - name: Deploy Tailcall\n        id: deploy-tailcall\n        uses: tailcallhq/gh-action@v0.2\n        with:\n          provider: "aws"\n          aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}\n          aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}\n          aws-region: "us-east-1"\n          aws-iam-role: "iam_for_tailcall"\n          terraform-api-token: ${{ secrets.TERRAFORM_API_TOKEN }}\n          terraform-org: "tailcall-demo"\n          terraform-workspace: "tailcall"\n          tailcall-config: "config.graphql"\n'})}),"\n",(0,s.jsxs)(n.p,{children:["After updating the ",(0,s.jsx)(n.code,{children:"main.yml"})," file, commit the changes and push them to the repository. This will trigger the deployment of the ",(0,s.jsx)(n.code,{children:"tailcall"})," server on AWS Lambda."]})]})}function h(e={}){const{wrapper:n}={...(0,a.R)(),...e.components};return n?(0,s.jsx)(n,{...e,children:(0,s.jsx)(d,{...e})}):d(e)}},22612:(e,n,t)=>{t.d(n,{A:()=>s});const s=t.p+"assets/images/access-key-6bcb0b3b4d3cc1c0bfa1b7ced1874fd3.png"},79333:(e,n,t)=>{t.d(n,{A:()=>s});const s=t.p+"assets/images/access-keys-b80c39afd444e1224944ba3a98a1068a.png"},74963:(e,n,t)=>{t.d(n,{A:()=>s});const s=t.p+"assets/images/actions-578211c3a157e3d430ce6cbad8a09666.png"},89381:(e,n,t)=>{t.d(n,{A:()=>s});const s=t.p+"assets/images/create-org-090ccca5237c6ad623bf0bc0c25716ea.png"},26315:(e,n,t)=>{t.d(n,{A:()=>s});const s=t.p+"assets/images/create-repo-44237ad8b9ad599f0a4d38bdd8aee394.png"},2416:(e,n,t)=>{t.d(n,{A:()=>s});const s=t.p+"assets/images/create-token-3a10bdb1b4352e52bdeeeaaaa21f1efe.png"},46216:(e,n,t)=>{t.d(n,{A:()=>s});const s=t.p+"assets/images/create-workspace-7d7d25363534ff5b1d368c91ba78f0f4.png"},43164:(e,n,t)=>{t.d(n,{A:()=>s});const s=t.p+"assets/images/credentials-67756fb78add9bde6c46ea3a74cae426.png"},55320:(e,n,t)=>{t.d(n,{A:()=>s});const s=t.p+"assets/images/gen-token-60237395ed36ba3e0ff4c71beb4bd320.png"},99255:(e,n,t)=>{t.d(n,{A:()=>s});const s=t.p+"assets/images/new-secret-7db80ac96ce5eca3faf81575c09f0be7.png"},20816:(e,n,t)=>{t.d(n,{A:()=>s});const s=t.p+"assets/images/other-secrets-0b28a7e60fb17292a2d3a157c4a3bc64.png"},90364:(e,n,t)=>{t.d(n,{A:()=>s});const s=t.p+"assets/images/secret-09589c77f17c126456fc243a0068912a.png"},7143:(e,n,t)=>{t.d(n,{A:()=>s});const s=t.p+"assets/images/settings-49273e4c000d0c12f2ce86eecaa06cd6.png"},63693:(e,n,t)=>{t.d(n,{A:()=>s});const s=t.p+"assets/images/terra-org-456a584e374698a1755e29340a75d326.png"},38745:(e,n,t)=>{t.d(n,{A:()=>s});const s=t.p+"assets/images/token-ac99fd414e9f030eb9e19965c641a712.png"},51250:(e,n,t)=>{t.d(n,{A:()=>s});const s=t.p+"assets/images/warning-9c9ea8bbf4afd6d31086a1ed6763da1e.png"},66503:(e,n,t)=>{t.d(n,{A:()=>s});const s=t.p+"assets/images/workflow-a7c9f11caf3e713b325baa6fbb5d22af.png"},86384:(e,n,t)=>{t.d(n,{A:()=>s});const s=t.p+"assets/images/github-template-0898f5cf0de3207dad1d6d54159fb9db.png"},28453:(e,n,t)=>{t.d(n,{R:()=>i,x:()=>c});var s=t(96540);const a={},r=s.createContext(a);function i(e){const n=s.useContext(r);return s.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function c(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(a):e.components||a:i(e.components),s.createElement(r.Provider,{value:n},e.children)}}}]);