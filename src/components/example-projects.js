import { LitElement, html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { map } from 'lit/directives/map.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

import { assertCSS } from '#core/stylesheet.js';

import projects from '#data/projects.yaml';

console.log(projects);

import styles from './example-projects.css?inline';
import standardStyles from '#themes/standard.css?inline';

@customElement('example-projects')
class ExampleProjects extends LitElement {
  static styles = [assertCSS(standardStyles), assertCSS(styles)];

  @property()
  projects = projects;

  test = [
    {
      name: 'Jetray',
      url: 'http://jetrayusa.com',
      description: html`
        <p>
          Jetray is a complex motion control rover that can repeatably position large sensors to scan aircraft for stress points, defects, joint fatigue, crack,
          corrosion and delamination's. Equipped with different sensors, it can either make direct contact with the surface or scan from a distance.
        </p>
        <p>
          I worked on a team of 3 developers, where the other two worked on the embedded systems and I was solely responsible for the control application. This
          included:
        </p>
        <ul>
          <li>building an Electron.js app using the Three.js engine for 3D visualization</li>
          <li>real-time viewing/control using web sockets</li>
          <li>a kinematics system</li>
          <li>serial communication to the embedded systems</li>
          <li>3D modeling to convert the CAD models into a usable format</li>
          <li>user authentication & logging system</li>
          <li>integration with a 3rd party to receive collection plans</li>
          <li>designing the UI for our pendant controller</li>
        </ul>
        <p class="technology">Node.js, Electron.js, C++ (N-API)</p>
      `,
      thumbnail: '/img/projects/jetray-ui.png',
    },
    {
      name: 'Zyphox MRP',
      url: 'https://app.zyphox.com',
      description: html`
        <p>
          This is my own product that I've been working on since Dec 2020. It is a modern manufacturing resource planning tool and currently supports tracking
          purchasing/sales/jobs/projects and time.
        </p>
        <p class="technology">Feathers.js, Node.js, MongoDB</p>
      `,
      thumbnail: '/img/projects/zyphox-ui.png',
    },
    {
      name: 'Alstom Signaling',
      description: html`
        <p>
          Over the course of the 3 years that I worked at Alstom, I developed a web interface for our NVSP2 application. This served as a real time diagnostic
          panel to our embedded system. It featured real time logic viewing (pictured), diagnostic conditions, network and communication links viewing, board
          updating and much more. I also worked on backend system software, such as the update manager and the web gateway process that communicated with the
          web interface via tcp sockets and web sockets. Since the web server runs on an embedded system, it needed to be lightweight so I developed a custom
          PHP framework.
        </p>
        <p class="technology">PHP, C++, qT</p>
      `,
      thumbnail: '/img/projects/alstom.png',
    },
    {
      name: 'Reporter Magazine',
      url: 'https://reporter.rit.edu',
      description: html`
        <p>
          Worked in a team of two to develop and migrate the magazine's online site to a Drupal 7 framework to increase productivity and traffic. Developed a
          custom track changes module so that articles could be edited directly on the site without using Microsoft Word or Google Docs outside of the workflow.
          Created the Drupal 7 theme from scratch.
        </p>
        <p>
          Developed the Reporter Android app and oversaw the iOS app development. Placed second for our mobile application in the Society of Professional
          Journalists Mark of Excellence Awards.
        </p>
        <p class="technology">Drupal 7, Android</p>
      `,
      thumbnail: '/img/projects/reporter.png',
    },
    {
      name: 'Assembly Portal',
      description: html`
        <p>
          Developed and in house tool for tracking the progress of PCB board assembly at Limerock. It can allow anyone in the company to request a PCB board to
          start being assembly and can track the board through etching, kit creation and assembly. Purchase orders can also be added to track the cost of each
          board and files can be uploaded such as the Board Layout, BOM and Gerber Files.
        </p>
        <p class="technology">Node.js, MySQL</p>
      `,
      thumbnail: '/img/projects/electronics.png',
    },
    {
      name: 'Assembly Portal',
      description: html`
        <p>
          Developed and in house tool for tracking the progress of PCB board assembly at Limerock. It can allow anyone in the company to request a PCB board to
          start being assembly and can track the board through etching, kit creation and assembly. Purchase orders can also be added to track the cost of each
          board and files can be uploaded such as the Board Layout, BOM and Gerber Files.
        </p>
        <p class="technology">Node.js, MySQL</p>
      `,
      thumbnail: '/img/projects/electronics.png',
    },
    {
      name: `Don't Pray to Satan`,
      youtube: 'https://www.youtube.com/embed/pWwiQhjo6zA',
      description: html`
        <p>
          This was the first game I ever created which I gave myself a timeline of 3 months to learn Unity/Maya and make a small game. I use Unity 3D as the
          engine, programming in C# and created all of the 3d assets. I kept track of my progress throughout the entire game which you can view on my projects
          page.
        <p> 
        </p>
          It is a small city builder style game in which you are trying to stop the citizens from being corrupted by evil through various mechanics. It
          sold around 500 copies on Steam.
        </p>
        <p class="technology">Unity 3D, C#, Autodesk Maya</p>
      `,
    },
  ];

  render() {
    return html`
      <div class="title">Past/Current Projects</div>
      <div class="projects">${map(this.projects, this.projectTemplate)}</div>
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
      return html`<img class="media" src="${project.thumbnail}" />`;
    }
    return nothing;
  };
}

export { ExampleProjects };
