const updateLocalStore = (store: any): void => {
  localStorage.setItem('testAppData', JSON.stringify(store));
};

export const login = (state: any, { data }: any) => {
  if (!data) return state;
  const newState = {
    ...state,
    currentUserId: data.id,
    avatar: !!data.picture ? data.picture.data.url : '',
    name: data.name
  };

  updateLocalStore(newState);

  return newState;
};

export const changeMyAnswer = (state: any, { data }: any ) => {
  const decisionData = {
    name: state.name,
    avatar: state.avatar,
    active: !data.decision || data.decision !== '0',
    decision: !!data.decision ? data.decision : '0',
    followers: !!data.followers ? data.followers : '0'
  };

  let decisions: Array<any> = [];

  if (!data.decision || data.decision === '0') {
    decisions = !!state.decisions
      ? state.decisions.filter((item: any) => item.id !== state.currentUserId)
      : [];
  } else {
    decisions = !!state.decisions && state.decisions.length
      ? state.decisions.map((item: any) => {
        if (item.id === state.currentUserId) {
          item = {
            ...item,
            ...decisionData
          };
        }

        return item;
      })
      : [{
        ...decisionData,
        id: state.currentUserId
      }];
  }

  const newState = {
    ...state,
    decisions
  };

  updateLocalStore(newState);

  return newState;
};

export const logout = (state: any, action: any) => {
  const newState = {
    ...state,
    currentUserId: '',
    avatar: '',
    name: ''
  };

  updateLocalStore(newState);

  return newState;
};