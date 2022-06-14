# Tangible Interface

Tangible Interface is a modular, encapsulated interface design library.

The goal is to provide common component styles for embedding in any context.

- Sites with different frontend frameworks and theme styles
- Plugin settings page within WordPress admin
- Long-term: Theming full sites and applications

This is achieved by organizing styles in SASS.

- Component styles are minimal, functional and generic. Theming is done by the user.
- Each component is independent, and can be used separately. It doesn't affect anything outside itself.
- All class names are prefixed. The prefix can be defined by the user.

## Design system

### Variables

The system is based on a set of variables, with sensible defaults, which enable the user to customize while keeping the whole consistent.

### Mixins

Mixins are functions that generate styles based on given variables.

### Atoms

Atoms are small building blocks and utilities. Components are designed as a composition of atoms.

- Colors
- Spacing
- Sizing
- Flex and grid layout
- Responsive utilities

## Components

- Form
  - Input types
  - Buttons
