import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { assertCSS } from '#core/stylesheet.js';

import styles from './introduction-view.css?inline';
import standardStyles from '#themes/standard.css?inline';

@customElement('introduction-view')
class IntroductionView extends LitElement {
  static styles = [assertCSS(standardStyles), assertCSS(styles)];

  render() {
    return html`
      <h1>Introduction</h1>
      <section class="layout vertical">
        <p>
          I'm a Rochester Institute of Technology graduate with a Bachelor's degree in Software Engineering. Despite only having graduated a few years ago, I
          started doing web development in 2009 while in high school. I consider myself a jack of all trades when it comes to anything web related.
        </p>
        <p>
          I enjoy doing full-stack and have gotten to work on exciting projects over the years that have given me a broad skill set beyond programming. I desire
          a challenge and love learning and keeping up with the latest technologies. I've thrived at every company I've worked for, always becoming an essential
          and dependable employee.
        </p>
        <p>
          Programming is both a career and a hobby to me, and I always look to incorporate software or hardware into any of my personal projects. My favorite is
          mixing programming and woodworking!
        </p>
        <p>
          For the last several years, I've worked at a robotics/motion engineering firm - Limerock Engineering, in Medford, OR. Being a small company with only
          2-3 developers, I've been able to play a crucial role in many projects. I've also helped bring the company up to speed with newer technologies
          allowing us to provide more for our clients and improve our processes.
        </p>
        <div>
          <button>View Resume <ion-icon name="enter-outline"></ion-icon></button>
        </div>
        <div class="expand"></div>
        <div>
          <div>Interested in this websites code?</div>
          <a href="https://github.com/jrj2211/portfolio-site" class="fw500">View the GitHub repository</a>
        </div>
      </section>
    `;
  }
}

export { IntroductionView };
