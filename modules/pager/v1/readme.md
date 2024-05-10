# Paginator v1

Example

```html
<ul>
  <Loop type=post paged=2>
    <li>
      <a href="{Field url}"><Field title /></a>
    </li>
  </Loop>
</ul>

<PaginateButtons />

<PaginateFields>
  Page <Field current_page /> of <Field total_pages />
</PaginateFields>
```
