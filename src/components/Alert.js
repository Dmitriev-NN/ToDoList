import React, { useContext } from 'react';
import { AlertContext } from '../context/alert/alertContext';
import { CSSTransition } from 'react-transition-group';

export const Alert = () => {
  const { alert, hide } = useContext(AlertContext);

  //   if (!alert.visible) return null;
  //с добавление CSSTransition необходимость в проверке отпала

  return (
    <CSSTransition
      in={alert.visible}
      timeout={{ enter: 500, exit: 350 }}
      classNames={'alert'}
      mountOnEnter
      unmountOnExit
    >
      <div
        className={`alert alert-${alert.type || 'warning'} alert-dismissible`}
      >
        {/* <strong>Внимание!</strong> */}
        {alert.text}
        <button
          onClick={hide}
          type='button'
          className='btn-close'
          aria-label='Close'
        ></button>
        {/* <span aria-hidden='true'></span>Удаление этой строки не повлияло на функциональность. Пока не понял зачем её добавили. */}
      </div>
    </CSSTransition>
  );
};
