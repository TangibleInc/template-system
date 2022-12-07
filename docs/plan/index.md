<Set site_title>Template System: Plan</Set>

<h1><Get site_title></h1>
<Meta title><Get site_title></Meta>

## Current

- [x] Sass variable causing error - https://app.clickup.com/t/3dtzka0

```html
<Set sass=color type=color>#ff0000</Set>
<p>Here's some <span class=sass-color>red</span> text!</p>
```

```scss
.sass-color {
  color: $color;
}
```


