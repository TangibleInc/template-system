# @tangible/git-subrepo

Wrapper to use [git-subrepo](https://github.com/ingydotnet/git-subrepo) as NPM package and command

## Prerequisites

- Node.js 18 or above
- Bash 3.2 or above
- Git 2.7 or above

## Install

```sh
npm install --save @tangible/git-subrepo
```

## Use

#### From command line

```sh
npx git-subrepo
npx git-subrepo status example-folder
```

#### From NPM script

```sh
{
  "scripts": {
    "subrepo": "git-subrepo"
  }
}
```

Run commands

```sh
npm run subrepo
npm run subrepo status example-folder
```

## Changes

Changes from the original:

- Consolidate to single file - see `./bin`
- Installed as dev dependency of the project using it, instead of registering a global Git command

## Commands

For the complete list, see: https://github.com/ingydotnet/git-subrepo/tree/master#commands

### Init

`git-subrepo init <subdir> [-r <remote>] [-b <branch>] [--method <merge|rebase>]`

Turn an existing subdirectory into a subrepo.

If you want to expose a subdirectory of your project as a published subrepo,
this command will do that. It will split out the content of a normal
subdirectory into a branch and start tracking it as a subrepo. Afterwards
your original repo will look exactly the same except that there will be a
`<subdir>/.gitrepo` file.

If you specify the `--remote` (and optionally the `--branch`) option, the
values will be added to the `<subdir>/.gitrepo` file. The `--remote` option
is the upstream URL, and the `--branch` option is the upstream branch to push
to. These values will be needed to do a `git-subrepo push` command, but they
can be provided later on the `push` command (and saved to `<subdir>/.gitrepo`
if you also specify the `--update` option).

Note: You will need to create the empty upstream repo and push to it on your
own, using `git-subrepo push <subdir>`.

The `--method` option will decide how the join process between branches
are performed. The default option is merge.

The `init` command accepts the `--branch=` and `--remote=` options.

### Pull

`git-subrepo pull <subdir>|--all [-M|-R|-f] [-m <msg>] [--file=<msg file>] [-e] [-b <branch>] [-r <remote>] [-u]`

Update the subrepo subdir with the latest upstream changes.

The `pull` command fetches the latest content from the remote branch pointed
to by the subrepo's `.gitrepo` file, and then tries to merge the changes into
the corresponding subdir. It does this by making a branch of the local
commits to the subdir and then merging or rebasing (see below) it with the
fetched upstream content. After the merge, the content of the new branch
replaces your subdir, the `.gitrepo` file is updated and a single 'pull'
commit is added to your mainline history.

The `pull` command will attempt to do the following commands in one go:

```sh
git-subrepo fetch <subdir>
git-subrepo branch <subdir>
git merge/rebase subrepo/<subdir>/fetch subrepo/<subdir>
git-subrepo commit <subdir>
git update-ref refs/subrepo/<subdir>/pull subrepo/<subdir>
```

Like the `clone` command, `pull` will squash all the changes (since the last
pull or clone) into one commit. This keeps your mainline history nice and
clean. You can easily see the subrepo's history with the `git log` command:

```sh
git log refs/subrepo/<subdir>/fetch
```

The `pull` command accepts the `--all`, `--branch=`, `--edit`, `--file`,
`--force`, `--message=`, `--remote=` and `--update` options.

### Push

`git-subrepo push <subdir>|--all [<branch>] [-m msg] [--file=<msg file>] [-r <remote>] [-b <branch>] [-M|-R] [-u] [-f] [-s] [-N]`

Push a properly merged subrepo branch back upstream.

This command takes the subrepo branch from a successful pull command and
pushes the history back to its designated remote and branch. You can also use
the `branch` command and merge things yourself before pushing if you want to
(although that is probably a rare use case).

The `push` command requires a branch that has been properly merged/rebased
with the upstream HEAD (unless the upstream HEAD is empty, which is common
when doing a first `push` after an `init`). That means the upstream HEAD is
one of the commits in the branch.

By default the branch ref `refs/subrepo/<subdir>/pull` will be pushed, but
you can specify a (properly merged) branch to push.

After that, the `push` command just checks that the branch contains the
upstream HEAD and then pushes it upstream.

The `--force` option will do a force push. Force pushes are typically
discouraged. Only use this option if you fully understand it. (The `--force`
option will NOT check for a proper merge. ANY branch will be force pushed!)

The `push` command accepts the `--all`, `--branch=`, `--dry-run`, `--file`,
`--force`, `--merge`, `--message`, `--rebase`, `--remote=`, `--squash` and
`--update` options.

### Fetch

`git-subrepo fetch <subdir>|--all [-r <remote>] [-b <branch>]`

Fetch the remote/upstream content for a subrepo.

It will create a Git reference called `subrepo/<subdir>/fetch` that points at
the same commit as `FETCH_HEAD`. It will also create a remote called
`subrepo/<subdir>`. These are temporary and you can easily remove them with
the subrepo `clean` command.

The `fetch` command accepts the `--all`, `--branch=` and `--remote=` options.

### Clone

`git-subrepo clone <repository> [<subdir>] [-b <branch>] [-f] [-m <msg>] [--file=<msg file>] [-e] [--method <merge|rebase>]`

Add a repository as a subrepo in a subdir of your repository.

This is similar in feel to `git clone`. You just specify the remote repo
url, and optionally a sub-directory and/or branch name. The repo will be
fetched and merged into the subdir.

The subrepo history is /squashed/ into a single commit that contains the
reference information. This information is also stored in a special file
called `<subdir>/.gitrepo`. The presence of this file indicates that the
directory is a subrepo.

All subsequent commands refer to the subrepo by the name of the /subdir/.
From the subdir, all the current information about the subrepo can be
obtained.

The `--force` option will "reclone" (completely replace) an existing subdir.

The `--method` option will decide how the join process between branches are
  performed. The default option is merge.

The `clone` command accepts the `--branch=` `--edit`, `--file`, `--force`
and `--message=` options.
