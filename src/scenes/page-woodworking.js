import { LitElement, html } from 'lit';
import { customElement, query } from 'lit/decorators.js';
import { injectTheme } from '#decorators/theme.js';

@customElement('page-woodworking')
class PageWoodworking extends LitElement {
  @injectTheme() static styles;

  @query('section.splide') gallery;

  firstUpdated() {
    super.firstUpdated();

    const splide = new Splide(this.gallery, {
      type: 'loop',
      perPage: 3,
      focus: 'center',
      autoplay: true,
      interval: 8000,
      flickMaxPages: 3,
      updateOnMove: true,
      pagination: false,
      padding: '10%',
      throttle: 300,
      breakpoints: {
        1440: {
          perPage: 1,
          padding: '30%',
        },
      },
    });
    splide.mount();
  }

  render() {
    return html`<div class="p-box rounded-box mt-4 bg-white">Woodworking projects coming soon</div>`;
  }

  createRenderRoot() {
    return this;
  }
}

export { PageWoodworking };
