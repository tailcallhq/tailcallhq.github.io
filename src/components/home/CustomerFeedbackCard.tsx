import React from "react"

type CustomerFeedbackCardProps = {
    classNames?: string
    citation: string
    designation: string
}

const CustomerFeedbackCard: React.FC<CustomerFeedbackCardProps> = ({ classNames, citation, designation }) => {
    return (
        <div
            className={`${classNames} customer-feedback-card flex flex-col items-center justify-end bg-tailCall-dark-600 tailcall-light-100 text-white py-SPACE_06 px-SPACE_06 text-center text-content-small gap-y-SPACE_08`}
        >
            <span>{citation}</span>
            <span className="text-content-tiny">{designation}</span>
        </div>
    )
}

export default CustomerFeedbackCard
