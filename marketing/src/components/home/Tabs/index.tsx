import React, {ReactElement, ReactNode, cloneElement, useState} from "react"

interface TabItemProps {
  label: string
  value: string
  children: ReactNode
}

const TabItem = ({children}: TabItemProps) => {
  return <>{children}</>
}

interface TabsProps {
  children: ReactElement<TabItemProps> | ReactElement<TabItemProps>[]
}

const Tabs = ({children}: TabsProps) => {
  const childrenArray = Array.isArray(children) ? children : [children]
  const [activeTab, setActiveTab] = useState(childrenArray[0].props.value)

  return (
    <div>
      <div className="tab-list ">
        <ul role="tablist" className="flex flex-row gap-4 text-[var(--ifm-color-content-secondary)] mb-0 overflow-x-auto pl-0">
          {childrenArray.map((child) => (
            <li
              key={child.props.value}
              role="tab"
              className={`tabs-item font-semibold cursor-pointer border-b-3 border-transparent  ${child.props.value === activeTab ? "tabs-item-active" : ""}`}
              onClick={() => setActiveTab(child.props.value)}
            >
              {child.props.label}
            </li>
          ))}
        </ul>
      </div>
      <div className="tab-content">
        {childrenArray.map((child) => {
          if (child.props.value !== activeTab) return undefined
          return <div key={child.props.value}>{child.props.children}</div>
        })}
      </div>
    </div>
  )
}

export {Tabs, TabItem}
