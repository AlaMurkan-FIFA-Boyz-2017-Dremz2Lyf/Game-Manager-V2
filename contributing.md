Guidelines
=========

1. Uphold the current code standard:
  - Keep your code [DRY][].
  - Apply the [boy scout rule][].
  - Follow [STYLE-GUIDE.md](STYLE-GUIDE.md)
1. Run the [tests][] before submitting a pull request.
1. Tests are very, very important. Submit tests if your pull request contains new, testable behavior.



gitGeneral Workflow
------

1. Clone down the master directly (do not fork):

  ```
  $ git clone masterURL yourdirectory
  ```

2. Create a new feature branch from master, If it's a new feature, name the branch "feat/Description". If it's a bug fix, name the branch "bug/Description".

  ```
  $ git checkout -b [issue#]-feat/Description  
  ```

  OR  

  ```
  $ git checkout -b [issue#]-bug/Description
  ```

3. Repeat This cycle for every commit

  1. Make changes and stage them for a commit to your feature branch.

    ```
    $ git add -p
    ```

  2. Commit changes (see commit message guidelines below)  

    ```
    $ git commit -m 'message'
    ```

  3. Ensure your remote master is up to date:

    ```
    $ git checkout master
    ```

    ```
    $ git pull
    ```

  4. Go back to your feature branch:

    ```
    $ git checkout branchname
    ```

  5. Sync up with latest master before pushing to remote feature branch:

    ```
    $ git pull --rebase origin master
    ```

  6. Fix any merge conflicts if necessary.
    * If you have more work to do, go back to 3.1. If you are finished move to 4.

4. Push changes to remote feature branch:

  ```
  $ git push origin branchname
  ```

5. Generate pull request on GitHub:

  ensure base: master
  ensure compare: branchname

6. Fix any issues highlighted by reviewer if necessary.

7. When everything checks out, reviewer merges pull request to master.

8. When a pull request is merged and closed, delete branchname branch.


## Detailed Workflow

### Cut a namespaced feature branch from master

Your branch should follow this naming convention:
  - [issue#]-bug/Description
  - [issue#]-feat/Description
  - [issue#]-doc/Description
  - [issue#]-cleanUp/Description

These commands will help you do this:

# Creates your branch and brings you there

git checkout -b `your-branch-name`

#### Commit Message Guidelines

- Commit messages should be written in the present tense; e.g. "Fix continuous
  integration script".
- The first line of your commit message should be a brief summary of what the
  commit changes. Aim for about 70 characters max. Remember: This is a summary,
  not a detailed description of everything that changed.
- If you want to explain the commit in more depth, following the first line should
  be a blank line and then a more detailed description of the commit. This can be
  as detailed as you want, so dig into details here and keep the first line short.

### Rebase upstream changes into your branch

Once you are done making changes, you can begin the process of getting
your code merged into the main repo. Step 1 is to rebase upstream
changes to the master branch into yours by running this command
from your branch:

```
git pull --rebase origin master
```

This will continue the rebasing process. Once you are done fixing all
conflicts you should run the existing tests to make sure you didn’t break
anything, then run your new tests (there are new tests, right?) and
make sure they work also.

If rebasing broke anything, fix it, then repeat the above process until
you get here again and nothing is broken and all the tests pass.

## Checklist:

This is just to help you organize your process

- [ ] Did I cut my work branch off of master (don't cut new branches from existing feature brances)?
- [ ] Did I follow the correct naming convention for my branch?
- [ ] Is my branch focused on a single main change?
- [ ] Do all of my changes directly relate to this change?
- [ ] Did I rebase the upstream master branch after I finished all my
  work?
- [ ] Did I write a clear pull request message detailing what changes I made?
- [ ] Did I get a code review?
- [ ] Did I make any requested changes from that code review?

If you follow all of these guidelines and make good changes, you should have
no problem getting your changes merged in.

### Make a pull request

Make a clear pull request from your fork and branch to the upstream master
branch, detailing exactly what changes you made and what feature this
should add. The clearer your pull request is the faster you can get
your changes incorporated into this repo.

At least one other person MUST give your changes a code review, and once
they are satisfied they will merge your changes into upstream. Alternatively,
they may have some requested changes. You should make more commits to your
branch to fix these, then follow this process again from rebasing onwards.

Note: A pull request will be immediately rejected if there are any conflicts!

Once you get back here, make a comment requesting further review and
someone will look at your code again. If they like it, it will get merged,
else, just repeat again.

Thanks for contributing!

<!-- Links -->
[pull request]: https://help.github.com/articles/using-pull-requests/
[DRY]: http://en.wikipedia.org/wiki/Don%27t_repeat_yourself
[boy scout rule]: http://programmer.97things.oreilly.com/wiki/index.php/The_Boy_Scout_Rule
[squashed]: http://gitready.com/advanced/2009/02/10/squashing-commits-with-rebase.html
<!-- A link to your directory of tests on github -->
[tests]: tests/
