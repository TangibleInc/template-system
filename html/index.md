# HTML module

This is the foundation for a new streaming HTML parser based on the [SAX (Simple API for XML)](https://en.wikipedia.org/wiki/Simple_API_for_XML) parsing algorithm.

Other HTML parsers typically process the entire HTML document, building the full abstract syntax tree by nested function calls to parse each tag and its children.

In contrast, SAX parsers are linear and event-driven. It processes the document as a linear stream of events, each event being a parsed "atom". The parsing continues from one event to the next without holding it in memory, all within a single loop and function context.

Need tests to confirm feature parity of previous and current parsers.

And a benchmark to measure performance improvement.

#

The L&L template language requires specific features from a parser beyond regular HTML.

- Case-sensitive tag names: a typical HTML parser converts all tag names to upper/lowercase, but we need that information

- Attributes without value, in the order that they were defined: most parsers do not maintain the order but we need that information, especially for the If tag
