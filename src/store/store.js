import { observable } from './core/observer.js';

export const scoreStore = {
  state: observable({
    htmlScore: 0,
    cssScore: 0,
  }),

  setState(newState) {
    for (const [key, value] of Object.entries(newState)) {
      if (!this.state[key]) continue;
      this.state[key] = value;
    }
  },
};
