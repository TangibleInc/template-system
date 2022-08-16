# Design System

## Features

- Standardized **design tokens**

  [Standardized Design Tokens and CSS for a consistent, customizable, and interoperable WordPress future](https://mrwweb.com/standardized-design-tokens-css-wordpress-future/)

- A way for users to describe **reusable, composable behaviors**

  Like what [React Aria](https://react-spectrum.adobe.com/react-aria/) and [Radix UI](https://www.radix-ui.com/) provide, but using HTML tags and attributes instead of JavaScript. With an "escape hatch" for developers to customize it from JS, if needed.

- Library of **accessible primitives and patterns**

  Headless/unstyled components that implement the ARIA authoring practices.

  The Web Accessibility Initiative has a web site documentating user interface patterns.

  https://www.w3.org/WAI/ARIA/apg/patterns/

  Of particular interest is the source code:

  https://github.com/w3c/aria-practices/tree/main/examples

  Looks like a good reference for the library of core blocks that will be bundled with Tangible Blocks.

## System

### Variables

The system is based on a set of variables, with sensible defaults, which enable the user to customize while keeping the whole consistent.


### Atoms

Atoms are small building blocks and utilities. Components are designed as a composition of atoms.

- **Colors**
  - foreground, background, primary, secondary, accent
- **Spacing**
  - Gap
    - gap-1, gap-2, gap-3 (default), gap-4, gap-5
  - Margin
    - margin-1, margin-2, margin-3 (default), margin-4, margin-5
  - Padding
    - padding-1, padding-2, padding-3 (default), padding-4, padding-5

- **Text**
  - Font Families
    - copy, headings, monospace
  - Font Sizes
    - font-size-1, font-size-2, font-size-3, font-size-4 (default), font-size-5, font-size-6, font-size-7
  - Font Weights
    - font-weight-1, font-weight-2, font-weight-3 (default), font-weight-4, font-weight-5

- **Borders**
  - border-1, border-2 (default), border-3
- **Content Widths**
  - contentSize (exists), wideSize (exists), maxSize (new!) 
- **Flex and grid layout**
- **Responsive utilities**
  - Media Query Breakpoints

For a full list, see [Atoms](atoms).


## Components

A component is an independent reusable template.

It should work in any context: sites with different frontend frameworks and theme styles, as well as in WordPress admin pages, such as plugin settings.

Components should have minimal, generic and general-purpose styling and behavior.

All class, function, and variable names must have a unique prefix or namespace. This allows component libraries to exist peacefully with each other, as well as in any site theme.


<a name=references></a>

## References

- https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques

