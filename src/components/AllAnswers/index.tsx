import React, { useState } from 'react';
import Styles from './all-answers.module.scss';
import Ok from '../../assets/images/ok.png';
import No from '../../assets/images/no.png';
import Modal from '../Modal';

type Props = {
  decisions: any,
  currentUserId: any,
  onChange: Function
};

const AllAnswers = ({ decisions, currentUserId, onChange }: Props) => {
  const getFilteredDecisions = () => !!decisions && !!decisions.length
    ? decisions.filter((item: any) => item.active)
    : [];

  const [ filteredDecisions, setFilteredDecisions ] = useState(getFilteredDecisions());
  const [ decision, setDecision ] = useState({name: 'someone'});
  const [ isModal, setIsModal ] = useState(false);

  const searchDecisions = (event: React.FormEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
    const searchData = getFilteredDecisions().filter((item: any) => (
      item.name.match(new RegExp(value, 'ig')))
    );

    setFilteredDecisions(searchData);
  };

  const onDecisionClick = (decisionHandle: any) => {
    if (decisionHandle.id === currentUserId) {
      setDecision(decisionHandle);
      setIsModal(true);
    }
  };

  const onConfirmHandler = () => {
    onChange({decision: '0'});
    setIsModal(false);
    setFilteredDecisions(getFilteredDecisions().filter((item: any) => item.id !== currentUserId));
  };

  return (
    <div className={Styles['all-answers']}>
      {isModal && (
        <Modal
          text={`I am, ${decision.name}, want to refuse my decision and remove my answer!`}
          onCancel={() => setIsModal(false)}
          onConfirm={onConfirmHandler}
        />
      )}
      <div className={Styles['all-answers__search']}>
        <span>🔍</span>
        <input type="text" onInput={searchDecisions} />
      </div>
      {filteredDecisions.map((item: any) => (
        <div className={Styles['all-answers__decision']} key={item.id} onClick={() => onDecisionClick(item)}>
          <img src={item.avatar} alt={item.name} />
          <p
            className={
              `${Styles['all-answers__decision-item']} ${item.id === currentUserId && Styles['all-answers__decision-item_active']}`
            }
          >
            {item.name}
          </p>
          <img src={item.decision === 'Won\'t go' ? No : Ok} alt="decision" />
          {item.decision !== 'Won\'t go' && (
            <p
              className={
                `${Styles['all-answers__decision-item']} ${item.id === currentUserId && Styles['all-answers__decision-item_active']}`
              }
            >
              {!!(+item.followers) && item.followers}
            </p>
          )}
        </div>
      ))}
    </div>
  );
};

export default AllAnswers;