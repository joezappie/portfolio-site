import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { assertCSS } from '#core/stylesheet.js';

import styles from './hero-view.css?inline';
import standardStyles from '#themes/standard.css?inline';

@customElement('hero-view')
class HeroView extends LitElement {
  static styles = [assertCSS(standardStyles), assertCSS(styles)];

  connectedCallback() {
    super.connectedCallback();

    window.addEventListener('scroll', this.onScroll);
  }

  render() {
    return html`
      <div class="about">
        <div class="name">I'm Joe Jankowiak</div>
        <div class="subtext"><span class="degree">Software Engineer</span> - Web / UX / Android / Embedded</div>
      </div>
      <div class="profile-picture">
        <img src="/img/me.png" />
      </div>
    `;
  }

  onScroll = (evt) => {
    const distanceToTop = window.pageYOffset + this.getBoundingClientRect().top;
    const elementHeight = this.offsetHeight;
    const scrollTop = document.documentElement.scrollTop;

    const normalizedScroll = elementHeight - scrollTop;
    this.style.opacity = Math.max(normalizedScroll / elementHeight, 0);
  };
}

export { HeroView };
