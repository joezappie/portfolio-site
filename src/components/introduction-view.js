import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { injectTheme } from '#decorators/theme.js';

@customElement('introduction-view')
class IntroductionView extends LitElement {
  @injectTheme() static styles;

  render() {
    return html`
      <div class="p-box rounded-box flex h-full flex-col bg-white">
        <h1 class="font-heading font-light">Introduction</h1>
        <section class="mt-1 flex h-full flex-col gap-2 text-lg font-light">
          <p>
            With 10 years of professional experience in software development, my passion for the field began long before my career. I specialize in building
            complex, purpose-driven web applications that present meaningful challenges to solve. My expertise spans the full web development stack, from UI/UX
            design and front-end application development to designing back-end APIs, libraries, and handling production web operations. I strive to stay up to
            date with new technologies, speeding up development and reducing maintenance.
          </p>
          <p>
            Programming is both a career and a hobby to me, and I always look to incorporate software or hardware into any of my personal projects. My favorite
            is mixing programming and woodworking!
          </p>
          <p>
            For the last several years, I've worked at a robotics/motion engineering firm - Limerock Engineering, in Medford, OR. Being a small company with
            only 2-3 developers, I've been able to play a crucial role in many projects. I've also helped bring the company up to speed with newer technologies
            allowing us to provide more for our clients and improve our processes.
          </p>
          <div>
            <button @click=${() => (window.location.href = '/resume')}>View Resume<ion-icon name="document-text-outline" class="text-lg"></ion-icon></button>
          </div>
          <div class="grow"></div>
          <div>
            <div>Interested in this websites code?</div>
            <a href="https://github.com/jrj2211/portfolio-site" class="fw500">View the GitHub repository</a>
          </div>
        </section>
      </div>
    `;
  }
}

export { IntroductionView };
