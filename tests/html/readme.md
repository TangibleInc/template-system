# Comprehensive HTML test suite and profiler

## Sources

HTML files for testing were gathered from:

- [Parse5](https://github.com/inikulin/parse5)
- [Prettier](https://github.com/prettier/prettier)
- [Unified](https://github.com/syntax-tree/hast-util-from-html)

## Run

From project root, start `wp-env` with `xdebug` enabled.

```sh
npm run start:xdebug
```

Run the profiler.

```sh
npm run html:profile
```

Create new snapshots of correctly parsed and rendered HTML.  

```sh
npm run html:snapshot
```

## Result

### 2024-02-20

HTML engine:    v1 
Parsed files:   188
Parsed bytes:   111.46 KB

Time:           114.45 ms = 49.18 ms (parse) + 65.27 ms (render)
Memory usage:   4.77 MB = 3.79 MB (parse) + 0.98 MB (render)
Function calls: 375293 = 161110 (parse) + 214183 (render)
