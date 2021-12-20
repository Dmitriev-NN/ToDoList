import React from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

export const Notes = ({ notes, onRemove }) => {
  return (
    <TransitionGroup component='ul' className='list-group'>
      {notes.map((note) => (
        <CSSTransition key={note.id} classNames={'note'} timeout={800}>
          <li className='list-group-item note'>
            <strong className='content'>{note.title}</strong>

            <div className='infoBlock'>
              <small>{note.date}</small>

              <button
                type='button'
                className='btn btn-danger btn-sm'
                onClick={() => onRemove(note.id)}
              >
                &times;
              </button>
            </div>
          </li>
        </CSSTransition>
      ))}
    </TransitionGroup>
  );
};
