import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { map } from 'lit/directives/map.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { injectTheme } from '#decorators/theme.js';

import resume from '#data/resume.yaml';

import styles from './page-resume.css?inline';

@customElement('page-resume')
class PageResume extends LitElement {
  @injectTheme(styles) static styles;
  render() {
    return html`
      <div class="bg-surface mt-4 rounded-xl p-8 print:mt-0 print:p-0 print:text-xs">
        <div class="mb-6 grid grid-cols-[1fr_auto] items-end">
          <div>
            <div class="text-accent grow text-4xl font-bold">Joe Jankowiak</div>
            <div class="text-on-surface-500 text-lg leading-none">Software Engineer</div>
          </div>

          <div class="flex h-full items-end items-center gap-2">
            <div class="text-on-surface-400 text-lg">Full-Stack / UX / App Dev / Embedded</div>
          </div>
        </div>
        <div class="flex flex-wrap gap-x-8 gap-y-4 print:grid print:grid-cols-[30fr_60fr]">
          <div class="flex flex-[1_1_275px] flex-col gap-4">
            <div>
              <div class="border-surface-frost-900 mb-2 border-b text-xl">CONTACT</div>
              <div class="flex flex-col gap-2">
                <div class="flex items-center gap-2">
                  <div class="bg-accent grid aspect-square w-8 place-items-center rounded-full text-white print:w-6"><ion-icon name="call"></ion-icon></div>
                  ${resume.contact.phone}
                </div>
                <div class="flex items-center gap-2">
                  <div class="bg-accent grid aspect-square w-8 place-items-center rounded-full text-white print:w-6"><ion-icon name="mail"></ion-icon></div>
                  ${resume.contact.email}
                </div>
                <div class="flex items-center gap-2">
                  <div class="bg-accent grid aspect-square w-8 place-items-center rounded-full text-white print:w-6">
                    <ion-icon name="location-sharp"></ion-icon>
                  </div>
                  ${resume.contact.location}
                </div>
                <div class="flex items-center gap-2">
                  <div class="bg-accent grid aspect-square w-8 place-items-center rounded-full text-white print:w-6">
                    <ion-icon name="link-sharp"></ion-icon>
                  </div>
                  ${resume.contact.website}
                </div>
              </div>
            </div>
            <div>
              <div class="border-surface-frost-900 mb-2 border-b text-xl">EDUCATION</div>
              <div>
                <div class="text-on-surface-800 font-bold">${resume.education.school}</div>
                <div class="text-on-surface-500">${resume.education.major}</div>
                <div class="text-on-surface-500">${resume.education.level}</div>
                <div class="text-on-surface-200">${resume.education.years.start} — ${resume.education.years.end}</div>
              </div>
            </div>
            ${map(
              resume.skills,
              (section) => html`
                <div>
                  <div class="border-surface-frost-900 mb-2 border-b text-xl">${section.title}</div>
                  <div class="flex flex-wrap gap-2 print:gap-1">
                    ${map(section.tags, (tag) => html`<div class="bg-surface-frost-400 rounded-full px-3 py-1">${tag.name}</div>`)}
                  </div>
                </div>
              `
            )}
          </div>
          <div class="flex-[1_1_800px]">
            <div class="border-surface-frost-900 mb-2 border-b text-xl">WORK EXPERIENCE</div>
            <div class="flex flex-col gap-1">
              ${map(
                resume.experiences,
                (data) => html`
                    <div class="py-1 flex flex-col gap-1">
                      <div class="font-bold">${data.title}, ${data.company}</div>
                      <div class="text-on-surface-200">
                        <div class="flex gap-4">
                          <div class="flex items-center gap-1">
                            <ion-icon name="location-sharp" class="mb-[1px] text-sm"></ion-icon> ${data.location}
                          </div>
                          <div class="flex items-center gap-1">
                            <ion-icon name="calendar-clear" class="mb-[1px] text-sm"></ion-icon> ${data.timeframe
                              .map((time) => [time.start, time.end].filter((entry) => entry).join(' — '))
                              .join(', ')}
                          </div>
                        </div>
                      </div>
                      <div class="leading-normal print:leading-snug">${unsafeHTML(data.description)}</div>
                    </div>
                  </div>
                `
              )}
            </div>
          </div>
        </div>
      </div>
    `;
  }
}

export { PageResume };
