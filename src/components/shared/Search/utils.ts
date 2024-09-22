import type {DocSearchHit} from "@docsearch/react/dist/esm/index"
import type {SearchClient} from "algoliasearch/lite"
import type {SearchResponse} from "@algolia/client-search"

export const groupBy = <TValue extends Record<string, unknown>>(
  values: TValue[],
  predicate: (value: TValue) => string,
  maxResultsPerGroup?: number,
): Record<string, TValue[]> => {
  return values.reduce<Record<string, TValue[]>>((acc, item) => {
    const key = predicate(item)

    if (!acc.hasOwnProperty(key)) {
      acc[key] = []
    }

    if (acc[key].length < (maxResultsPerGroup || 10)) {
      acc[key].push(item)
    }

    return acc
  }, {})
}

export const performSearch = async ({
  searchClient,
  query,
  setHits,
  indexName,
}: {
  searchClient: SearchClient
  query: string
  setHits: (hits: DocSearchHit[]) => void
  indexName: string
}) => {
  const {results} = await searchClient.search<DocSearchHit>([
    {
      query,
      indexName: indexName,
      params: {
        attributesToRetrieve: [
          "hierarchy.lvl0",
          "hierarchy.lvl1",
          "hierarchy.lvl2",
          "hierarchy.lvl3",
          "hierarchy.lvl4",
          "hierarchy.lvl5",
          "hierarchy.lvl6",
          "content",
          "type",
          "url",
        ],
        attributesToSnippet: [
          `hierarchy.lvl1:10`,
          `hierarchy.lvl2:10`,
          `hierarchy.lvl3:10`,
          `hierarchy.lvl4:10`,
          `hierarchy.lvl5:10`,
          `hierarchy.lvl6:10`,
          `content:10`,
        ],
        snippetEllipsisText: "…",
        highlightPreTag: "<mark>",
        highlightPostTag: "</mark>",
        hitsPerPage: 10,
      },
    },
  ])
  const firstResult = results[0] as SearchResponse<DocSearchHit>
  const {hits} = firstResult
  setHits(hits)
}
