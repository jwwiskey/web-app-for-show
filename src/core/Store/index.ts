import ActionTypes from './actionTypes';

export const initState: object = (() => {
  const store: string | null = localStorage.getItem('testAppData');

  if (!store) return {};

  return JSON.parse(store);
})();

export default function reducer(state: any, action: any) {
  if (!ActionTypes.hasOwnProperty(action.type)) return state;

  const callBack = ActionTypes[action.type];

  return callBack(state, action);
}