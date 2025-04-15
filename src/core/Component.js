import { observable, observe } from './Observer';

export default class Component {
  constructor($el, props = {}) {
    this.$el = $el;
    this.props = props;
    this.state = observable(this.initState());

    // state가 바뀌면 자동 렌더
    observe(() => {
      this.render();
    });
  }

  initState() {
    return {};
  }

  template() {
    return '';
  }

  render() {
    this.$el.innerHTML = this.template();

    requestAnimationFrame(() => {
      this.setEvent();
      this.mounted();
    });
  }

  setEvent() {}

  mounted() {}

  setState(newState) {
    for (const key in newState) {
      if (key in this.state) {
        this.state[key] = newState[key];
      }
    }
  }

  // 이벤트 연결을 위한 헬퍼 함수
  addEvent(eventType, selector, callback) {
    if (!this._eventMap) this._eventMap = {};

    const key = `${eventType}_${selector}`;
    if (this._eventMap[key]) return; // 이미 등록된 이벤트면 return

    const listener = (event) => {
      const target = event.target.closest(selector);
      if (target) {
        callback(event);
      }
    };

    this._eventMap[key] = listener;
    this.$el.addEventListener(eventType, listener);
  }
}
