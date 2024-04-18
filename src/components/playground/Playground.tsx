import React, { useEffect, useState } from 'react';
import { createGraphiQLFetcher } from "@graphiql/toolkit";
import { GraphiQL } from "graphiql";

type PlaygroundProps = {
    defaultApiEndpoint?: string;
}

const useDebouncedValue = (inputValue: string, delay: number) => {
    const [debouncedValue, setDebouncedValue] = useState(inputValue);
  
    useEffect(() => {
      const handler = setTimeout(() => {
        setDebouncedValue(inputValue);
      }, delay);
  
      return () => {
        clearTimeout(handler);
      };
    }, [inputValue, delay]);
  
    return debouncedValue;
};

const Playground: React.FC<PlaygroundProps> = ({defaultApiEndpoint}) => {
    const [apiEndpoint, setApiEndpoint] = useState(defaultApiEndpoint || "https://graphql-pokemon2.vercel.app/");
    const [inputValue, setInputValue] = useState(apiEndpoint);

    const debouncedApiEndpoint = useDebouncedValue(inputValue, 500);

    const fetcher = createGraphiQLFetcher({
        url: apiEndpoint,
    });

    useEffect(() => {
        setApiEndpoint(debouncedApiEndpoint);
    }, [debouncedApiEndpoint]);

    return (
        <div className='mt-SPACE_06'>
            <div className='flex px-SPACE_04'>
                <input
                name="api-endpoint"
                type="url"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className={`border border-solid border-tailCall-border-light-500 rounded-lg font-space-grotesk h-11 w-[100%]
                p-SPACE_04 text-content-small outline-none focus:border-x-tailCall-light-700`}
                placeholder="API Endpoint"
                />
            </div>
            <GraphiQL fetcher={fetcher} />
        </div>
    )
}

export default Playground;