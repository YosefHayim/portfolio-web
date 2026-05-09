# Issue Tracker: GitHub

Issues and PRDs for this repo live in GitHub Issues for `YosefHayim/portfolio`. Use the `gh` CLI for issue tracker operations.

## Conventions

- Create an issue: `gh issue create --title "..." --body "..."`
- Read an issue: `gh issue view <number> --comments`
- List issues: `gh issue list --state open --json number,title,body,labels,comments`
- Comment on an issue: `gh issue comment <number> --body "..."`
- Apply or remove labels: `gh issue edit <number> --add-label "..."` / `--remove-label "..."`
- Close an issue: `gh issue close <number> --comment "..."`

Run `gh` commands from the repo root so the repository is inferred from `git remote -v`.

## Skill Behavior

When a skill says "publish to the issue tracker", create a GitHub issue.

When a skill says "fetch the relevant ticket", run `gh issue view <number> --comments`.
