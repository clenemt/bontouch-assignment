# bontouch-assignment

A sample react assignment. Feel free to fork, copy and modify as needed.

## Example

See https://bontouch-assignment.netlify.app for a look at the code live. :rocket:

## Usage

First install the dependencies:

```sh
npm install
```

Then you can:

| Command               | Description                                  |
| --------------------- | -------------------------------------------- |
| **`npm run start`**   | Run the website on http://localhost:3000     |
| **`npm run build`**   | Build the production version inside `/build` |
| **`npm run test`**    | Run the tests                                |
| **`npm run tsc`**     | Run TypeScript type-checking                 |
| **`npm run lint`**    | Run eslint                                   |
| **`npm run format`**  | Run prettier and eslint with `--fix`         |

This projects uses TypeScript with create-react-app.

## Explanation

It only runs **thanks to**:

- [create-react-app](https://create-react-app.dev/)
- [axios](https://github.com/axios/axios) for the promise based HTTP client

## Guidelines

- [Prettier](https://github.com/prettier/prettier) is used for style consistencies in all files
- [ESlint](http://eslint.org/) is used for linting
- [EditorConfig](http://editorconfig.org/) is used to enforce correct spacings on all files
- The above is **enforced when you try to commit**
- Commits should be in the form of:

```
<type>(<scope>): <subject>

<type>: build, ci, chore, docs, feat, fix, perf, refactor, revert, style, test
<scope>: the scope of the commit
<subject>: a short imperative subject

feat(search): Add focus to input field
chore(webpack): Migrate to webpack 2
test(react): Add carousel unit tests
```

See [conventional commits](https://www.conventionalcommits.org).
