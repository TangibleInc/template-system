# Layout Examples

A collection of 40 production-ready templates using the Tangible Template System syntax:
- **30 HTML layout templates** - Accessible, responsive, and customizable
- **10 Schema.org JSON-LD templates** - SEO-ready structured data

## Template Syntax

These layouts use Tangible's template tags:
- `<Loop>` - Iterate over content (posts, users, terms, etc.)
- `<Field>` - Display dynamic field values
- `<If>` / `<Else>` - Conditional logic
- `<Date>` - Date formatting

## Layout Categories

### Hero Sections (01-03)
| File | Description |
|------|-------------|
| `01-hero-centered.html` | Centered hero with CTA buttons |
| `02-hero-split.html` | Split layout with image |
| `03-hero-video-background.html` | Video background with overlay |

### Blog & Posts (04-08)
| File | Description |
|------|-------------|
| `04-blog-grid-cards.html` | 3-column card grid |
| `05-blog-featured-posts.html` | Large hero + featured cards |
| `06-blog-list-sidebar.html` | List layout with sidebar widgets |
| `07-blog-masonry.html` | Masonry grid with filters |
| `08-blog-magazine.html` | Magazine-style multi-section |

### Features & Services (09-12)
| File | Description |
|------|-------------|
| `09-features-icon-grid.html` | Icon-based feature grid |
| `10-services-alternating.html` | Alternating image/text rows |
| `11-features-tabs.html` | Tabbed feature interface |
| `12-features-comparison.html` | Feature comparison table |

### Testimonials & Team (13-16)
| File | Description |
|------|-------------|
| `13-testimonials-carousel.html` | Slider with trust badges |
| `14-testimonials-grid.html` | Grid with featured testimonial |
| `15-team-grid.html` | Team member grid with social |
| `16-team-cards.html` | Leadership cards with bios |

### Pricing & CTAs (17-20)
| File | Description |
|------|-------------|
| `17-pricing-cards.html` | 3-tier pricing cards |
| `18-cta-banner.html` | Multiple CTA banner styles |
| `19-newsletter.html` | Newsletter subscription forms |
| `20-stats-counter.html` | Statistics & counter sections |

### Gallery & Portfolio (21-24)
| File | Description |
|------|-------------|
| `21-gallery-grid.html` | Filterable project grid |
| `22-portfolio-cases.html` | Case study showcase |
| `23-gallery-masonry.html` | Masonry lightbox gallery |
| `24-products-grid.html` | E-commerce product grid |

### Utility Layouts (25-30)
| File | Description |
|------|-------------|
| `25-faq-accordion.html` | Accordion FAQ section |
| `26-contact-form.html` | Contact form with info sidebar |
| `27-footer-complete.html` | Multi-column footer |
| `28-header-navigation.html` | Mega-menu navigation header |
| `29-author-bio.html` | Author bio box variations |
| `30-related-posts.html` | Related posts & navigation |

### Schema.org JSON-LD (schema-01 to schema-10)
| File | Schema Type | Usage |
|------|-------------|-------|
| `schema-01-article.html` | Article | Blog posts, news articles |
| `schema-02-product.html` | Product | E-commerce, product reviews |
| `schema-03-faq.html` | FAQPage | FAQ sections with Q&A |
| `schema-04-howto.html` | HowTo | Tutorials, step-by-step guides |
| `schema-05-recipe.html` | Recipe | Food recipes with ingredients |
| `schema-06-event.html` | Event | Events, conferences, meetups |
| `schema-07-localbusiness.html` | LocalBusiness | Business listings, storefronts |
| `schema-08-person.html` | Person | Author pages, team profiles |
| `schema-09-video.html` | VideoObject | Video content, embeds |
| `schema-10-breadcrumb.html` | BreadcrumbList | Navigation breadcrumbs |

## Schema Template Usage

Schema templates use shortcode arguments for dynamic values:

```
[template name=schema-product rating=4.5 rating_count=120 price=29.99]
```

### Available Arguments by Schema Type

**Product** (`schema-02-product.html`):
- `rating` - Rating value (default: 5)
- `rating_count` - Number of ratings (default: 1)
- `price` - Product price (default: 0)
- `currency` - Currency code (default: USD)
- `availability` - InStock, OutOfStock, PreOrder

**Recipe** (`schema-05-recipe.html`):
- `prep_time` - ISO 8601 duration (default: PT15M)
- `cook_time` - ISO 8601 duration (default: PT30M)
- `servings` - Number of servings (default: 4)
- `rating`, `rating_count`

**LocalBusiness** (`schema-07-localbusiness.html`):
- `business_type` - Schema type (default: LocalBusiness)
- `phone`, `email`, `street`, `city`, `state`, `postal_code`
- `rating`, `rating_count`

### Important: Script Tag Workaround

Schema templates use `<Set>` + `<Raw>` pattern because `<script>` tags don't process template syntax:

```html
<Loop type=post id=current>
<Set schema_json>{
    "@type": "Article",
    "name": "<Field title />"
}</Set>
</Loop>
<Raw><script type="application/ld+json"></Raw><Get schema_json /><Raw></script></Raw>
```

## CSS Classes Used

These layouts use utility classes from the design system:

### Grid System
- `grid-2`, `grid-3`, `grid-4`, `grid-6` - Column grids
- `grid-2-1`, `grid-3-1`, `grid-3-2`, `grid-4-1` - Asymmetric grids
- `gap-single`, `gap-double` - Grid gaps

### Spacing
- `mb-none`, `mb-small`, `mb-half`, `mb-single`, `mb-double` - Margins
- `block-single-tb`, `block-double-tb`, `block-triple-tb` - Section padding

### Layout
- `inner` - Content container
- `text-center`, `text-right` - Text alignment
- `items-center`, `items-end` - Flex alignment

### Components
- `button`, `button-primary`, `button-outline`, `button-lg` - Buttons
- `section-header`, `section-label`, `section-title` - Section headers

## Accessibility Features

All layouts include:
- Semantic HTML5 elements (`<section>`, `<article>`, `<nav>`, `<aside>`)
- ARIA labels and landmarks
- `aria-labelledby` connections
- Skip links support
- Keyboard navigation support
- Screen reader considerations

## Usage

1. Copy the desired layout HTML
2. Customize the Loop queries for your content types
3. Adjust CSS classes as needed
4. Modify text content and images

## Example

```html
<Loop type=post count=3 orderby=date order=DESC>
    <article class="post-card">
        <h3><Field title /></h3>
        <p><Field excerpt words=20 /></p>
        <a href="{Field url}">Read more</a>
    </article>
</Loop>
```
