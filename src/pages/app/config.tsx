import React, { useEffect, useState } from 'react';
import Layout from '@theme/Layout';
import Form from '@rjsf/core';
import validator from '@rjsf/validator-ajv8';

export default function ConfigApp() {
  const [schema, setSchema] = useState<any>(null);
  const [formData, setFormData] = useState<any>({});
  
  useEffect(() => {
    fetch('https://raw.githubusercontent.com/tailcallhq/tailcall/main/generated/.tailcallrc.schema.json')
      .then((res) => res.json())
      .then((data) => {
        setSchema(data);
      })
      .catch((err) => console.error("Failed to load schema:", err));
  }, []);

  const handleDownload = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(formData, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href",     dataStr);
    downloadAnchorNode.setAttribute("download", ".tailcallrc.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  return (
    <Layout
      title="Tailcall Configurator"
      description="Create, update, and download Tailcall Configurations visually"
    >
      <main className="container margin-vert--lg">
        <div className="row">
          <div className="col col--8 col--offset-2">
            <h1>Tailcall Configurator</h1>
            <p>Use the form below to visually generate your Tailcall configuration.</p>
            
            {schema ? (
              <div className="card shadow--md padding--md" style={{ background: 'var(--ifm-background-surface-color)' }}>
                <Form 
                  schema={schema} 
                  validator={validator}
                  formData={formData}
                  onChange={(e) => setFormData(e.formData)}
                  onSubmit={handleDownload}
                >
                  <div style={{ marginTop: '20px' }}>
                    <button type="submit" className="button button--primary button--lg">
                      Download Configuration
                    </button>
                  </div>
                </Form>
              </div>
            ) : (
              <div className="text--center padding--xl">
                <div>Loading schema...</div>
              </div>
            )}
          </div>
        </div>
      </main>
    </Layout>
  );
}
