import Component from '../../../core/Component';
import styles from './LearnDetailPage.module.css';
import learns from '../../../data/learns.json';

export default class ArticleDetailPage extends Component {
  template() {
    const { id } = this.props;
    const learn = learns.find((item) => item.id === parseInt(id, 10));

    if (!learn) {
      return `<div>게시물을 찾을 수 없습니다.</div>`;
    }

    return `
      <div class="${styles['learn-detail-container']}">
        <h1 class="${styles['learn-title']}">${learn.title}</h1>
        <div class="${styles['learn-author']}">
          <span class="${styles['label']}">작성자 :</span> ${learn.writer}
        </div>
                <div class="${styles['learn-content-placeholder']}">
        </div>
        <div class="${styles['learn-main']}">
          ${learn.content}
        </div>
        <div class="${styles['learn-navigation']}">
          ${
            learn.id > 1
              ? `<a href="/articles/${learn.id - 1}"><button class="${styles['nav-button']}">이전 글 보기</button></a>`
              : '<div></div>'
          }
          ${
            learn.id < learns.length
              ? `<a href="/articles/${learn.id + 1}"><button class="${styles['nav-button']}">다음 글 보기</button></a>`
              : '<div></div>'
          }
        </div>
      </div>
    `;
  }
}
