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

<a name=template-system></a>
## Template System

<a name=issues></a>
### Issues

- [x] [ACF select loop displaying item text with spaces](https://app.clickup.com/t/2ew8a2p)

- [x] [ACF image url field doesn't respond as expected when size is defined](https://app.clickup.com/t/20e4aj8)

  ```html
  <Field acf_image=cc_taxonomy_image field=url size=medium />
  ```

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

- [ ] [Add orderby_field_date as loop query parameter](https://app.clickup.com/t/mryg89)

  Use orderby_field_number for format "yyyymmdd", or sort

  https://loop.tangible.one/tags/loop/filter#sort-by-field

  - [ ] Support `date_format` attribute for sort by field when using sort_type=date

    `/loop/types/base/index.php` sort_by_field()


- [x] [A way to set dynamic tag attributes without value, like selected](https://app.clickup.com/t/2fz1n1n)

  ```html
  <div tag-attributes="selected">
  ```

- [ ] [A way to set any arbitrary query parameter for WP_Query](https://app.clickup.com/t/2epyw36)

  Post loop: Support `custom_query` parameter

- [ ] [Taxonomy term loop: Order by random](https://app.clickup.com/t/2epyw3d)

  [WP_Term_Query](https://developer.wordpress.org/reference/classes/WP_Term_Query/__construct/#parameters) does not support orderby random

- [ ] [Comment loop type and fields](https://app.clickup.com/t/2nfveej)

  `/template-system/loop/types/comment`

- [ ] [A way to create shortcode from template](https://app.clickup.com/t/2epyw21)


- [ ] Markdown block

- [ ] Prism block - Select language


- [ ] [Site content structure](https://app.clickup.com/t/2kwfp1t) 
  
  In admin screen, Dashboard -> Content


<a name=feature-projects></a>

## Feature projects

<a name=template-editor></a>

### Template Editor

#### Issues

- [x] [Conflict with multiple versions of HTML Lint](https://app.clickup.com/t/2epduaf)

  Use namespaced/prefixed fork of HTML Lint to avoid conflict with other plugins loading a different version of the same library

- [ ] AJAX save
  - [ ] AJAX nonce expiring after a day with same browser tab
  - [ ] When navigating elsewhere in admin, sometimes there's a confirmation dialog "Information you've entered may not be saved"

    It's because WordPress admin screen keeps track of when post content changed and unsaved. Somehow this state must be updated on AJAX save.

  - [ ] [Template slug not getting saved?](https://app.clickup.com/t/2f7h6h9)


#### Features

- [x] [Restore current tab after save and page reload](https://app.clickup.com/t/2qaj91n)

- [ ] Remember and restore editor height when template editor resized

- [ ] [Option to see editor and preview side-by-side](https://app.clickup.com/t/2qajc6d)

#### Long-term

- [ ] Prepare base for CodeMirror 6



<a name=import-and-export></a>

### Import and Export

- Issues

  - [x] [Field `style_compiled` not updated on import overwrite](https://app.clickup.com/t/2ju40r9)

  - [x] Export all template types with orderby=menu_order, to ensure that location rules are applied in the correct order

  - [x] [Layout templates should export/import textual description of location rules (displayed in the archive screen)](https://app.clickup.com/t/2nfvcpe)

- Feature requests

  - [ ] [Export in ZIP format](https://app.clickup.com/t/2nfvd7g)

  - [ ] Export single template from its edit screen

  - [ ] Export/import tangible-export-config.json

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


<a name=pagination></a>

### Pagination

- Additional navigation buttons

  - first/last
  - next/previous

  - Text `First Previous 1 2 3 4 5 Next Last`
  - Icons `<< < 1 2 3 4 5 > >>`

  - ? What attributes we should add to the PaginateButtons tags to make this the most flexible

- Option to update the URL on page navigation
- Support using Paginate Buttons before the loop
- Option to load more posts (automatically or by button)

<a name=slider></a>

### Slider

- Improve accessibility
- Make controls more customizable


<a name=gutenberg-integration></a>

### Gutenberg Integration

- [x] Current post ("default loop context") in builder preview



<a name=beaver-integration></a>

### Beaver Integration

- [ ] [Issue with Beaver Builder preview and current post](https://app.clickup.com/t/2epyw3b)

- [ ] [Issues when using templates in a Custom Post Layout in Beaver Themer](https://app.clickup.com/t/2f7jgrg)

  issues when they refer to an L&L template using a shortcode inside a Custom Post Layout in Beaver Themer

  https://discourse.tangible.one/t/acf-relationship-loop-inside-of-a-beaver-builder-post-loop/654/5

  Install L&L, Beaver Builder, and Beaver Themer

  ```html
  <strong>Here are the category terms for this post:
    <Loop taxonomy=category post=current>
      <span style="color:red;"><Field title /></span>
    </Loop>
  </strong>
  ```

  Then I've created a theme layout and applied it to my blog archive. In the "Posts" module, I've changed the Post Layout to Custom and you can see in the screenshot below have I've added a template shortcode to the Custom Post Layout to make the template run for each instance of a post. 

  Working. Note that the post template above appears like the screenshot above both when I'm in the Beaver Builder editor as well as after I save the page in BB and view the post archive on the front end of the site. So far this is working exactly as expected.


  ```html
  <strong>Here are the category terms for the post titled <Field title />:
  ```

  Frontend: Every post shows the fields from one post

  when I view the theme layout from the builder, you can see that every odd post (first, third, fifth, etc.) displays fields from the "blog archive" page and every even post (second, fourth, sixth, etc.) displays the correct fields from that current post that Themer is looping through
  

<a name=elementor-integration></a>

### Elementor Integration

- [ ] [L&L code editor not appearing in Elementor](https://app.clickup.com/t/2k5gumm)


<a name=documentation></a>

## Documentation

- [Things to add/fix/clarify in L&L docs](https://app.clickup.com/t/2ew3taf)

  - [x] If tag: As per this forum thread, it's not clear that "subject" and "core condition" basically mean the same thing. But the page indicates that subjects are required, but not that core conditions are required, leading to some confusion.

  - [x] List loop: the syntax is incorrect (what is supposed to be an opening loop tag has a self-closing slash at the end which breaks the code: `<Loop list=numbers />`)

  - [x] If tag: add an explanation next to each comparison explaining how each one works

  - [x] Where are L&L variables stored and where are they accessible from? Local variables "only exist within a template post or file" so does this mean that regular variables are accessible on other templates on the same page? Or other pages visited by the same user? If the variable is available elsewhere on the page, is it only available below the template that created the variable or everywhere?

  - [x] What does the route=".."  core condition accept? does it accept a value attribute after it? Does it use the same attributes as the Route tag?

  - [ ] Does Field excerpt auto=true always display an auto-generated excerpt, or only when there isn't a manual excerpt?

  - [ ] What's the difference between a module and a tag?
    
    A "feature module", such as the Table or Chart module, usually includes a PHP/JS/CSS library, with one main tag and sometimes local tags inside it.

  - [ ] Move table documentation to core

    From: 

  - [ ] Loop features -> Query: rename this page to "Filter"

    - [ ] Explain how it works internally, the performance implications of doing filter/sort by field after query, and showing how to do them as direct queries where possible

  - [x] Loop type: User: There's a blank entry in the docs for "fields"


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

