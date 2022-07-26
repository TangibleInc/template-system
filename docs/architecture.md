# Architecture

The Template System is made of the following sub-modules.

These used to be separate repositories, but are now consolidated for ease of development and cross-integration.

- [Loop](#loop)
- [Logic](#logic)
- [Interface](#interface)
- [Template](#template)
- [System](#system)


<a name=loop></a>

## Loop

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

<a name=logic></a>

## Logic

- Server side: Logic rules definition and evaluation
- Frontend: User interface: script and style for modal

  To be deprecated by new React Logic UI based on this prototype:
  
  https://bitbucket.org/tangibleinc/tangible-cross-logic-panel


<a name=interface></a>

## Interface

Libraries for user interface

- Chart
- Date Picker
- Embed
- Glider
- Prism
- Select2
- Slider
- Sortable
- Table


<a name=template></a>

## Template

Template language defined by dynamic tags

- Core tags
- Core logic rules
- HTML module
- CodeMirror code editor
- Integration with Advanced Custom Fields
- Modules

  Many of these integrate with libraries in the Interface module.

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


<a name=system></a>

## System

Template management

- Post types
  - Template
  - Script
  - Style
  - Layout
- Assets
- Location
- Import/export
