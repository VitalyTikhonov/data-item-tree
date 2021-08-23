import React from 'react';
import { Route, Switch, NavLink } from "react-router-dom";
import './App.scss';
// import { Counter } from './features/counter/Counter';
import { User } from './components/User/User';
import data from './data/data.json';
// import data2 from './data/data-formation';
import { v4 as getUid } from 'uuid';

localStorage.setItem('patients', JSON.stringify(data))
const dataToRender = JSON.parse(localStorage.getItem('patients'))

function App() {
  return (
    <div className="app">
      <ul className="app__tree list-unstyling" >
        {dataToRender.map((user) => (
          <li className="app__tree-item" key={getUid()} >
            <NavLink
              className="app__tree-link link-unstyling"
              to={`/${user.id}`}
              activeClassName="app__tree-link-active"
            >
              {user.firstName} {user.lastName}
            </NavLink>
          </li>
        ))}
      </ul>
      <Switch>
        <Route path='/:id' component={User} />
      </Switch>
    </div>
  );
}

export default App;
