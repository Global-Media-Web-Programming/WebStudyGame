import Component from '../../../core/Component';
import styles from './GameResultPage.module.css';

export default class GameResultPage extends Component {
  template() {
    const { language } = this.props;

    // HTML 페이지 콘텐츠
    if (language === 'html') {
      return `
        <section class="${styles.container}">
          <div class="${styles.header}">
            <div class="${styles.labelLine}">
              <span class="${styles.icon}">&lt;/&gt;</span>
              <span class="${styles.label}">HTML</span>
            </div>
            <hr class="${styles.divider}" />
          </div>

          <h1 class="${styles.title}">축하합니다!</h1>
          <p class="${styles.subtitle}">모든 버그를 해결하셨습니다.</p>

          <p class="${styles.description}">
            <strong class="${styles.bold}">탐정 수첩</strong>에 오늘 해결한 버그가 기록됐으니 다음 사건을 위해 꼼꼼히 읽어보세요!
          </p>

          <div class="${styles.noteBox}">
            <p class="${styles.date}">2025. 04. 10. 탐정 수첩</p>

            <h3 class="${styles.sectionTitle}">Case #1: 제목을 나타내는 HTML 태그</h3>
            <ul class="${styles.tagList}">
              <li><code>&lt;h1&gt;</code>: 가장 중요한 제목 (보통 페이지 메인 제목)</li>
              <li><code>&lt;h2&gt;</code>: 부제목 또는 섹션 제목</li>
              <li><code>&lt;h3&gt;</code>: 하위 섹션 제목</li>
              <li><code>&lt;h4&gt;~&lt;h6&gt;</code>: 점점 더 작은 중요도의 제목</li>
            </ul>

            <div class="${styles.codeExample}">
              <code><span class="${styles.codeTag}">&lt;h1&gt;</span>이것은 가장 중요한 제목입니다<span class="${styles.codeTag}">&lt;/h1&gt;</span></code><br />
              <code><span class="${styles.codeTag}">&lt;h2&gt;</span>이것은 두 번째로 중요한 제목입니다<span class="${styles.codeTag}">&lt;/h2&gt;</span></code><br />
              <code><span class="${styles.codeTag}">&lt;h3&gt;</span>이것은 세 번째 수준의 제목입니다<span class="${styles.codeTag}">&lt;/h3&gt;</span></code>
            </div>

            <p class="${styles.tip}">보통 한 페이지에 <strong>&lt;h1&gt;</strong>은 하나만 사용하고, SEO와 접근성을 위해 순서대로 사용하는 것이 좋다.</p>

             <h3 class="${styles.sectionTitle}">Case #2: "로그인 폼이 작동하지 않는다!"</h3>
            <ul class="${styles.tagList}">
              <li><code>&lt;form&gt;</code> 안에는 <code>&lt;input&gt;</code>과 <code>&lt;button&gt;</code> 요소가 필요하다.</li>
              <li><code>&lt;div&gt;</code>는 클릭 기능이 없으므로 버튼 역할을 할 수 없다.</li>
              <li><code>name</code> 속성은 입력 데이터를 서버에 보낼 때 key로 사용된다.</li>
              <li>폼 제출을 위해서는 반드시 <code>&lt;button&gt;</code> 요소를 사용해야 한다.</li>
            </ul>

            <h3 class="${styles.sectionTitle}">Case #3: "리스트가 이상하게 표시된다!"</h3>
            <ul class="${styles.tagList}">
              <li><code>&lt;ul&gt;</code>: 순서 없는 목록</li>
              <li><code>&lt;ol&gt;</code>: 순서 있는 목록</li>
              <li>목록의 각 항목은 반드시 <code>&lt;li&gt;</code>로 감싸야 한다.</li>
              <li><code>&lt;p&gt;</code>는 문단 태그로, <code>&lt;ul&gt;</code> 안에서 항목으로 쓰면 올바르게 표시되지 않는다.</li>
            </ul>

            <h3 class="${styles.sectionTitle}">Case #4: "표에서 제목이 보이지 않는다!"</h3>
            <ul class="${styles.tagList}">
              <li><code>&lt;th&gt;</code>는 테이블 제목 셀, <code>&lt;td&gt;</code>는 일반 데이터 셀이다.</li>
              <li>테이블의 첫번째 행은 보통 제목 역할을 하므로 <code>&lt;th&gt;</code>로 작성하는 것이 좋다.</li>
              <li>의미 구조를 명확하고 접근성과 가독성을 높이기 위해 제목에는 <code>&lt;th&gt;</code>를 사용해야 한다.</li>
            </ul>

            <h3 class="${styles.sectionTitle}">Case #5: "검색 엔진에 노출되지 않는 웹 페이지"</h3>
            <ul class="${styles.tagList}">
              <li><code>&lt;meta&gt;</code> 태그는 페이지에 대한 정보를 담는 태그로, 검색 엔진 최적화(SEO)에 사용된다.</li>
              <li><code>description</code>속성은 페이지의 간단한 설명을 나타낸다</li>
              <li><code>keywords</code>속성은 해당 페이지와 관련된 주요 키워드를 설정한다.</li>
              <li>이 태그들은 반드시 <code>&lt;head&gt;</code> 태그 안에 있어야 한다.</li>
              <li>SEO 최적화를 위해 정확한 <code>meta</code> 태그를 설정해야 한다.</li>
            </ul>

            <h3 class="${styles.sectionTitle}">Case #６: “링크가 들어가지 않았다!”</h3>
            <ul class="${styles.tagList}">
              <li><code>&lt;a&gt;</code> 태그는 <code>href</code> 속성이 있어야 링크 기능이 작동한다.</li>
            </ul>

            <h3 class="${styles.sectionTitle}">Case #7: “이미지가 보이지 않는다!”</h3>
            <ul class="${styles.tagList}">
              <li>이미지를 표시하려면<code>&lt;img&gt;</code> 태그는 <code>src</code> 속성이 필수이다.</li>
              <li><code>alt</code>는 이미지가 로드되지 않을 때 보여줄 텍스트이다.</li>
            </ul>

            <h3 class="${styles.sectionTitle}">Case #8: "버튼 클릭이 안 돼!"</h3>
            <ul class="${styles.tagList}">
              <li><code>&lt;button&gt;</code>은 기본적으로 <code>type="submit"</code>이다.</li>
              <li>이 때문에 클릭 시 페이지가 새로 고침되어 JS코드가 실행되지 않는다.</li>
              <li><code>type="button"</code>으로 명시해야 클릭 이벤트가 제대로 작동한다.</li>
            </ul>

            <h3 class="${styles.sectionTitle}">Case #9: “비디오가 재생되지 않는다!”</h3>
            <ul class="${styles.tagList}">
              <li><code>&lt;video&gt;</code> 태그는 <code>src</code>로 비디오 파일의 경로를 지정해야 한다.</li>
              <li><code>controls</code> 속성이 있어야 재생/일시정지 버튼이 표시된다.</li>
            </ul>

            <h3 class="${styles.sectionTitle}">Case #10: “사용자가 입력할 수 없다!”</h3>
            <ul class="${styles.tagList}">
              <li>사용자 입력은 반드시 <code>&lt;input&gt;</code> 또는 <code>&lt;textarea&gt;</code>와 같은 form 입력 태그를 사용해야 한다.</li>
              <li><code>&lt;div&gt;</code>는 입력 기능이 없는 콘텐츠 용도 태그이다.</li>
            </ul>
          </div>
        </section>
      `;
    }

    // CSS 페이지 콘텐츠
    else if (language === 'css') {
      return `
        <section class="${styles.container}">
          <div class="${styles.header}">
            <div class="${styles.labelLine}">
              <span class="${styles.icon}">&lt;/&gt;</span>
              <span class="${styles.label}">HTML</span>
            </div>
            <hr class="${styles.divider}" />
          </div>
          <h1 class="${styles.title}">축하합니다!</h1>
          <p class="${styles.subtitle}">모든 버그를 해결하셨습니다.</p>

          <p class="${styles.description}">
            <strong class="${styles.bold}">탐정 수첩</strong>에 오늘 해결한 버그가 기록됐으니 다음 사건을 위해 꼼꼼히 읽어보세요!
          </p>

          <div class="${styles.noteBox}">
            <p class="${styles.date}">2025. 04. 10. 탐정 수첩</p>
            
              <div class="${styles.case}">
                <h3 class="${styles.sectionTitle}">Case #1: "특정 요소에 스타일을 적용해야한다"</h3>
                <ul class="${styles.tagList}">
                <p><code>^=</code>를 사용하면 지정한 문자열로 시작하는 속성값을 선택할 수 있다.</p>
                </ul>
              </div>

 <div class="${styles.case}">
    <h3 class="${styles.sectionTitle}">Case #2: "주황색이어야 해!"</h3>
    <ul class="${styles.tagList}">
    <p><code>.h1</code>은 class가 h1인 요소,<code>h1</code>은 태그, <code>#h1</code>은 id가 h1인 요소다.</br>
    제목의 색상이 주황색이어야 하므로 id가 h1인 요소에 접근하거나, class가 p인 요소에 접근해야 한다. 이때 우리가 수정할 수 있는 요소는 HTML 태그 h1 뿐이므로, 빈칸에 !important 를 붙임으로서 color: orange 속성의 우선순위를 최우선 취급할 수 있다. <code>!important</code>를 사용해 우선순위를 강제한다.</p>
    </ul>
  </div>

  <div class="${styles.case}">
    <h3 class="${styles.sectionTitle}">Case #3: "hovering 효과가 필요해"</h3>
    <ul class="${styles.tagList}">
    <p><code>:hover</code> 의사 클래스를 통해 호버링 중인 요소로 범위를 제한할 수 있다.</p>
    <p>호버링이란 공중에 떠 있거나 정지된 상태로 머무는 것을 뜻한다.</p>
    </ul>
  </div>

  <div class="${styles.case}">
    <h3 class="${styles.sectionTitle}">Case #4: "헤더는 고정돼야해"</h3>
    <ul class="${styles.tagList}">
    <p>속성 <code>position</code>은 문서 상 요소를 배치하는 방법을 지정한다. 우리는 <code>fixed-header</code>클래스를 가진 요소를 고정하고자 하기에 <code>fixed</code>를 사용해야 한다.<code>fixed</code>를 사용할 경우 요소의 레이아웃을 페이지에 배정하지 않는다. 즉 고정되어 움직이지 않게 만들 수 있다.</p>
    </ul>
  </div>

  <div class="${styles.case}">
    <h3 class="${styles.sectionTitle}">Case #5: "여백이 필요해!"</h3>
    <ul class="${styles.tagList}">
    <p>HTML요소에 여백을 주기 위해선 margin 속성을 사용할 수 있다. banner1과 banner2가 상하로 위치하기에 둘 사이에 여백을 주려면 banner1 아래에 여백을 주거나, banner2 위에 여백을 주어야 한다. 빈 칸은 banner1 코드 블럭 안에 있기에 전자의 방법을 사용해보자. 요소의 하단에만 여백을 주기 위해서는 margin-bottom을 사용할 수 있다. 따라서 margin-bottom 옆의 빈칸의 답은 10px 이다.</p>
    </ul>
  </div>

  <div class="${styles.case}">
    <h3 class="${styles.sectionTitle}">Case #6: "물건이 가로가 아니라 세로로 배치돼있었다고!"</h3>
    <ul class="${styles.tagList}">
    <p>flex는 주로 1차원 정렬(한 방향(가로 또는 세로)으로 정렬)을 위해 사용한다.

display 속성을 flex로 하면 블록으로, inline-flex로 하면 인라인으로 flex container가 생성된다.

기본 정렬 방향은 수평이며 수직 정렬을 위해서는 flex-direction 속성을 column으로 설정하면 된다.

그럼 main-axis가 x축이 되고, cross-axis 는 y축이 된다.</p>
</ul>
  </div>

  <div class="${styles.case}">
    <h3 class="${styles.sectionTitle}">Case #7: "몽타주 여러 개 붙이라 했잖아!"</h3>
    <ul class="${styles.tagList}">
    <p><code>background-repeat</code> 속성으로 배경 이미지 반복 여부를 설정할 수 있다. <code>repeat-y</code>는 수직 반복이다.</p>
    </ul>
  </div>

  <div class="${styles.case}">
    <h3 class="${styles.sectionTitle}">Case #8: "몽타주가 돌아가 있잖아!"</h3>
    <ul class="${styles.tagList}">
    <p><code>transform</code>로 요소에 회전 크기 조절, 기울이기, 이동효과를 부여할 수 있다.</p>
    <div class="${styles.noteBox}">
    <p><code>transform: 변환함수1, 변환함수 2, …</code></p>
    </div>
    <p>변환함수를 적용해 요소를 조작할 수 있으며,2차원 회전함수 rotate(deg)가 있다.</p>
    </ul>
  </div>

  <div class="${styles.case}">
    <h3 class="${styles.sectionTitle}">Case #9: "플래시 좀 켜줘!"</h3>
    <ul class="${styles.tagList}">
    <p><code>transition</code> 속성으로 CSS 속성이 바뀔 때 애니메이션처럼 부드럽게 변화하게 만들어줄 수 있다.<br />
    예: <code>transition: property duration timing-function delay;</code></p>
    <p>- transition-property: (default: all_모든 속성에 적용) or 속성 이름 // 전환 효과를 사용할 속성의 이름을 지정<br>
- transition-duration: (default: 0s_전환 효과 없음) or 전환효과 지속시간(s)<br>
- transition-timing-function: (default: ease_느리게-빠르게-느리게) or liner(일정하게) or ease-in(느리게-빠르게) or ease-out(빠르게-느리게) or ease-in-out(느리게-빠르게-느리게)<br>
- transition-delay: (default: 0s_대기 시간 없음) or 전환 효과가 몇 초 뒤에 시작할지 대기시간로 설정할 수 있다.</p>
   <p>요소에 마우스 호버시 색이 바뀌게 하려면 아래와 같이 사용하면 된다.</p>
   <div class="${styles.noteBox}">
   <p><code>.flash {
  width: 100px;
  height: 100px;
  background-color: grey;
  border-radius: 50%;
  transition: background-color 0.3s;

  &:hover{
    background-color: beige;
  }
}
</code></p>
</div>
</ul>
  </div>

  <div class="${styles.case}">
    <h3 class="${styles.sectionTitle}">Case #10: "시뮬레이션이 안돼!"</h3>
    <ul class="${styles.tagList}">
    <p><code>animation</code>으로 복잡하고 다양한 효과를 추가할 수 있다.<br></p>
    <p>사용방법은 아래와 같다.<br>
    <pre><code>- \`\`\`css
animation: name duration timing-function delay iteration-count direction fill-mode play-state;<br>
- animation-name: (default: none) or \`@keyframes\`이름 // 사용할 @keyframes규칙의 이름을 지정<br>
- animation-duration: (default: 0s) or 지속시간(s)<br>
- animation-delay: (default: 0s) or 애니메이션 시작 전 대기시간(s)<br>
- animation-timing-function: (default: ease_느리게-빠르게-느리게) or liner(일정하게) or ease-in(느리게-빠르게) or ease-out(빠르게-느리게) or ease-in-out(느리게-빠르게-느리게) or cubic-bezier(n1,n2,n3,n4)(0~1 값으로 베지어 곡선 정의) or steps(n[, jumpTiming])(n번 분할된 애니메이션) // 애니메이션의 타이밍, 속도 제어하는 함수 지정<br>
- animation-iteration-count: (default: 1) or 숫자 or infinite // 애니메이션의 반복 횟수<br>
- animation-direction: (default: normal_정방향만 반복) or reverse_역방향만 반복 or alternate_정방향시작 왕복 or alternate-reverse_역방향시작 왕복 // 애니메이션 반복 방향<br>
- animation-fill-mode: (default: none_기본상태→시작→종료→기본상태) or forwards(기본상태→시작→종료) or backwards(시작→종료→기본상태) or both(시작→종료) // 애니메이션 전/후 상태 유지 여부<br>
- animation-play-state: (default: running) or paused //애니메이션 동작의 재생, 일시정지 상태 지정</pre></code>
    </p>
<div class="${styles.noteBox}">
    <p>@keyframes // 애니메이션 프레임을 정의하는 css 규칙</p>
    <p><pre><code>/* from-to */
@keyframes 애니메이션이름 {
  from {}
  to {}
}

/* percentage */
@keyframes 애니메이션이름 {
  0% {}
  50% {}
  100% {}
}</code></pre>
    </p>
    </div>
    </ul>
            </div>
            
          </div>
        </section>
      `;
    }
  }
}
