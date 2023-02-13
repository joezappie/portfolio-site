import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { map } from 'lit/directives/map.js';
import { assertCSS } from '#core/stylesheet.js';

import styles from './skillset-view.css?inline';
import standardStyles from '#themes/standard.css?inline';

@customElement('skillset-view')
class SkillsetView extends LitElement {
  static styles = [assertCSS(standardStyles), assertCSS(styles)];

  @property({ type: Boolean, reflect: true })
  hydrate = false;

  @property()
  sections = [
    {
      title: 'Languages',
      tags: [
        { name: 'JavaScript', url: 'https://www.javascript.com/' },
        { name: 'HTML' },
        { name: 'CSS' },
        { name: 'C++' },
        { name: 'Python', url: 'https://www.python.org/' },
        { name: 'MongoDB', url: 'https://www.mongodb.com/' },
        { name: 'MySQL', url: 'https://www.mysql.com/' },
      ],
    },
    {
      title: 'Frameworks',
      tags: [
        { name: 'Feathers.js', url: 'https://feathersjs.com/' },
        { name: 'Electron.js', url: 'https://www.electronjs.org/' },
        { name: 'Three.js', url: 'https://threejs.org/' },
        { name: 'Lit.js', url: 'https://lit.dev/' },
        { name: 'Socket.io', url: 'https://socket.io/' },
        { name: 'Web Components', url: 'https://www.webcomponents.org/' },
      ],
    },
    {
      title: 'Enviroments',
      tags: [
        { name: 'Node.js', url: 'https://nodejs.org/en/' },
        { name: 'git', url: 'https://git-scm.com/' },
        { name: 'Vite.js', url: 'https://vitejs.dev' },
        { name: 'Docker', url: 'https://docker.com' },
        { name: 'Dev Containers', url: 'https://code.visualstudio.com/docs/devcontainers/containers' },
        { name: 'jsdoc', url: 'https://jsdoc.app/' },
        { name: 'Linux' },
      ],
    },
    {
      title: 'Software',
      tags: [
        { name: 'Illustrator', url: 'https://www.adobe.com/products/illustrator.html' },
        { name: 'Photoshop', url: 'https://www.adobe.com/products/photoshop.html' },
        { name: 'Adobe XD', url: 'https://www.adobe.com/products/xd/learn/get-started/what-is-adobe-xd-used-for.html' },
        { name: 'Blender', url: 'https://blender.org' },
        { name: 'Inventor', url: 'https://autodesk.com/products/inventor' },
        { name: 'VS Code', url: 'https://code.visualstudio.com/' },
      ],
    },
  ];

  constructor() {
    super();
    this.watchVisibility();
  }

  connectedCallback() {
    super.connectedCallback();
    this.renderRoot.addEventListener('click', this.onClick);
  }

  render() {
    let delay = { ms: 0 };
    return html`
      ${map(this.sections, (section) => this.renderSection(section, delay))}
      <div class="fw300 caption">
        <ion-icon name="chatbubble-ellipses-outline"></ion-icon>
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
    return html`<tag-item url=${tag.url} style="animation-delay: ${delay.ms}ms;">${tag.name}</tag-item>`;
  };

  onClick = (evt) => {
    const tag = evt.target.closest('tag-item');
    if (tag) {
      this.open(tag);
    }
  };

  open(tag) {
    window.open(tag.getAttribute('url'), '');
  }

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
