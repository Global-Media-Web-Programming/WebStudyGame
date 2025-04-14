const compareDOM = (nodeA, nodeB) => {
  // 노드 타입 다르면 다름
  if (nodeA.nodeType !== nodeB.nodeType) return false;

  // 텍스트 노드면 내용 비교
  if (nodeA.nodeType === Node.TEXT_NODE) {
    return nodeA.textContent.trim() === nodeB.textContent.trim();
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

  // 자식 노드 개수 다르면 다름
  if (nodeA.childNodes.length !== nodeB.childNodes.length) return false;

  // 모든 자식 노드 재귀적으로 비교
  for (let i = 0; i < nodeA.childNodes.length; i++) {
    if (!compareDOM(nodeA.childNodes[i], nodeB.childNodes[i])) {
      return false;
    }
  }

  return true;
};

export default compareDOM;
