# Architecture

The Template System is composed of the following modules. They used to be separate repositories, but are now consolidated for ease of development and cross-integration.

## Loop module

### Loop types and fields

- Base loop type, from which all loop types inherit
- Attachment
- Calendar
- Field
- List
- Map
- Menu
- Post
- Taxonomy
- Taxonomy Term
- Type (Loop/Post type)
- User

## Logic module

- Server side: Logic rules definition and evaluation
- Frontend: User interface: script and style for modal

  To be deprecated by new React Logic UI based on this prototype: https://bitbucket.org/tangibleinc/tangible-cross-logic-panel


## Template module

Template language defined by dynamic tags

- Core tags
- Core logic rules
- HTML module
- CodeMirror code editor
- Integration with Advanced Custom Fields
- Modules
  - Calendar (idea)
  - Chart (beta)
  - Embed
  - Form (alpha)
  - Glider
  - Markdown
  - Math
  - Prism
  - Sass
  - Slider
  - Table


## Interface module

Libraries for user interface - Many of these are used by Template module 

- Chart
- Date Picker
- Embed
- Glider
- Prism
- Select2
- Slider
- Sortable
- Table


## System module

Template management

- Post types
  - Template
  - Script
  - Style
  - Layout
- Assets
- Location
- Import/export
