import { unsafeCSS, css } from 'lit';
import tailwind from '#themes/tailwind.css?inline';

export function assertCSS(style) {
  // Native CSS Style sheet so return it
  if (style instanceof CSSStyleSheet) {
    return style;
  }

  // Convert string into native CSSStyleSheet
  if (typeof style === 'string') {
    return css`
      ${unsafeCSS(style)}
    `;
  }

  return null;
}

/**
 * Decorator to inject common styles into a lit element and ensure they are the correct type
 *
 * @param {...(String | CSSStyleSheet)} styles
 * @returns {CSSResult}
 */
export const injectTheme = (...styles) => {
  return function (target) {
    const { initializer } = target;

    // Inject tailwind
    let newStyles = [tailwind];

    // Add any inital styles into the new style array
    if (initializer) {
      const initStyles = initializer.call(this);
      if (Array.isArray(initStyles)) {
        newStyles.push(...initStyles);
      } else {
        newStyles.push(initStyles);
      }
    }

    // Add passed in styles last
    newStyles.push(...styles);

    // Remove any invalid styles
    newStyles = newStyles.filter((style) => !!style);

    // Ensure that they are valid style sheets
    newStyles = newStyles.map(assertCSS);

    // Override initalizer to return new styles array
    target.initializer = function () {
      return newStyles;
    };
  };
};
