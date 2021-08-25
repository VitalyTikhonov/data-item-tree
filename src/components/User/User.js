import React, { useEffect, useRef } from 'react';
import './User.scss';
import { Route, Switch, NavLink, useRouteMatch, useParams } from "react-router-dom";
import { verbalizeBoolean, saveToLS, getFromLS } from '../../utils';
import { v4 as getUid } from 'uuid';
import { useSelector, useDispatch } from 'react-redux';
import { setUsersData, selectUsersData } from '../../app/userDataSlice';

// const dataToRender = getFromLS()

export function User() {
  // const dispatch = useDispatch()
  const usersData = useSelector(selectUsersData)

  const requestedId = useParams().id
  const { url } = useRouteMatch();
  const user = usersData.find((item) => item.id === requestedId)

  /* Отказался от деструктуризации, чтобы обработать ошибку, которая возникает, если задать в адресной строке несуществующий идентификатор. */
  const id = user?.id
  const email = user?.email
  const gender = user?.gender
  const firstName = user?.firstName
  const lastName = user?.lastName
  const category = user?.category
  const isEmailVerified = user?.isEmailVerified
  const isBanned = user?.isBanned
  const requestedDeletion = user?.requestedDeletion
  const phone = user?.phone
  const doctorNotes = user?.doctorNotes

  const editableFieldRef = useRef(null)

  function handleClick(event) {
    event.target.setAttribute("contentEditable", "")
  }

  function handleBlur(event) {
    event.target.removeAttribute("contentEditable")
  }

  // function handleChange(event) {
  //   const text = event.target.textContent
  //   const newData = dataToRender.map((item) => item.id === id ? { ...user, doctorNotes: text } : item)
  //   saveToLS(newData)
  // }

  function handleSaveButtonClick() {
    // const newData = dataToRender.map((item) => item.id === id ? { ...user, doctorNotes: editableFieldRef.current.textContent } : item)
    // saveToLS(newData)
  }

  // useEffect(() => {
  //   console.log({path, url})
  //   console.log({requestedId})
  // }, [])

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

                    <td
                      className="user__cell"
                      onClick={handleClick}
                      onBlur={handleBlur}
                      // onChange={handleChange}
                      ref={editableFieldRef}
                    >
                      {doctorNotes}
                    </td>
                  </tr>
                </Route>

                <Route path={`${url}/meta`} >
                  <tr ><th className="user__row-header" >Идентификатор</th><td className="user__cell" >{id}</td></tr>
                  <tr ><th className="user__row-header" >Уровень доступа</th><td className="user__cell" >{category.caption}</td></tr>
                  <tr ><th className="user__row-header" >Эл. почта подтверждена?</th><td className="user__cell" >{verbalizeBoolean(isEmailVerified)}</td></tr>
                  <tr ><th className="user__row-header" >Заблокирован?</th><td className="user__cell" >{verbalizeBoolean(isBanned)}</td></tr>
                  <tr ><th className="user__row-header" >Удалил аккаунт?</th><td className="user__cell" >{verbalizeBoolean(requestedDeletion)}</td></tr>
                </Route>
              </Switch>

            </tbody>
          </table>

          <button className="user__save-button" type="button" onClick={handleSaveButtonClick} >Сохранить</button>
        </>
      ) : (
        <h2 className="user__headline user__headline_not-found" >Пользователь не найден</h2>
      )}
    </div>
  )
}
