import React from 'react';
import { Route, Switch } from "react-router-dom";
// import { Counter } from './features/counter/Counter';
import './App.scss';
import { data } from './data/data-formation';

localStorage.setItem('patients', JSON.stringify(data))
const dataToRender = localStorage.getItem('patients')

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path='/'>
          {dataToRender}
        </Route>
      </Switch>
    </div>
  );
}

export default App;
