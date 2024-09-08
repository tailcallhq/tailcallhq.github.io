import {useState} from "react"
import {Tab, Tabs} from "react-tabs-scrollable"
import "react-tabs-scrollable/dist/rts.css"

export default function Categories(props: any): JSX.Element {
  const {tags, activeTag, setActiveTag} = props

  // define state with initial value to let the tabs start with that value
  const [activeTab, setActiveTab] = useState(0)

  // define a onClick function to bind the value on tab click
  const onTabClick = (e, index) => {
    setActiveTab(index)
    setActiveTag(tags[index])
  }

  return (
    <>
      <Tabs
        hideNavBtnsOnMobile={false}
        tabsContainerStyle={{border: "none", background: "transparent"}}
        className="bg-transparent border-none "
        activeTab={activeTab}
        onTabClick={onTabClick}
      >
        {/* generating an array to loop through it  */}
        {tags.map((name) => (
          <Tab key={name}>{name}</Tab>
        ))}
      </Tabs>
    </>
  )
}
