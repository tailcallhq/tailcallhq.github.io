// src/components/DocSearchComponent.tsx
import React from 'react';
import { DocSearch } from '@docsearch/react';


const DocSearchComponent = () => (
  <DocSearch
    appId="YourApplicationID"
    apiKey="YourSearchOnlyAPIKey"
    indexName="your_index_name"
  />
);

export default DocSearchComponent;
