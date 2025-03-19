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
    return html`<div class="p-box rounded-box mt-4 grid gap-4 bg-white md:grid-cols-4">
      <img src="/img/woodworking/Snapchat-474889815.jpg" class="rounded-box" />
      <img src="/img/woodworking/Snapchat-1992267622.jpg" class="rounded-box" />
      <img src="/img/woodworking/kumiko.png" class="rounded-box col-span-2" />
      <img src="/img/woodworking/DSC00204.JPG" class="rounded-box col-span-2" />
      <img src="/img/woodworking/20240903_111111.jpg" class="rounded-box" />
      <img src="/img/woodworking/Snapchat-1140902358.jpg" class="rounded-box" />
      <img src="/img/woodworking/20211031_123025.jpg" class="rounded-box col-span-2" />

      <img src="/img/woodworking/20180912_232034.jpg" class="rounded-box col-span-2" />
      <img src="/img/woodworking/20181230_123059.jpg" class="rounded-box col-span-2" />
      <img src="/img/woodworking/20191009_093732.jpg" class="rounded-box col-span-2" />

      <img src="/img/woodworking/20210108_140741.jpg" class="rounded-box col-span-2" />

      <img src="/img/woodworking/20211202_135106.jpg" class="rounded-box" />
      <img src="/img/woodworking/20230504_125419.jpg" class="rounded-box" />
      <img src="/img/woodworking/20211225_105653.jpg" class="rounded-box col-span-2" />

      <img src="/img/woodworking/20231224_103734.jpg" class="rounded-box col-span-2" />
      <img src="/img/woodworking/20230522_185405.jpg" class="rounded-box " />
      <img src="/img/woodworking/20230519_212842.jpg" class="rounded-box col-span-2" />

      <img src="/img/woodworking/20240904_194147.jpg" class="rounded-box" />
      <img src="/img/woodworking/20250124_132626.jpg" class="rounded-box" />

      <img src="/img/woodworking/Snapchat-151405485.jpg" class="rounded-box" />

      <img src="/img/woodworking/Snapchat-1528105602.jpg" class="rounded-box" />
    </div>`;
  }

  createRenderRoot() {
    return this;
  }
}

export { PageWoodworking };
