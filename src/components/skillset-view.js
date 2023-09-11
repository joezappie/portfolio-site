import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { map } from 'lit/directives/map.js';
import { injectTheme } from '#decorators/theme';

import skills from '#data/skills.yaml';

import styles from './skillset-view.css?inline';

@customElement('skillset-view')
class SkillsetView extends LitElement {
  @injectTheme(styles)
  static styles;

  @property({ type: Boolean, reflect: true })
  hydrate = false;

  @property()
  sections = skills;

  constructor() {
    super();
    this.watchVisibility();
  }

  render() {
    let delay = { ms: 0 };
    return html`
      ${map(this.sections, (section) => this.renderSection(section, delay))}
      <div class="text-on-surface-100 mt-1 flex justify-center gap-2 font-light">
        <ion-icon name="chatbubble-ellipses-outline" class="flex-none"></ion-icon>
        <div>Only listed those used on a regular basis</div>
      </div>
    `;
  }

  renderSection = (section, delay) => {
    return html`
      <div>
        <h2>${section.title}</h2>
        <section>
          ${map(section.tags, (tag) => {
            delay.ms += 35;
            return this.renderTag(tag, delay);
          })}
        </section>
      </div>
    `;
  };

  renderTag = (tag, delay) => {
    return html`<tag-item ?url=${tag.url} @click=${this.openURL.bind(this, tag.url)} style="animation-delay: ${delay.ms}ms;">${tag.name}</tag-item>`;
  };

  openURL = (url) => {
    if (url) {
      window.open(url, '');
    }
  };

  watchVisibility = () => {
    const options = { threshold: 0.35 };
    this.observer = new IntersectionObserver((entries) => entries.forEach(this.onVisible), options);
    this.observer.observe(this);
  };

  onVisible = (entry) => {
    if (entry.intersectionRatio > 0) {
      this.hydrate = true;
      this.observer.unobserve(this);
    }
  };
}

export { SkillsetView };
