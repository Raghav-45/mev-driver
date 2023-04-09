import React from 'react';
import css from './ToDos.module.css';

export const ToDos = ({ toDos }) => {
  if (toDos === undefined || !toDos.length) return null;

  return (
    <div className={css.todos}>
      {toDos.map((toDo, index) => (
        <span
          nav-selectable="true"
          key={index}
          className={`${css.todo}`}
          style={{background: 'rgb(147 197 253)'}}
        >
          {toDo.pickup_loc} - {toDo.drop_loc}
        </span>
      ))}
    </div>
  )
}

