import React from 'react';
import { Route, Switch, NavLink } from "react-router-dom";
import './App.scss';
// import { Counter } from './features/counter/Counter';
import { User } from './components/User/User';
import { UsersDashboard } from './components/UsersDashboard/UsersDashboard';
import data from './data/data.json';
import { categories } from './data/data-formation';
import { v4 as getUid } from 'uuid';

function App() {
  localStorage.setItem('users', JSON.stringify(data))
  const dataToRender = JSON.parse(localStorage.getItem('users'))

  return (
    <div className="app">
      <nav className="app__menu" >
        <ul className="app__tree list-unstyling" >
          <li className="app__tree-item" key={getUid()} >
            <NavLink
              className="app__tree-link link-unstyling"
              exact to="/"
              activeClassName="app__tree-link_active"
            >
              Главная
            </NavLink>
          </li>

          <li className="app__tree-item" key={getUid()} >
            <NavLink
              className="app__tree-link link-unstyling"
              exact to="/dashboard"
              activeClassName="app__tree-link_active"
            >
              Все пользователи
            </NavLink>
          </li>

          {categories.map((category) => (
            <li className="app__tree-item" key={getUid()} >
              <NavLink
                className="app__tree-link link-unstyling"
                to={`/dashboard/${category.id}`}
                activeClassName="app__tree-link_active"
              >
                {category.caption}
              </NavLink>

              <ul className="app__tree app__tree_level_2 list-unstyling" >
                {dataToRender.filter((user) => user.category.id === category.id).map((item) => (
                  <li className="app__tree-item" key={getUid()} >
                    <NavLink
                      className="app__tree-link link-unstyling"
                      to={`/users/${item.id}`}
                      activeClassName="app__tree-link_active"
                    >
                      {item.firstName} {item.lastName}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </nav>
      <Switch>
        <Route exact path='/' ><h2 className="app__placeholder-headline" >Выберите пункт из списка слева</h2></Route>
        <Route path='/users/:id' component={User} />
        <Route path='/dashboard/:id?' component={UsersDashboard} />
      </Switch>
    </div>
  );
}

export default App;
