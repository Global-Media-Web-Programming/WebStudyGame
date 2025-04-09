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
    this.$el.addEventListener(eventType, (event) => {
      const target = event.target.closest(selector);
      if (target) {
        callback(event);
      }
    });
  }
}
