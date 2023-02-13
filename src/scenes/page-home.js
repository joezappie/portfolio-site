import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { HeroView } from '#components/hero-view.js';
import { IntroductionView } from '#components/introduction-view.js';
import { SkillsetView } from '#components/skillset-view.js';
import { ExampleProjects } from '#components/example-projects.js';
import { assertCSS } from '#core/stylesheet.js';

import styles from './page-home.css?inline';

@customElement('page-home')
class PageHome extends LitElement {
  static styles = [assertCSS(styles)];
  render() {
    return html`
      ${new HeroView()}
      <div class="two-column">${new IntroductionView()} ${new SkillsetView()}</div>
      ${new ExampleProjects()}
    `;
  }
}

export { PageHome };
