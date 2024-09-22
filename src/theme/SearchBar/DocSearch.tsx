import React, { useCallback, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { DocSearchButton, useDocSearchKeyboardEvents } from "@docsearch/react";
import Head from "@docusaurus/Head";
import Link from "@docusaurus/Link";
import { useHistory } from "@docusaurus/router";
import { useSearchLinkCreator } from "@docusaurus/theme-common";
import { useSearchResultUrlProcessor } from "@docusaurus/theme-search-algolia/client";
import Translate from "@docusaurus/Translate";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import translations from "@theme/SearchTranslations";

import type { DocSearchModal as DocSearchModalType, DocSearchModalProps } from "@docsearch/react";
import type { InternalDocSearchHit, StoredDocSearchHit } from '@docsearch/react';


type DocSearchProps = Omit<DocSearchModalProps, "onClose" | "initialScrollY">;

let DocSearchModal: typeof DocSearchModalType | null = null;

function Hit({ hit, children }: { hit: InternalDocSearchHit; children: React.ReactNode }) {
  return <Link to={hit.url}>{children}</Link>;
}

function DocSearch(props: DocSearchProps) {
  const { siteMetadata } = useDocusaurusContext();
  const processSearchResultUrl = useSearchResultUrlProcessor();
  const history = useHistory();
  const searchContainer = useRef<HTMLDivElement | null>(null);
  const searchButtonRef = useRef<HTMLButtonElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [initialQuery, setInitialQuery] = useState<string | undefined>(undefined);

  const importDocSearchModalIfNeeded = useCallback(() => {
    if (DocSearchModal) {
      return Promise.resolve();
    }
    return Promise.all([
      import("@docsearch/react/modal"),
      import("@docsearch/react/style"),
      import("./styles.css"),
    ]).then(([{ DocSearchModal: Modal }]) => {
      DocSearchModal = Modal;
    });
  }, []);

  const prepareSearchContainer = useCallback(() => {
    if (!searchContainer.current && document) {
      const divElement = document.createElement("div");
      searchContainer.current = divElement;
      document.body.insertBefore(divElement, document.body.firstChild);
    }
  }, []);

  const openModal = useCallback(() => {
    prepareSearchContainer();
    importDocSearchModalIfNeeded().then(() => setIsOpen(true));
  }, [importDocSearchModalIfNeeded, prepareSearchContainer]);

  const closeModal = useCallback(() => {
    setIsOpen(false);
    searchButtonRef.current?.focus();
  }, []);

  const handleInput = useCallback(
    (event: KeyboardEvent) => {
      event.preventDefault();
      setInitialQuery(event.key);
      openModal();
    },
    [openModal]
  );

  const navigator = useRef({
    navigate({ itemUrl }: { itemUrl?: string }) {
      history.push(itemUrl!);
    },
  }).current;

  const transformItems = useRef<DocSearchModalProps["transformItems"]>((items) =>
    items.map((item) => ({
      ...item,
      url: processSearchResultUrl(item.url),
    }))
  ).current;

  useDocSearchKeyboardEvents({
    isOpen,
    onOpen: openModal,
    onClose: closeModal,
    onInput: handleInput,
    searchButtonRef,
  });

  return (
    <>
      <Head>
        <link rel="preconnect" href={`https://${props.appId}-dsn.algolia.net`} crossOrigin="anonymous" />
      </Head>

      <DocSearchButton
        onClick={openModal}
        ref={searchButtonRef}
        translations={translations.button}
      />

      {isOpen &&
        DocSearchModal &&
        searchContainer.current &&
        createPortal(
          <DocSearchModal
            onClose={closeModal}
            initialScrollY={window.scrollY}
            initialQuery={initialQuery}
            navigator={navigator}
            transformItems={transformItems}
            hitComponent={Hit}
            {...props}
          />,
          searchContainer.current
        )}
    </>
  );
}

export default function SearchBar(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  return <DocSearch {...(siteConfig.themeConfig.algolia as DocSearchProps)} />;
}
