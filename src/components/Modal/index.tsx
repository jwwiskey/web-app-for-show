import React, { useEffect, useMemo } from 'react';
import ReactDOM from 'react-dom';
import Styles from './modal.module.scss';

type Props = {
  text: any,
  onCancel: Function,
  onConfirm: Function
};

const Modal = ({ text, onCancel, onConfirm }: Props) => {
  const root: HTMLDivElement = useMemo(() => document.createElement('div'), []);
  root.className = Styles['modal'];

  useEffect(() => {
    const { body } = document;
    if (!!body) {
      body.appendChild(root);

      return () => {
        body.removeChild(root);
      };
    }
  }, []);

  return ReactDOM.createPortal(
    <div className={Styles['modal__container']}>
      <p>{text}</p>
      <div className={Styles['modal__controls']}>
        <button
          className={`${Styles['modal__control']} ${Styles['modal__control_negative']}`} onClick={() => onCancel()}
        >
          No
        </button>
        <button
          className={`${Styles['modal__control']} ${Styles['modal__control_positive']}`} onClick={() => onConfirm()}
        >
          Yes
        </button>
      </div>
    </div>,
    root
  );
};

export default Modal;