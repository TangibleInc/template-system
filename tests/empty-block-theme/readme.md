# Empty Block Theme

An empty block theme for testing, or as starting point for further development.

## Upstream

This repository was forked from https://github.com/WordPress/gutenberg/tree/trunk/test/emptytheme.

Prerequisites: `git-filter-repo` ([Splitting a subfolder out into a new repository](https://docs.github.com/en/get-started/using-git/splitting-a-subfolder-out-into-a-new-repository))

```sh
git clone --depth 1 --single-branch --branch trunk https://github.com/WordPress/gutenberg
cd gutenberg
git filter-repo --path test/emptytheme
git mv test/emptytheme/* .
rm -rf test
git branch -m trunk main
```

### Update

Add the upstream repo as a remote, and keep up to date by merging as needed.

```sh
git remote add upstream https://github.com/WordPress/gutenberg
```
