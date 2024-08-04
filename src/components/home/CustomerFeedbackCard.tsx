import React from "react"
// @site/src/utils/index.ts

type CustomerFeedbackCardProps = {
  classNames?: string
  citation: string
  designation: string
  name?: string
  department?: string
  isCenterCard: boolean
  display: string
}

const CustomerFeedbackCard: React.FC<CustomerFeedbackCardProps> = ({
  classNames,
  citation,
  designation,
  name,
  department,
  isCenterCard,
  display,
}) => {
  return (
    <div
      className={`customer-feedback-card md:w-[33%] flex flex-col items-center justify-between bg-tailCall-dark-600 tailcall-light-100 text-white py-SPACE_06 px-SPACE_06 text-center text-content-small gap-y-SPACE_06 pb-10 ${classNames} ${
        isCenterCard && "md:!relative md:-top-10"
      }`}
    >
      {display === "Show" && department && (
        <>
          <span className={`sm:text-content-medium lg:text-content-large !font-bold !text-title-large`}>
            {`Loved by `}
            <span className={isCenterCard ? `text-tailCall-yellow` : ""}>{department}</span>
          </span>
        </>
      )}
      <span className="text-content-small sm:text-content-medium">{`“${citation}”`}</span>
      <span className="flex flex-col">
        {display === "Show" && name && (
          <span className="text-content-small sm:text-content-medium lg:text-content-large !font-bold">{name}</span>
        )}
        <span className="text-content-tiny sm:text-content-small">{designation}</span>
      </span>
    </div>
  )
}

export default CustomerFeedbackCard
