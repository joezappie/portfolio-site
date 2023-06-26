import { LitElement, html } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { map } from 'lit/directives/map.js';
import { injectTheme } from '#decorators/theme';

import styles from './page-header.css?inline';

@customElement('page-header')
class PageHeader extends LitElement {
  @injectTheme(styles)
  static styles;

  @property() active;

  @property()
  items = [
    { text: 'Home', name: 'home', path: '/' },
    { text: 'Resume', name: 'resume', path: '/resume' },
    { text: 'Projects', name: 'projects', path: '/projects' },
    { text: 'Design', name: 'design', path: '/design' },
    { text: 'Woodworking', name: 'woodworking', path: '/woodworking' },
    { expand: true },
    { text: html`<ion-icon name="logo-linkedin"></ion-icon>`, url: 'https://www.linkedin.com/in/joejankowiak/' },
  ];

  connectedCallback() {
    super.connectedCallback();

    window.addEventListener('scroll', this.onScroll);
  }

  render() {
    return map(this.items, (item) => {
      if (item.expand) {
        return html`<div class="expand"></div>`;
      }
      return html`<div class="item" ?active=${this.active === item.name} @click=${() => this.clickItem(item)}>${item.text}</div>`;
    });
  }

  onScroll = (evt) => {
    const scrollTop = document.documentElement.scrollTop;
    this.classList.toggle('docked', scrollTop > 20);
  };

  clickItem(item) {
    if (item.url) {
      window.open(item.url, '_blank');
    } else {
      // Handle internall
      window.location.href = item.path;
    }
  }
}

export { PageHeader };
