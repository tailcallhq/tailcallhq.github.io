import React from 'react';

const CustomerFeedbackCard = () => {
    return (
        <div className="flex flex-col items-center justify-end br-10 bg-tailCall-dark-600 tailcall-light-100 text-white min-h-[200px] border border-solid border-tailCall-border-light-500 rounded-2xl p-SPACE_03 border-b-0 rounded-bl-none rounded-br-none">
            <span>
                "In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before the final copy is available"
            </span>
            <span className="mt-SPACE_04">
                Director, Google
            </span>
        </div>
    )
}

export default CustomerFeedbackCard