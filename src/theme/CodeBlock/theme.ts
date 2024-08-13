import {PrismTheme, themes} from "prism-react-renderer"

const baseTheme = themes.github
const prismTheme = {
  ...baseTheme,
  plain: {
    ...baseTheme.plain,
    color: "#fff",
    backgroundColor: "#303037",
  },
  styles: [
    ...baseTheme.styles,
    {
      types: ["line-number"],
      style: {
        color: "#5B5B60",
      },
    },
    {
      types: ["title"],
      style: {
        color: "#0550AE",
        fontWeight: "bold",
      },
    },
    {
      types: ["parameter"],
      style: {
        color: "#953800",
      },
    },
    {
      types: ["punctuation"],
      style: {
        color: "#fff",
      },
    },
    {
      types: ["boolean", "rule", "color", "number", "constant", "property"],
      style: {
        color: "#C586C0",
      },
    },
    {
      types: ["scalar"],
      style: {
        color: "#8DFFF8",
      },
    },
    {
      types: ["atrule", "tag"],
      style: {
        color: "#b76b01",
      },
    },
    {
      types: ["script"],
      style: {
        color: "#fff",
      },
    },
    {
      types: ["operator", "unit", "rule"],
      style: {
        color: "#8DFFF8",
      },
    },
    {
      types: ["font-matter", "string", "attr-value"],
      style: {
        color: "#FDB869",
      },
    },
    {
      types: ["class-name"],
      style: {
        color: "#C586C0",
      },
    },
    {
      types: ["attr-name"],
      style: {
        color: "#8DFFF8",
      },
    },
    {
      types: ["keyword"],
      style: {
        color: "#C586C0",
      },
    },
    {
      types: ["function"],
      style: {
        color: "#FDEA2F",
      },
    },
    {
      types: ["selector"],
      style: {
        color: "#6F42C1",
      },
    },
    {
      types: ["variable"],
      style: {
        color: "#E36209",
      },
    },
    {
      types: ["comment"],
      style: {
        color: "#30C26D",
      },
    },
  ],
} satisfies PrismTheme

export default prismTheme
