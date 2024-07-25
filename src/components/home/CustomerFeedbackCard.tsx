import React from 'react';

type CustomerFeedbackCardProps = {
    citation: string;
    designation: string,
}

const CustomerFeedbackCard: React.FC<CustomerFeedbackCardProps> = ({ citation, designation }) => {
    return (
        <div className="customer-feedback-card flex flex-col items-center justify-end bg-tailCall-dark-600 tailcall-light-100 text-white py-SPACE_03 px-SPACE_06 border-b-0 rounded-bl-none rounded-br-none text-center text-content-small">
            <span>
                {citation}
            </span>
            <span className="mt-SPACE_04 text-content-tiny">
                {designation}
            </span>
        </div>
    )
}

export default CustomerFeedbackCard