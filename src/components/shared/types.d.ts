export interface Algolia {
  results: ResultsItem[]
}

interface ResultsItem {
  hits: HitsItem[]
  nbHits: number
  page: number
  nbPages: number
  hitsPerPage: number
  exhaustiveNbHits: boolean
  exhaustiveTypo: boolean
  exhaustive: Exhaustive
  query: string
  params: string
  index: string
  renderingContent: RenderingContent
  processingTimeMS: number
  processingTimingsMS: ProcessingTimingsMS
  serverTimeMS: number
}

export interface HitsItem {
  url: string
  url_without_anchor: string
  anchor: string
  content: string
  type: string
  hierarchy: Hierarchy
  objectID: string
  _snippetResult: _snippetResult
  _highlightResult: _highlightResult
  [key: string]: any
}
interface Hierarchy {
  lvl0: string | Lvl0
  lvl1: string | Lvl1
  lvl2: string | Lvl2
  lvl3?: null
  lvl4?: null
  lvl5?: null
  lvl6?: null
}
interface _snippetResult {
  content: Content
}
interface Content {
  value: string
  matchLevel: string
  fullyHighlighted?: boolean
  matchedWords?: string[]
}
interface _highlightResult {
  content: Content
  hierarchy: Hierarchy
}
interface Lvl0 {
  value: string
  matchLevel: string
  matchedWords: any[]
}
interface Lvl1 {
  value: string
  matchLevel: string
  matchedWords: any[]
}
interface Lvl2 {
  value: string
  matchLevel: string
  matchedWords: any[]
}
interface Exhaustive {
  nbHits: boolean
  typo: boolean
}
interface RenderingContent {}
interface ProcessingTimingsMS {
  _request: _request
}
interface _request {
  roundTrip: number
}
