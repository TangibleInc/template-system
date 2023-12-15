# HTML

This is the foundation for a new streaming HTML parser based on the [SAX (Simple API for XML)](https://en.wikipedia.org/wiki/Simple_API_for_XML) parsing algorithm.

Other HTML parsers typically process the entire HTML document, building the full abstract syntax tree by nested function calls to parse each tag and its children.

In contrast, SAX parsers are linear and event-driven. It processes the document as a linear stream of events, each event being a parsed "atom". The parsing continues from one event to the next without holding it in memory, all within a single loop and function context.

- Needs
  - Tests to confirm feature parity with existing parser.
  - Benchmark to measure performance improvement

## Extended HTML syntax

The L&L template language requires specific features from a parser beyond regular HTML.

- Case-sensitive tag names

  A typical HTML parser converts all tag names to upper/lowercase, but we distinguish uppercase tags.

- Attributes without value in the order they were defined

  Other parsers do not maintain the order, but we need that information for the If tag.

