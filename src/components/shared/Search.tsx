import React, { useEffect, useState } from 'react';
import algoliasearch from 'algoliasearch/lite';
import { InstantSearch, useSearchBox, useHits, RefinementList, Highlight } from 'react-instantsearch-hooks-web';
import PageSearchIcon from "@site/static/icons/basic/page-search.svg";
import EnterKeyIcon from "@site/static/icons/basic/enter-key.svg";
import UpDownKeyIcon from "@site/static/icons/basic/up-down-key.svg";
import EscapeKeyIcon from "@site/static/icons/basic/escape-key.svg";

import useIsBrowser from '@docusaurus/useIsBrowser';
import Platform from "react-platform-js"
import styles from '@site/src/theme/DocRoot/Layout/Sidebar/styles.module.css'
import { useDebounce } from 'use-debounce';
import {
  Hits,
} from 'react-instantsearch-hooks-web';
const algoliaConfig = {
  appId: 'R2IYF7ETH7',
  apiKey: '599cec31baffa4868cae4e79f180729b',
  indexName: 'docsearch',
};

interface Props {
  children: React.ReactNode;
}

const SearchRoot = () => {
  const { query, refine } = useSearchBox();
  const { hits } = useHits();
  const [isSearchModalVisible, setIsSearchModalVisible] = useState(true);
  const isBrowser = useIsBrowser()

  const placeholder = isBrowser ? (Platform.OS.startsWith("Mac") ? "Search ⌘+K" : "Search Ctrl+K") : "Search"

  const SearchBox = () => {
    const [value, setValue] = useState(query);
    const [debouncedValue] = useDebounce(value, 300);

    useEffect(() => {
      if (debouncedValue !== query) {
        refine(debouncedValue);
      }
    }, [debouncedValue]);

    return (
      <div className="navbar__search">
        <input
          className='navbar__search-input search-bar ds-input'
          type="search"
          placeholder={placeholder}
          autoFocus={true}
          onChange={event => setValue(event.currentTarget.value)}
        />
      </div>
    );
  };

  // const Hits = () => {
  //   return (
  //     <ul>
  //       {hits.map(hit => (
  //         <li key={hit.objectID}>{hit.name}</li> // Adjust according to your data structure
  //       ))}
  //     </ul>
  //   );
  // };

  const handleSearchClick = () => {
    setIsSearchModalVisible(true);
  };

  const handleSearchModalClose = () => {
    setIsSearchModalVisible(false);
  };

  const handleKeyPress = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      handleSearchModalClose()
    }
    if (
      (event.metaKey && event.key === "k" && Platform.UA.includes("Mac")) ||
      (event.ctrlKey && event.key === "k" && Platform.UA.includes("Win"))
    ) {
      handleSearchClick()
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, []);


  function Hit(props: any) {
    return (
      <div>


        <div className="hit-name">

          <Highlight attribute="name" hit={props.hit} />

        </div>

        <div className="hit-description">
          <Highlight attribute="description" hit={props.hit} />

        </div>

        <div className="hit-price">${props.hit.price}</div>

      </div>

    );
  }
  return (
    <>
      {/* Search input container */}
      <div className={styles.inputContainer}   >
        <span aria-label="expand searchbar" role="button" className="search-icon" tabIndex={0}></span>
        <input readOnly placeholder={placeholder} onClick={handleSearchClick} className={styles.input} />
      </div>
      {/* Search modal */}
      {isSearchModalVisible ? (
        <>
          <div onClick={handleSearchModalClose} className={styles.overlay}></div>
          <div className={styles.modal}>
            <div className={styles.modalContent}>
              <SearchBox />
              {hits.length > 0 ? 
              <div style={{ overflowY: 'auto', maxHeight: '296px' }}>
              <Hits hitComponent={Hit} />
              </div>

                :
                <div className={styles.initialCase}>
                  <PageSearchIcon />
                  <div className={styles.searchDocsTitle}>Search Docs</div>
                  <div className={styles.searchDocsDesc}>Search anything within the docs</div>
                </div>
              }
            </div>
            <div className={styles.footer}>
              <div className={styles.navigationInfoItem}>
                <EnterKeyIcon />
                <span>to select</span>
              </div>
              <div className={styles.navigationInfoItem}>
                <UpDownKeyIcon />
                <span>to navigate</span>
              </div>
              <div className={styles.navigationInfoItem}>
                <EscapeKeyIcon />
                <span>to close</span>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};

const SearchBar = () => {
  const searchClient = algoliasearch(algoliaConfig.appId, algoliaConfig.apiKey);
  return (
    <InstantSearch searchClient={searchClient} indexName={algoliaConfig.indexName}>
      <SearchRoot />
    </InstantSearch>
  )
}


export default SearchBar
