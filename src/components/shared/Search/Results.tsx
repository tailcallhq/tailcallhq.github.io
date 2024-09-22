import React, {useEffect, useRef} from "react"
import ItemIcon from "./Icons"
import clsx from "clsx"
import type {DocSearchProps} from "@docsearch/react/dist/esm/index"
import {groupBy} from "./utils"
import Link from "@docusaurus/Link"

type DocSearchHit = Parameters<NonNullable<DocSearchProps["transformItems"]>>[0][number]
const Results = ({
  hits,
  selectedIndex,
  onClick,
}: {
  hits: DocSearchHit[]
  selectedIndex: number
  onClick: () => void
}) => {
  const groupedResults = groupBy<DocSearchHit>(hits, (hit) => hit.hierarchy.lvl0)
  const itemRefs = useRef<Array<HTMLAnchorElement | null>>([])

  useEffect(() => {
    if (selectedIndex !== -1 && itemRefs.current[selectedIndex]) {
      itemRefs.current[selectedIndex]?.focus()
      itemRefs.current[selectedIndex]?.scrollIntoView({
        behavior: "instant",
        block: "nearest",
      })
    }
  }, [selectedIndex])

  return (
    <div className="results-container p-2">
      {Object.entries(groupedResults).map(([section, items]) => (
        <div key={section}>
          <div className="section-title">{section}</div>
          {items.map((item, index) => (
            <Link
              key={index}
              to={new URL(item.url).pathname}
              style={{
                textDecoration: "none",
              }}
              onClick={onClick}
              className={clsx(
                "h-14 text-tailCall-gray bg-[#f1f1f1] hover:bg-tailCall-yellow  text-decoration-[none] scroll-m-2 hover:text-tailCall-gray p-2 my-1 rounded-lg flex flex-row items-center gap-x-4",
                selectedIndex === index && "bg-tailCall-yellow font-semibold",
              )}
              ref={(el) => (itemRefs.current[index] = el)}
            >
              <ItemIcon type={item.type} />
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
            </Link>
          ))}
        </div>
      ))}
    </div>
  )
}

export default Results
