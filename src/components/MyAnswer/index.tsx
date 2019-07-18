import React, { useState, useEffect } from 'react';
import Styles from './my-answer.module.scss';

type Props = {
  name: any,
  decision: any,
  followers: any,
  onChange: Function
};

const MyAnswer = ({name, decision, followers, onChange = () => {} }: Props) => {
  const [ decisionValue, setDecisionValue ] = useState(!!decision ? decision : '0');
  const [ followerValue, setFollowerValue ] = useState(!!followers ? followers : '0');

  useEffect(() => {
    if (decisionValue === '0') setFollowerValue('0');
    if (+followerValue < 0) setFollowerValue('0');

    onChange({
      decision: decisionValue,
      followers: followerValue
    });
  }, [ decisionValue, followerValue ]);

  return (
    <div className={Styles['my-answer']}>
      <h2>Me</h2>
      <div className={Styles['my-answer__name-box']}>{name} (Name, Surname)</div>
      <div className={Styles['my-answer__with-me-box']}>
        <h2>With me</h2>
        <input type="number" value={followerValue} onChange={event => setFollowerValue(event.currentTarget.value)} />
      </div>
      <select defaultValue={decisionValue} onChange={event => setDecisionValue(event.currentTarget.value)}>
        <option value="0">Need to decide</option>
        <option value="Of Course will go">Of Course will go</option>
        <option value="Won't go">Won't go</option>
      </select>
    </div>
  );
};

export default MyAnswer;