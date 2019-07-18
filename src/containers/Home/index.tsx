import React, { useReducer, useState, useEffect } from 'react';
import Styles from './home.module.scss';
import AuthButton from '../../components/AuthButton';
import MyAnswer from '../../components/MyAnswer';
import AllAnswers from '../../components/AllAnswers';
import reducer, { initState } from '../../core/Store';

const getDecisonData = (state: any) => {
  return !!state.decisions && !!state.decisions.length
    ? state.decisions.find((item: any) => item.id === state.currentUserId)
    : {};
};

const Home = () => {
  const [ state, dispatch ] = useReducer(reducer, initState);
  const [ currentTab, setCurrenTab ] = useState(0);

  const [ decisionDataState, setDecisionData ] = useState(getDecisonData(state));

  const onTabChange = (tab: number) => {
    setDecisionData(getDecisonData(state));
    setCurrenTab(tab);
  };

  const authResponse = (response: any) => {
    dispatch({
      type: 'LOGIN',
      data: response
    });
  };

  const onMyAnswerChange = (data: any) => {
    setDecisionData({
      ...decisionDataState,
      decision: data.decision,
      followers: data.followers
    });
  };

  const sendSave = (data: any) => {
    dispatch({
      type: 'MY_ANSWER_CHANGE',
      data
    });
  };

  const onSave = () => {
    document.body.style.opacity = '0.5';

    if (!currentTab) {
      sendSave(decisionDataState);
    }

    document.body.style.opacity = '1';
  };

  const logout = () => {
    dispatch({type: 'LOGOUT'});
    setCurrenTab(0);
  };

  useEffect(() => {
    setDecisionData(getDecisonData(state));
    console.log(getDecisonData(state))
  }, [state.currentUserId]);

  const decisionData = !decisionDataState ? getDecisonData(state) : decisionDataState;

  return (
    <div className={Styles['home']}>
      <div className={Styles['home__body']}>
        {!state.currentUserId && (
          <AuthButton
            theme="facebook"
            onClick={authResponse}
            className={Styles['home__auth-button']}
          />
        )}
        {state.currentUserId && (
          <React.Fragment>
            <div className={Styles['home__controls']}>
              <div
                className={`${Styles['home__tab']} ${!currentTab ? Styles['home__tab_active'] : ''}`}
                onClick={() => onTabChange(0)}
              >
                My answer
              </div>
              <div
                className={`${Styles['home__tab']} ${currentTab ? Styles['home__tab_active'] : ''}`}
                onClick={() => onTabChange(1)}
              >
                All answers
              </div>
            </div>
            <div className={Styles['home__container']}>
              {!currentTab && (
                <MyAnswer
                  name={state.name}
                  decision={!!decisionData ? decisionData.decision : ''}
                  followers={!!decisionData ? decisionData.followers : ''}
                  onChange={onMyAnswerChange}
                />
              )}
              {!!currentTab && (
                <AllAnswers
                  decisions={state.decisions}
                  currentUserId={state.currentUserId}
                  onChange={sendSave}
                />
              )}
              <div className={Styles['home__footer-controls']}>
                <button onClick={logout} className={Styles['home__logout']}>Log Out</button>
                <button onClick={onSave}>Send</button>
              </div>
            </div>
          </React.Fragment>
        )}
      </div>
    </div>
  );
};

export default Home;