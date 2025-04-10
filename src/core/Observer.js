let currentObserver = null;
let queue = new Set();
let isBatching = false;

export const observe = (fn) => {
  currentObserver = fn;
  fn();
  currentObserver = null;
};

// 상태가 여러 번 바뀌어도 한 번만 observe 수행
const batchNotify = () => {
  if (!isBatching) {
    isBatching = true;
    // 이벤트 루프 끝나면 실행
    Promise.resolve().then(() => {
      queue.forEach((fn) => fn());
      queue.clear();
      isBatching = false;
    });
  }
};

const makeReactive = (obj) => {
  if (typeof obj !== 'object' || obj === null) return obj;

  if (Array.isArray(obj)) {
    obj.forEach((item, idx) => {
      obj[idx] = makeReactive(item); // 배열 안 아이템도 반응형 처리
    });

    // 배열의 변경을 감지하기 위해 원본 메서드 오버라이드
    const arrayMethods = [
      'push',
      'pop',
      'shift',
      'unshift',
      'splice',
      'sort',
      'reverse',
    ];

    arrayMethods.forEach((method) => {
      const original = obj[method];
      Object.defineProperty(obj, method, {
        configurable: true,
        enumerable: false,
        writable: true,
        value: function (...args) {
          const result = original.apply(this, args);
          if (obj.__observers) {
            obj.__observers.forEach((fn) => {
              queue.add(fn); // observer 예약
              batchNotify(); // 실행 예약
            });
          }
          return result;
        },
      });
    });
  }

  // 객체 감시
  const observers = new Set();
  Object.defineProperty(obj, '__observers', {
    value: observers,
    enumerable: false,
  });

  for (const key in obj) {
    let _value = makeReactive(obj[key]); // 깊은 감시

    Object.defineProperty(obj, key, {
      get() {
        if (currentObserver) observers.add(currentObserver);
        return _value;
      },
      set(newVal) {
        if (_value !== newVal) {
          _value = makeReactive(newVal); // 새로운 값도 감시
          observers.forEach((fn) => {
            queue.add(fn);
            batchNotify();
          });
        }
      },
    });
  }

  return obj;
};

export const observable = (obj) => makeReactive(obj);
