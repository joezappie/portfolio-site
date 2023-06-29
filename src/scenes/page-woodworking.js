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
    return html`
      <section class="splide" aria-label="Splide Basic HTML Example">
        <div class="splide__track">
          <ul class="splide__list">
            <li class="splide__slide">Slide 01</li>
            <li class="splide__slide">Slide 02</li>
            <li class="splide__slide">Slide 03</li>
          </ul>
        </div>
      </section>
    `;
  }

  createRenderRoot() {
    return this;
  }
}

export { PageWoodworking };
