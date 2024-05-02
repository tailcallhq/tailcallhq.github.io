/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type {LoadContext, Plugin} from '@docusaurus/types';
import type {PluginOptions, Options} from './options';

function createConfigSnippet({
  trackingID,
  anonymizeIP,
}: {
  trackingID: string;
  anonymizeIP: boolean;
}): string {
  return `gtag('config', '${trackingID}', { ${
    anonymizeIP ? "'anonymize_ip': true" : ''
  } });`;
}

function createConfigSnippets({
  trackingID: trackingIDArray,
  anonymizeIP,
}: PluginOptions): string {
  return trackingIDArray
    .map((trackingID) => createConfigSnippet({trackingID, anonymizeIP}))
    .join('\n');
}

export default function pluginGoogleGtag(
  context: LoadContext,
  options: PluginOptions,
): Plugin {
  const isProd = process.env.NODE_ENV === 'production';

  const firstTrackingId = options.trackingID[0];

  return {
    name: 'docusaurus-plugin-google-gtag',

    contentLoaded({actions}) {
      actions.setGlobalData(options);
    },

    getClientModules() {
      return isProd ? ['./gtag'] : [];
    },

    injectHtmlTags() {
      if (!isProd) {
        return {};
      }
      return {
        // Gtag includes GA by default, so we also preconnect to
        // google-analytics.
        headTags: [
          // https://developers.google.com/analytics/devguides/collection/gtagjs/#install_the_global_site_tag
          {
            tagName: 'script',
            attributes: {
              type: "text/partytown",
              // We only include the first tracking id here because google says
              // we shouldn't install multiple tags/scripts on the same page
              // Instead we should load one script and use n * gtag("config",id)
              // See https://developers.google.com/tag-platform/gtagjs/install#add-products
              src: `https://www.googletagmanager.com/gtag/js?id=${firstTrackingId}`,
            },
          },
          {
            tagName: 'script',
            innerHTML: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              ${createConfigSnippets(options)};
              `,
              attributes: {
                type: "text/partytown",
              }
          },
        ],
      };
    },
  };
}

export {validateThemeConfig, validateOptions} from './options';

export type {PluginOptions, Options};
