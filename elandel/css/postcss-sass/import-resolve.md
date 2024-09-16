# Import Resolve Algorithm

When `@import` is called, the following high-level algorithm is used to resolve
the location of a file within `url(id)` from `cwd`:

1. if `id` begins with `/`
   1. `cwd` is the filesystem root
2. `file` is `cwd/id`
3. `base` is base path of `file`
4. `dir` is directory path of `file`
5. if `base` ends with `.sass`, `.scss`, or `.css`
   1. test whether `file` exists
   2. if `base` does not start with `_`
      1. test whether `dir/_base` exists
6. otherwise
   1. test whether `dir/base.scss` exists
   2. test whether `dir/base.sass` exists
   3. test whether `dir/base.css` exists
   4. if `base` does not start with `_`
      1. test whether `dir/_base.scss` exists
      2. test whether `dir/_base.sass` exists
      3. test whether `dir/_base.css` exists
6. if the length of existing files is `1`
   1. return the existing file
7. otherwise, if the length of existing files is greater than `1`
   1. throw `"It's not clear which file to import"`
8. otherwise, if `base` does not end with `.css`
   1. throw `"File to import not found or unreadable"`
