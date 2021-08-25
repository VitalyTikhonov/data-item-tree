import React, { useEffect } from 'react';
import { Route, Switch, NavLink } from "react-router-dom";
import { v4 as getUid } from 'uuid';
import { useSelector, useDispatch } from 'react-redux';
import { setUsersData, selectUsersData } from './app/userDataSlice';

import './App.scss';
import { User } from './components/User/User';
import { UsersDashboard } from './components/UsersDashboard/UsersDashboard';
import { categories } from './data/data-formation';
import { download } from './utils';

import data from './data/data.json';

function App() {
  const dispatch = useDispatch()
  const usersData = useSelector(selectUsersData)

  function handleUpload({ target }) {
    // console.log('typeof target.value', typeof target.value)
    // console.log('target.files[0]', target.files[0])
    // console.log('typeof target.files[0]', typeof target.files[0])
    // console.log('target.files.item(0)', target.files.item(0))
    // console.log('typeof target.files.item(0)', typeof target.files.item(0))
    const file = target.files[0]
    const fileReader = new FileReader()
    fileReader.onload = (e) => {
      // console.log('fileReader.onload', e.target.result)
      dispatch(setUsersData(JSON.parse(e.target.result)))
    }
    fileReader.readAsText(file);
  }

  function handleDownloadClick() {
    download(JSON.stringify(usersData), "users-data.json")
  }

  useEffect(() => {
    dispatch(setUsersData(data))
  }, [])

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
                {usersData.filter((user) => user.category.id === category.id).map((item) => (
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
        <Route exact path='/' >
          <section className="home" >
            <h2 className="home__headline" >Управление данными пользователей</h2>
            <div className="home__controls" >
              <label className="button button_label" htmlFor="upload-input" >
                Загрузить
                <input type="file" id="upload-input" hidden onChange={handleUpload} />
              </label>
              {/* <button className="button" type="file" onClick={handleUploadClick} >Загрузить</button> */}
              <button className="button" type="button" onClick={handleDownloadClick} >Скачать</button>
            </div>
          </section>
        </Route>
        <Route path='/users/:id' ><User /></Route>
        {/* <Route path='/users/:id' component={User} /> */}
        <Route path='/dashboard/:id?' component={UsersDashboard} />
      </Switch>
    </div>
  );
}

export default App;
