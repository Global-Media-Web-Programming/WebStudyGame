// import Component from '../../core/Component';
// import styles from './LatestItems.module.css';

// class LatestItem extends Component {
//   template() {
//     return `
//       <article class="${styles.container}">
//         ${imgPos === 'left' ? thumbnailImg : ''}
//         <div class="${styles.infoSection}">
//           <div class="${styles.infoHeader}">
//             <div class="${styles.infoHeaderRow}">
//               <div class="${styles.summary}">
//                 ${summaryData
//                   .map(
//                     ({ icon, label }) => `
//                     <div class="${styles.summaryItem}">
//                       <img src="${icon}" alt="${label}-icon" class="${styles.summaryIcon}"/>
//                       <span>${label}</span>
//                     </div>
//                   `
//                   )
//                   .join('')}
//               </div>
//               <div id="button">해결하기</div>
//             </div>
//             <h2 class="${styles.language}">${language}</h2>
//           </div>

//           <p class="${styles.description}">${language === 'html' ? GAME_DESCRIPTION.HTML : GAME_DESCRIPTION.CSS}</p>
//         </div>
//         ${imgPos !== 'left' ? thumbnailImg : ''}
//       </article>
//     `;
//   }
//   // <img src="" alt="${language}-img" class="${imgPos === 'left' ? styles.left : ''}"></img>

// }

// export default class LatestItems extends Component {
//   template() {
//     return `

//     `;
//   }
//   mouted() {
//     const btnEl = this.$el.querySelector('#button');
//     new Button(btnEl);
//   }
// }
