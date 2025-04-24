// 여러 공백, 줄바꿈 → 하나의 공백으로
const normalizeText = (text) => text.replace(/\s+/g, ' ').trim();

// 불필요 태그 무시
const getMeaningfulChildren = (node) =>
  Array.from(node.childNodes).filter((child) => {
    if (child.nodeType === Node.TEXT_NODE) {
      return child.textContent.trim() !== '';
    }
    if (child.nodeType === Node.ELEMENT_NODE && child.nodeName === 'TBODY') {
      return false;
    }
    return true;
  });

const compareDOM = (nodeA, nodeB) => {
  // 노드 타입 다르면 다름
  if (nodeA.nodeType !== nodeB.nodeType) return false;

  // 텍스트 노드면 내용 비교
  if (nodeA.nodeType === Node.TEXT_NODE) {
    return (
      normalizeText(nodeA.textContent) === normalizeText(nodeB.textContent)
    );
  }

  // 태그 이름 다르면 다름
  if (nodeA.nodeName !== nodeB.nodeName) return false;

  // 속성 비교 (name=value 기준)
  const attrA = Array.from(nodeA.attributes).map((attr) => ({
    name: attr.name,
    value: attr.value.trim(),
  }));
  const attrB = Array.from(nodeB.attributes).map((attr) => ({
    name: attr.name,
    value: attr.value.trim(),
  }));

  if (attrA.length !== attrB.length) return false;

  // 속성 이름과 값이 모두 일치하는지 확인
  const attrSetA = new Set(attrA.map((attr) => `${attr.name}=${attr.value}`));
  const attrSetB = new Set(attrB.map((attr) => `${attr.name}=${attr.value}`));

  if (attrSetA.size !== attrSetB.size) return false;

  for (const attr of attrSetA) {
    if (!attrSetB.has(attr)) return false;
  }

  const childrenA = getMeaningfulChildren(nodeA);
  const childrenB = getMeaningfulChildren(nodeB);

  // 자식 노드 개수 다르면 다름
  if (childrenA.length !== childrenB.length) return false;

  // 모든 자식 노드 재귀적으로 비교
  for (let i = 0; i < childrenA.length; i++) {
    if (!compareDOM(childrenA[i], childrenB[i])) {
      return false;
    }
  }

  return true;
};

export default compareDOM;
