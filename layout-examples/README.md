# Layout Examples

A collection of 30 production-ready HTML layout templates using the Tangible Template System syntax. These layouts are designed to be accessible, responsive, and easy to customize.

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
