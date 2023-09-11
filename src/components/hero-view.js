import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { injectTheme } from '#decorators/theme.js';

import styles from './hero-view.css?inline';

@customElement('hero-view')
class HeroView extends LitElement {
  @injectTheme(styles)
  static styles;

  connectedCallback() {
    super.connectedCallback();

    window.addEventListener('scroll', this.onScroll);
  }

  render() {
    return html`
      <div class="about text-on-surface">
        <div class="name">I'm Joe Jankowiak</div>
        <div class="subtext font-light"><span class="degree font-normal">Software Engineer</span> - Full Stack / UX / App Dev / Embedded</div>
      </div>
      <div class="profile-picture">
        <img src="/img/me.png" />
      </div>
    `;
  }

  onScroll = (evt) => {
    const elementHeight = this.offsetHeight;
    const scrollTop = document.documentElement.scrollTop;

    const normalizedScroll = elementHeight - scrollTop;
    this.style.opacity = Math.max(normalizedScroll / (elementHeight / 1.75), 0);
  };
}

export { HeroView };
