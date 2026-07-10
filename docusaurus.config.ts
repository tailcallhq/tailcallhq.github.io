import { Config } from '@docusaurus/types';

const config: Config = {
  title: 'Tailcall',
  tagline: 'GraphQL and more',
  url: 'https://tailcallhq.github.io',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'tailcallhq',
  projectName: 'tailcallhq.github.io',
  themeConfig: {
    navbar: {
      title: 'Tailcall',
      logo: {
        alt: 'Tailcall Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'doc',
          docId: 'getting-started',
          position: 'left',
          label: 'Docs',
        },
        { to: '/blog', label: 'Blog', position: 'left' },
        {
          href: 'https://github.com/tailcallhq/tailcallhq.github.io',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Getting Started',
              to: '/docs/getting-started',
            },
            {
              label: 'GraphQL',
              to: '/docs/graphql',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Blog',
              to: '/blog',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/tailcallhq/tailcallhq.github.io',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/tailcallhq/tailcallhq.github.io',
            },
            {
              label: 'Twitter',
              href: 'https://twitter.com/tailcallhq',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Tailcall. Built with Docusaurus.`,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./docs/sidebar.ts'),
          editUrl: 'https://github.com/tailcallhq/tailcallhq.github.io/edit/main/docs/',
        },
        blog: {
          path: './blog',
          editUrl: 'https://github.com/tailcallhq/tailcallhq.github.io/edit/main/blog/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};

export default config;
