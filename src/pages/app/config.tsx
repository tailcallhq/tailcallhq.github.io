import React, { useState, useEffect } from 'react';
import Layout from '@theme/Layout';

const ConfigPage: React.FC = () => {
  const [schema, setSchema] = useState<any>(null);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    fetch('https://raw.githubusercontent.com/tailcallhq/tailcall/main/generated/.tailcallrc.schema.json')
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Failed to fetch schema: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => setSchema(data))
      .catch((err) => setError(err));
  }, []);

  return (
    <Layout title="Config Generator" description="Generate Tailcall configurations">
      <main className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">Tailcall Config Generator</h1>
        {error && <div className="text-red-600">Error: {error.message}</div>}
        {!schema && !error && <div>Loading schema...</div>}
        {schema && (
          <pre className="bg-gray-100 p-4 rounded overflow-auto">
            {JSON.stringify(schema, null, 2)}
          </pre>
        )}
      </main>
    </Layout>
  );
};

export default ConfigPage;
