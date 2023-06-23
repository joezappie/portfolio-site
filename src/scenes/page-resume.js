import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { injectTheme } from '#decorators/theme.js';

@customElement('page-resume')
class PageResume extends LitElement {
  @injectTheme() static styles;
  render() {
    return html` <div class="rounded-xl bg-white"></div> `;
  }
}

export { PageResume };
