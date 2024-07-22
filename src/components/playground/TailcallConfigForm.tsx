import React, { useEffect, useState } from "react";
import Form from '@rjsf/mui';
import axios from "axios";
import { tailcallConfigSchema } from "@site/src/constants";
import validator from '@rjsf/validator-ajv8';
import "../../css/configForm.css"

const formContext = {
    className: 'font-space-grotesk-imp'
};


const TailcallConfigForm = () => {
    const [schema, setSchema] = useState({});

    useEffect(() => {
        axios.get(`${tailcallConfigSchema}?v=${+new Date()}`)
            .then((res) => setSchema(res.data))
    }, []);

    return (
        <div className="m-8 ">
            <Form className="config-form" schema={schema} formContext={formContext} validator={validator} focusOnFirstError={true}/>
        </div>
    )
}

export default TailcallConfigForm;