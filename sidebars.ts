/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */

import {SidebarsConfig} from "@docusaurus/plugin-content-docs"

const sidebars: SidebarsConfig = {
  // By default, Docusaurus generates a sidebar from the docs folder structure
  docs: [
    {
      type: "category",
      label: "Usage",
      items: [
        "getting-started",
        "cli",
        "directives",
        "context",
        "playground",
        "conventions",
        "execution-strategy",
        "watch-mode",
      ],
    },
    {
      type: "category",
      label: "Features",
      items: [
        "N+1",
        "auth",
        "grpc",
        "scripting",
        "http2",
        "telemetry",
        "http-cache",
        "logging",
        "rest",
        "scalar",
        "environment-variables",
        "configuration",
        "config-generation",
      ],
    },
    {type: "category", label: "Integrations", items: ["apollo-studio", "data-dog", "new-relic", "honey-comb"]},
    {
      type: "category",
      label: "Production",
      items: ["gh-action", "tailcall-on-fly", "tailcall-on-aws", "client-tuning"],
    },
    {
      type: "category",
      label: "Contributors",
      items: [
        "contributors/guidelines",
        "contributors/bounty",
        "contributors/testing",
        "contributors/integration-testing",
        "contributors/mutability",
        "contributors/telemetry",
        "contributors/micro-benchmark",
        "contributors/wrk-benchmark",
      ],
    },
  ],
}

module.exports = sidebars
