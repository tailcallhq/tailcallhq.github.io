import {DocSearchHit} from "@docsearch/react/dist/esm/types"
import {groupBy} from "./utils"
import {SourceIcon} from "./Icons"
import React, {useState, useEffect, useRef} from "react"

const Results = ({hits}: {hits: DocSearchHit[]}) => {
  const groupedResults = groupBy<DocSearchHit>(hits, (hit) => hit.hierarchy.lvl0)
  const [focusedHitIndex, setFocusedHitIndex] = useState(0)
  const itemRefs = useRef<Array<HTMLAnchorElement | null>>([])

  useEffect(() => {
    itemRefs.current = itemRefs.current.slice(0, hits.length)
  }, [hits])

  useEffect(() => {
    if (itemRefs.current[focusedHitIndex]) {
      itemRefs.current[focusedHitIndex]?.scrollIntoView({behavior: "smooth", block: "nearest"})
    }
  }, [focusedHitIndex])

  return (
    <div className="results-container p-2">
      {Object.entries(groupedResults).map(([section, items]) => (
        <div key={section}>
          <div className="section-title">{section}</div>
          {items.map((item, index) => (
            <a
              key={index}
              href={item.url}
              style={{textDecoration: "none"}}
              className={`h-14 text-[#646464] bg-[#f1f1f1] hover:bg-[#FDEA2F] hover:text-[#1C1E21] p-2 my-1 rounded-lg flex flex-row items-center gap-x-4 ${
                focusedHitIndex === index ? "bg-[#FDEA2F] text-[#1C1E21]" : ""
              }`}
              ref={(el) => (itemRefs.current[index] = el)}
            >
              <SourceIcon type={item.type} />
              <div className="flex flex-col">
                <div
                  className="text-[14px]"
                  dangerouslySetInnerHTML={{__html: item?._snippetResult?.hierarchy?.lvl2?.value}}
                ></div>
                <div
                  className="text-[14px]"
                  dangerouslySetInnerHTML={{__html: item?._snippetResult?.hierarchy?.lvl1?.value}}
                ></div>
              </div>
            </a>
          ))}
        </div>
      ))}
    </div>
  )
}

export default Results
