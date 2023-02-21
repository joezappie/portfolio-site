import { LitElement, html } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { PageHeader } from '#components/page-header.js';
import { injectTheme } from '#decorators/theme.js';

import styles from './app-container.css?inline';
import { PageHome } from '#scenes/page-home.js';

@customElement('app-container')
class AppContainer extends LitElement {
  @injectTheme(styles)
  static styles;

  render() {
    return html`
      <div class="container">${new PageHeader()} ${new PageHome()}</div>
      <div class="header-effect"></div>
    `;
  }
}

export { AppContainer };
