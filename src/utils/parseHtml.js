const parseHTML = (htmlString) => {
  // 태그 닫힘 검사 - 브라우저의 자동 수정 막음
  const openTags = [];
  const tagRegex = /<\/?([a-z][a-z0-9]*)\b[^>]*>/gi;
  let match;

  while ((match = tagRegex.exec(htmlString)) !== null) {
    const tag = match[1].toLowerCase();
    if (match[0].startsWith('</')) {
      // 닫는 태그
      if (openTags.length === 0 || openTags.pop() !== tag) {
        const dummy = document.createElement('div');
        return dummy;
      }
    } else if (!match[0].endsWith('/>')) {
      // 여는 태그
      openTags.push(tag);
    }
  }

  if (openTags.length > 0) {
    // 닫히지 않은 태그가 있을 경우에도 dummy 반환
    const dummy = document.createElement('div');
    return dummy;
  }

  // 유효한 경우에만 파싱
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, 'text/html');

  // 주석 제거
  const iterator = document.createNodeIterator(
    doc,
    NodeFilter.SHOW_COMMENT,
    null,
  );
  let currentNode;
  while ((currentNode = iterator.nextNode())) {
    currentNode.parentNode.removeChild(currentNode);
  }

  return doc.body;
};

export default parseHTML;
