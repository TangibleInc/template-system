# Template System: Plan

<Meta title>Template System: Plan</Meta>

<h2>Table of Contents</h2>

- [Template System](#template-system)
  - [Issues](#issues)
  - [Features](#features)
- [Feature projects](#feature-projects)
  - [Template Editor](#template-editor)
  - [Import and Export](#import-and-export)
  - [Style and Script](#style-and-script)
  - [Pagination](#pagination)
  - [Slider](#slider)
  - [Gutenberg Integration](#gutenberg-integration)
  - [Beaver Integration](#beaver-integration)
  - [Elementor Integration](#elementor-integration)
- [Documentation](#documentation)
- [Long-term](#long-term)

## Current

- [ ] VidStack Player - Bundle or plugin?


- [ ] [January contains no week data in calendar loops](https://app.clickup.com/t/2x01e9w)

  No weeks output for `<Loop field=weekday>` in calendar_month or field=month loops


- [ ] [Taxonomy term loop: Order by random](https://app.clickup.com/t/2epyw3d)

  [WP_Term_Query](https://developer.wordpress.org/reference/classes/WP_Term_Query/__construct/#parameters) does not support orderby random

- [ ] Taxonomy term loop: Support multiple posts for post attribute

  ```html
  <Loop type=taxonomy_term taxonomy=category post="1,26,31,34,83">
    <Field title /><br />
  </Loop>
  ```


- [ ] If tag: add logic to test count in loops

  - Add `count` attribute

    ```html
    <If count=even>..</If>
    <If count=odd>..</If>
    <If count="3n + 1">..</If>
    ```
  
  - Add `math` attribute

    ```html
    <If math="{Get loop=count} % 3 === 0">
    ```

  - Even and Odd
  
  - Support for interval and offset like CSS nth-child selector ie. 3n + 1


- Layout template

  When layout matches and admin user is logged in, add **Edit Layout action** in the frontend admin menu




### Pagination

- [ ] [Allow assets to be displayed beyond the first page of a paginated loop](https://app.clickup.com/t/2vxve68?comment=996760856)

  https://discourse.tangible.one/t/pagination-svg-asset-disappearing-after-page-change/724

  The solution is probably to pass template asset ID(s) to the paginator, so it can add it to every request; and the server side can set up the asset variable type before rendering the page template.


<a name=template-system></a>
## Template System

<a name=issues></a>
### Issues

<a name=features></a>
### Features 

- [ ] Dynamic module assets loader
  - [ ] chart
  - [x] embed
  - [x] glider
  - [x] mermaid
  - [ ] paginator
  - [x] prism
  - [x] slider
  - [ ] table


- [ ] [Comment loop type and fields](https://app.clickup.com/t/2nfveej)

  `/template-system/loop/types/comment`

- [ ] [A way to create shortcode from template](https://app.clickup.com/t/2epyw21)

- [ ] Markdown block

- [ ] Prism block - Select language

- [ ] Support "custom_query" attribute for Post Type, Taxonomy, and User loop types


- [ ] [Site content structure](https://app.clickup.com/t/2kwfp1t) 
  
  In admin screen, Dashboard -> Content


<a name=feature-projects></a>

## Feature projects

<a name=template-editor></a>

### Template Editor

#### Issues

- [ ] AJAX save
  - [ ] AJAX nonce expiring after a day with same browser tab
  - [ ] When navigating elsewhere in admin, sometimes there's a confirmation dialog "Information you've entered may not be saved"

    It's because WordPress admin screen keeps track of when post content changed and unsaved. Somehow this state must be updated on AJAX save.

  - [ ] [Template slug not getting saved?](https://app.clickup.com/t/2f7h6h9)


#### Features

- [ ] [Option to see editor and preview side-by-side](https://app.clickup.com/t/2qajc6d)

#### Long-term

- [ ] Prepare base for CodeMirror 6



<a name=import-and-export></a>

### Import and Export

- Issues

- Feature requests

  - [ ] [Export in ZIP format](https://app.clickup.com/t/2nfvd7g)

  - [ ] Export single template from its edit screen

  - [ ] Export/import the export config as JSON

  - [ ] Sync: Push/pull templates between sites, including locally hosted


<a name=style-and-script></a>

### Style and Script

#### Features

- [ ] Support uploading CSS/JS files to media library and multi-select to load by location rules

- [ ] Update Sass module - template/modules/sass
  - [ ] [SCSS PHP](https://github.com/scssphp/scssphp)
  - [ ] PHP Autoprefixer
  - [ ] CSS Parser

- ? Deprecate Sass
  - [ ] Add tab/field for CSS editor
  - [ ] Deprecate Sass tab/field/editor/compiler


<a name=layout></a>

### Layout

<a name=pagination></a>

### Pagination

- Additional navigation buttons

  - first/last
  - next/previous

  - Text: `First Previous 1 2 3 4 5 Next Last`
  - Icons: `<< < 1 2 3 4 5 > >>`

  - ? What attributes we should add to the `PaginateButtons` tags to make this the most flexible

    ```html
    <PaginateButtons name=loop_name>     
      <PaginateButton type=first />
      <PaginateButton type=previous><i class="chevron-left"></i> Previous Page</PaginateButton>
      <ul>
        <Loop type=paginate_pages>
          <li><PaginateButton type=page>Page <Get loop=count /></PaginateButton><li>
        </Loop>
      </ul>
      <PaginateButton type=next />
      <PaginateButton type=last>My last page text</PaginateButton>
    </PaginateButtons>
    ```

    It would be fantastic if users could
    
    - Create multiple pieces of pagination (before and after loops), associated with loops via some kind of **unique name**

    ```html
    <PaginateButtons name=loop_name> 
      <ul>
        <PaginateButton type=page>
          <li>Page <Field page_number /></li>
        </PaginateButton>
      </ul>
    </PaginateButtons>
    ```

- [ ] Support using PaginateButtons **before** the loop
- [ ] Option to update the URL on page navigation
- [ ] Option to load more posts (automatically or by button)


<a name=slider></a>

### Slider

- Improve accessibility
- Make controls more customizable


<a name=gutenberg-integration></a>

### Gutenberg Integration


<a name=beaver-integration></a>

### Beaver Integration


<a name=elementor-integration></a>

### Elementor Integration


<a name=documentation></a>

## Documentation

- [Things to add/fix/clarify in L&L docs](https://app.clickup.com/t/2ew3taf)

  - [ ] Does Field excerpt auto=true always display an auto-generated excerpt, or only when there isn't a manual excerpt?

  - [ ] Move Table documentation to core - From?

  - [ ] Move Chart documentation to core - From?

  - [ ] Loop -> Query

    - [ ] Explain advantage and disadvantage (performance implications) of **filter/sort by field** after query - how it works internally. Show how to convert them to direct queries where possible.


<a name=long-term></a>
## Long-term

- [ ] Remove dependency on plugin framework

  Move modules into template system

  - [ ] AJAX
  - [ ] Date
  - [ ] HJSON
  - [x] HTML
  - [ ] Plugin settings page
  - [x] Plugin updater
  - [ ] Post type extensions: Sortable, Duplicate Posts
  - [x] Tester

