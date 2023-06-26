import { LitElement, html } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { PageHeader } from '#components/page-header.js';
import { injectTheme } from '#decorators/theme.js';

import styles from './app-container.css?inline';
import '#scenes/page-home.js';
import '#scenes/page-resume.js';

import { RouterController } from '#core/router.js';

@customElement('app-container')
class AppContainer extends LitElement {
  @injectTheme(styles)
  static styles;

  @property() pageName;

  routes = [
    { path: '', name: 'home', action: this.display(html`<page-home></page-home>`) },
    { path: '/resume', name: 'resume', action: this.display(html`<page-resume></page-resume>`) },
    { path: '/projects', name: 'projects', action: this.display(html`<page-projects></page-projects>`) },
    { path: '/design', name: 'design', action: this.display(html`<page-design></page-design>`) },
    { path: '/woodworking', name: 'woodworking', action: this.display(html`<page-woodworking></page-woodworking>`) },
  ];

  display(page) {
    return ({ route }) => {
      this.pageName = route.name;
      return page;
    };
  }

  constructor() {
    super();
    this.router = new RouterController(this, this.routes);
  }

  render() {
    console.log(this.router);
    return html`
      <div class="container">
        <page-header active=${this.pageName}></page-header>
        ${this.router.outlet()}
      </div>
      <div class="header-effect"></div>
    `;
  }
}

export { AppContainer };
