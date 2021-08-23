import React, { useState } from 'react';
import './User.scss';

const dataToRender = JSON.parse(localStorage.getItem('patients'))

export function User({ match }) {
  const user = dataToRender.find((item) => item.id === match.params.id)

  const {
    id,
    email,
    gender,
    firstName,
    lastName,
    isAdmin,
    isEmailVerified,
    isBanned,
    requestedDeletion,
    phone,
    doctorNotes,
  } = user;

  function verbalize(boolean) {
    return boolean ?  "да" : "нет"
  }

  return (
    <div className="user" >
      {user ? (
        <>
          <h3 className="user__headline" >{firstName} {lastName}</h3>

          <table className="user__data" >
            <tbody >
              <tr ><th className="user__row-header" >Имя</th><td className="user__cell" >{firstName}</td></tr>
              <tr ><th className="user__row-header" >Фамилия</th><td className="user__cell" >{lastName}</td></tr>
              <tr ><th className="user__row-header" >Пол</th><td className="user__cell" >{gender}</td></tr>
              <tr ><th className="user__row-header" >Идентификатор</th><td className="user__cell" >{id}</td></tr>
              <tr ><th className="user__row-header" >Уровень доступа</th><td className="user__cell" >{isAdmin ? "администратор" : "пользователь"}</td></tr>
              <tr ><th className="user__row-header" >Эл. почта</th><td className="user__cell" >{email}</td></tr>
              <tr ><th className="user__row-header" >Эл. почта подтверждена?</th><td className="user__cell" >{verbalize(isEmailVerified)}</td></tr>
              <tr ><th className="user__row-header" >Заблокирован?</th><td className="user__cell" >{verbalize(isEmailVerified)}</td></tr>
              <tr ><th className="user__row-header" >Удалил аккаунт?</th><td className="user__cell" >{verbalize(isEmailVerified)}</td></tr>
              <tr ><th className="user__row-header" >Телефон</th><td className="user__cell" >{phone}</td></tr>
              <tr ><th className="user__row-header" >Примечания</th><td className="user__cell" >{doctorNotes}</td></tr>
            </tbody>
          </table>
        </>
      ) : (
        <h2 className="user__headline user__headline_not-found" >Пользователь не найден</h2>
      )}
    </div>
  )
}
