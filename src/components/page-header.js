import { LitElement, html } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { map } from 'lit/directives/map.js';
import { assertCSS } from '#core/stylesheet.js';

import styles from './page-header.css?inline';

@customElement('page-header')
class PageHeader extends LitElement {
  static styles = assertCSS(styles);

  @property()
  items = [
    { text: 'HOME', path: 'home' },
    { text: 'RESUME', path: 'resume' },
    { text: 'PROJECTS', path: 'projects' },
    { text: 'DESIGN', path: 'design' },
    { text: 'WOODWORKING', path: 'woodworking' },
    { text: 'EDUCATION', path: 'education' },
    { expand: true },
    { text: 'CONTACT', path: 'contact' },
    { text: html`<ion-icon name="logo-linkedin"></ion-icon>`, url: 'https://www.linkedin.com/in/joejankowiak/' },
  ];

  @property()
  active;

  connectedCallback() {
    super.connectedCallback();
    this.active = this.items.at(0);

    window.addEventListener('scroll', this.onScroll);
  }

  render() {
    return map(this.items, (item) => {
      if (item.expand) {
        return html`<div class="expand"></div>`;
      }
      return html`<div class="item" @click=${() => this.clickItem(item)} ?active=${this.active === item}>${item.text}</div>`;
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
      // Handle internally
    }
  }
}

export { PageHeader };
