import { css, unsafeCSS } from 'lit';

export function assertCSS(styles) {
  if (styles instanceof CSSStyleSheet) {
    return styles;
  }

  return css`
    ${unsafeCSS(styles)}
  `;
}
