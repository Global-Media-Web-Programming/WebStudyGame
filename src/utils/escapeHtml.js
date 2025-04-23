/**
 * HTML 특수문자를 이스케이프하고 코드 블록을 하이라이팅
 * @param {string} content - 변환할 텍스트
 * @param {string} [className='keyword'] - 백틱 코드 블록에 적용할 클래스명
 * @returns {string} 변환된 HTML 문자열
 */
const escapeHtml = (content, className = 'keyword') => {
  return content
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
    .replace(/`([^`]+)`/g, `<span class="${className}">$1</span>`);
};

export default escapeHtml;
