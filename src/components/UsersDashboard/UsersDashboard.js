import React from 'react';
import './UsersDashboard.scss';
import { categories } from '../../data/data-formation';
import { Link } from "react-router-dom";
import { v4 as getUid } from 'uuid';

export function UsersDashboard({ match }) {
  const data = JSON.parse(localStorage.getItem('users'))
  const displayedCategoryId = match?.params?.id
  const dataToRender = displayedCategoryId ? data.filter((item) => item.category.id === displayedCategoryId) : data

  return (
    <div className="dashboard" >
      <h3 className="dashboard__headline" >{displayedCategoryId ? categories.find((item) => item.id === displayedCategoryId).caption : "Пользователи"}</h3>

      <table className="dashboard__data" >
        <tbody >
          <tr >
            <th className="dashboard__row-header" >Имя</th>
            <th className="dashboard__row-header" >Фамилия</th>
            <th className="dashboard__row-header" >Пол</th>
            <th className="dashboard__row-header" >Уровень доступа</th>
            <th className="dashboard__row-header" >Эл. почта</th>
            <th className="dashboard__row-header" >Телефон</th>
          </tr>

          {dataToRender.map((item) => (
            <tr key={getUid()} >
              <td className="dashboard__cell" ><Link className="link-unstyling" to={`/users/${item.id}`} >{item.firstName}</Link></td>
              <td className="dashboard__cell" ><Link className="link-unstyling" to={`/users/${item.id}`} >{item.lastName}</Link></td>
              <td className="dashboard__cell" ><Link className="link-unstyling" to={`/users/${item.id}`} >{item.gender}</Link></td>
              <td className="dashboard__cell" ><Link className="link-unstyling" to={`/users/${item.id}`} >{item.category.caption}</Link></td>
              <td className="dashboard__cell" ><Link className="link-unstyling" to={`/users/${item.id}`} >{item.email}</Link></td>
              <td className="dashboard__cell" ><Link className="link-unstyling" to={`/users/${item.id}`} >{item.phone}</Link></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
