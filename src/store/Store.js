import { observable } from '../core/Observer';

const Store = {
  state: observable({
    // 게임 풀이 여부
    isHtmlSolved: false,
    isCSSSolved: false,
    // 문제 단계 - 푼 문제
    htmlLevel: 1,
    cssLevel: 1,
  }),
};

export default Store;
