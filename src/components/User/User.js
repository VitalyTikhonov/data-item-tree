import React, { useState, useEffect, useRef } from 'react';
import './User.scss';
import { Route, Switch, NavLink, useRouteMatch, useParams } from "react-router-dom";
import { verbalizeBoolean, saveToLS, getFromLS } from '../../utils';
import { v4 as getUid } from 'uuid';
import { useSelector, useDispatch } from 'react-redux';
import { setUsersData, selectUsersData } from '../../app/userDataSlice';
import { categories, blankUser } from '../../data/data-formation';

// const dataToRender = getFromLS()

export function User() {
  const dispatch = useDispatch()
  const usersData = useSelector(selectUsersData)

  const requestedId = useParams().id
  const { url } = useRouteMatch();

  const user = usersData.find((item) => item.id === requestedId) || blankUser
  // const [user, setUser] = useState({})
  const {
    id,
    email,
    gender,
    firstName,
    lastName,
    category,
    isEmailVerified,
    isBanned,
    requestedDeletion,
    phone,
    doctorNotes,
  } = user

  // const editableFieldRef = useRef(null)

  // function handleClick(event) {
  //   event.target.setAttribute("contentEditable", "")
  // }

  // function handleBlur(event) {
  //   event.target.removeAttribute("contentEditable")
  // }

  function handleChange({ target }) {
    const fieldId = target.id
    let { value } = target
    if (fieldId === "category") {
      value = categories.find((item) => item.id === value)
    }
    console.log({value, fieldId})
    const newUsersData = usersData.map((item) => item.id === id ? { ...user, [fieldId]: value } : item)
    console.log({newUsersData})
    dispatch(setUsersData(newUsersData))
  }

  // function handleSaveButtonClick() {
  // const newData = dataToRender.map((item) => item.id === id ? { ...user, doctorNotes: editableFieldRef.current.textContent } : item)
  // saveToLS(newData)
  // }

  // useEffect(() => {

  // }, [usersData])

  return (
    <div className="user" >
      {user ? (
        <>
          <h3 className="user__headline" >{firstName} {lastName}</h3>

          <ul className="user__tabs list-unstyling" >
            <li className="user__tab" >
              <NavLink
                className="user__tab-link link-unstyling"
                exact to={`${url}`}
                activeClassName="user__tab-link_active"
              >
                Личные данные
              </NavLink>
            </li>

            <li className="user__tab" >
              <NavLink
                className="user__tab-link link-unstyling"
                to={`${url}/meta`}
                activeClassName="user__tab-link_active"
              >
                Данные аккаунта
              </NavLink>
            </li>
          </ul>

          <table className="user__data" >
            <tbody >
              <Switch >
                <Route exact path={`${url}`} >
                  <tr ><th className="user__row-header" >Имя</th><td className="user__cell" >{firstName}</td></tr>
                  <tr ><th className="user__row-header" >Фамилия</th><td className="user__cell" >{lastName}</td></tr>
                  <tr ><th className="user__row-header" >Пол</th><td className="user__cell" >{gender}</td></tr>
                  <tr ><th className="user__row-header" >Эл. почта</th><td className="user__cell" >{email}</td></tr>
                  <tr ><th className="user__row-header" >Телефон</th><td className="user__cell" >{phone}</td></tr>
                  <tr >
                    <th className="user__row-header" >Примечания</th>

                    <td className="user__cell" >
                      <textarea className="user__text-area" id="doctorNotes" onChange={handleChange} value={doctorNotes} />
                    </td>
                  </tr>
                </Route>

                <Route path={`${url}/meta`} >
                  <tr ><th className="user__row-header" >Идентификатор</th><td className="user__cell" >{id}</td></tr>
                  <tr >
                    <th className="user__row-header" >Уровень доступа</th>

                    <td className="user__cell" >
                      <select className="user__dropdown" id="category" onChange={handleChange} value={category.id} >
                        {categories.map((item) => <option value={item.id} key={getUid()} >{item.caption}</option>)} {/* selected={item.id === category.id}  */}
                      </select>
                    </td>
                  </tr>
                  <tr ><th className="user__row-header" >Эл. почта подтверждена?</th><td className="user__cell" >{verbalizeBoolean(isEmailVerified)}</td></tr>
                  <tr ><th className="user__row-header" >Заблокирован?</th><td className="user__cell" >{verbalizeBoolean(isBanned)}</td></tr> {/* id="isBanned"  */}
                  <tr ><th className="user__row-header" >Удалил аккаунт?</th><td className="user__cell" >{verbalizeBoolean(requestedDeletion)}</td></tr>
                </Route>
              </Switch>

            </tbody>
          </table>

          {/* <button className="user__save-button" type="button" onClick={handleSaveButtonClick} >Сохранить</button> */}
        </>
      ) : (
        <h2 className="user__headline user__headline_not-found" >Пользователь не найден</h2>
      )}
    </div>
  )
}
