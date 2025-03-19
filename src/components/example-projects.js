import { LitElement, html, nothing } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { map } from 'lit/directives/map.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { injectTheme } from '#decorators/theme.js';
import { keyed } from 'lit/directives/keyed.js';

import styles from './example-projects.css?inline';

@customElement('example-projects')
class ExampleProjects extends LitElement {
  @injectTheme(styles)
  static styles;

  @property()
  projects;

  constructor() {
    super();
    this.loadProjects();
  }

  async loadProjects() {
    this.projects = (await import('#data/projects.yaml')).default;
  }

  render() {
    return html`
      <div class="projects">
        <div class="rounded-box p-box mt-8 bg-white">
          <h1 class="font-heading font-light">Example Projects</h1>
          <p class="text-lg font-light">Below are some examples of my current and past work.</p>
        </div>
        ${map(this.projects, this.projectTemplate)}
      </div>
    `;
  }

  projectTemplate = (project) => {
    return html`
      <div class="project layout vertical">
        <div class="description layout vertical">
          <h3 class="name">${project.name}</h3>
          ${this.urlTemplate(project)} ${unsafeHTML(project.description)}
        </div>
        <div>${this.mediaTemplate(project)}</div>
      </div>
    `;
  };

  urlTemplate = (project) => {
    if (project.url) {
      return html`<a href="${project.url}">${project.url}</a>`;
    }
    return nothing;
  };

  mediaTemplate = (project) => {
    if (project.youtube) {
      return html`<div class="media youtube">
        <iframe class="video" src="${project.youtube}" frameborder="0" allowfullscreen></iframe>
      </div>`;
    } else if (project.thumbnail) {
      return html`
        <a href="${project.thumbnail}" @click=${this.openImage}>
          <img class="media" src="${project.thumbnail}" />
        </a>
        <dialog class="rounded bg-white p-0" style="height: 95vh;width: fit-content; border:0;">
          <img class="h-full" src="${project.thumbnail}" />
        </dialog>
      `;
    }
    return nothing;
  };

  openImage = (evt) => {
    evt.preventDefault();
    const dialog = evt.target.closest('a').parentElement.querySelector('dialog');
    dialog.showModal();
  };
}

export { ExampleProjects };
