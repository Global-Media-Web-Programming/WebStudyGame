import { observable } from '../core/Observer';

const Store = {
  state: observable({
    // 게임 풀이 여부
    isHtmlSolved: false,
    isCSSSolved: false,
    // 문제 단계 - 푼 문제
    htmlLevel: 0,
    cssLevel: 0,
  }),
};

export default Store;
