import { LitElement, html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { map } from 'lit/directives/map.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { injectTheme } from '#decorators/theme.js';

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
      <div class="flex flex-col gap-6">
        <div class="rounded-box p-box bg-surface mt-8">
          <h1 class="font-heading font-light">Example Projects</h1>
          <p class="text-lg font-light">Below are some examples of my current and past work.</p>
        </div>
        ${map(this.projects, this.projectTemplate)}
      </div>
    `;
  }

  projectTemplate = (project) => {
    return html`
      <div class="project bg-surface p-box rounded-box flex flex-col gap-6 md:grid md:grid-cols-[1fr_minmax(400px,1fr)]">
        <div>
          <h2>${project.name}</h2>
          <div class="align-start flex flex-col gap-3">${this.urlTemplate(project)} ${unsafeHTML(project.description)}</div>
        </div>
        ${this.mediaTemplate(project)}
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
      return html`<img class="media" src="${project.thumbnail}" />`;
    }
    return nothing;
  };
}

export { ExampleProjects };
