---
title: Playground
sidebar_label: Playground
---

import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

const PlaygroundPage = lazy(() => import('./PlaygroundPage'));

function App() {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Route path="/" exact component={PlaygroundPage} />
        </Switch>
      </Suspense>
    </Router>
  );
}

export default App;
