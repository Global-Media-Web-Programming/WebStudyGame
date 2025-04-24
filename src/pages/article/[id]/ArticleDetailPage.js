import Component from '../../../core/Component';
import styles from './ArticleDetailPage.module.css';
import articles from '../../../data/articles.json';
import { BUILD_ROUTES } from '../../../constants/routes';

export default class ArticleDetailPage extends Component {
  template() {
    const { id } = this.props;
    const article = articles.find((item) => item.id === parseInt(id, 10));

    if (!article) {
      return `<div>게시물을 찾을 수 없습니다.</div>`;
    }

    return `
      <div class="${styles['article-detail-container']}">
        <h1 class="${styles['article-title']}">${article.title}</h1>
        <div class="${styles['article-author']}">
          <span class="${styles['label']}">작성자 :</span> ${article.writer}
        </div>
                <div class="${styles['article-content-placeholder']}">
          <img src="${article.image}" alt="${article.title}" class="${styles['article-image']}" />
        </div>
        <div class="${styles['article-main']}">
          ${article.content}
        </div>
        <div class="${styles['article-navigation']}">
          ${
            article.id > 1
              ? `<a href="${BUILD_ROUTES.ARTICLE_DETAIL(article.id - 1)}"><button class="${styles['nav-button']}">이전 글 보기</button></a>`
              : '<div></div>'
          }
          ${
            article.id < articles.length
              ? `<a href="${BUILD_ROUTES.ARTICLE_DETAIL(article.id + 1)}"><button class="${styles['nav-button']}">다음 글 보기</button></a>`
              : '<div></div>'
          }
        </div>
      </div>
    `;
  }
}
