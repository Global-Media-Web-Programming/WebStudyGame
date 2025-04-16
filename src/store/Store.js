import { observable } from '../core/Observer';
import { getItem, setItem } from '../utils/storage';

// 초기 상태
const initialState = {
  htmlLevel: 1,
  cssLevel: 1,
  isHtmlSolved: false,
  isCssSolved: false,
};

// localStorage에 저장된 상태가 있으면 사용
const storedState = getItem('gameState');
const state = observable(storedState || initialState);

const Store = {
  state,
  // 상태 변경 시 localStorage에 저장
  setState(newState) {
    Object.assign(this.state, newState);
    setItem('gameState', this.state);
  },
};

export default Store;
