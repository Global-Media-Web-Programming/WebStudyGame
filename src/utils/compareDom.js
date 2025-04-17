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
  const attrA = nodeA.attributes;
  const attrB = nodeB.attributes;
  if (attrA.length !== attrB.length) return false;

  for (let i = 0; i < attrA.length; i++) {
    const attrName = attrA[i].name;
    if (attrB.getNamedItem(attrName)?.value !== attrA[i].value) {
      return false;
    }
  }

  const childrenA = getMeaningfulChildren(nodeA);
  const childrenB = getMeaningfulChildren(nodeB);

  // 자식 노드 개수 다르면 다름
  if (childrenA.length !== childrenB.length) return false;

  // 모든 자식 노드 재귀적으로 비교
  for (let i = 0; i < nodeA.childNodes.length; i++) {
    if (!compareDOM(nodeA.childNodes[i], nodeB.childNodes[i])) {
      return false;
    }
  }

  return true;
};

export default compareDOM;
