# ESM+CJS packaging issue reproduction

This is a simple reproduction of a problem encountered when trying to follow the steps described in https://github.com/andrewbranch/example-subpath-exports-ts-compat/tree/main/examples/node_modules/types-versions-wildcards.

In this project, subpath exports live in separate subdirectories.

## Problem

We could not find the `typesVersions` value that makes TS correctly resolve both the root export and subpath exports under `node10`.

```json
"types": "index.d.ts",
"typesVersions": {
  "*": {
    "*": [
      "build/cjs/*"
    ]
  }
},
```

causes the subpath export types to be unresolved

```json
"types": "index.d.ts",
"typesVersions": {
  "*": {
    ".": [
      "build/cjs/index.d.ts"
    ],
    "*": [
      "build/cjs/*/index.d.ts"
    ]
  }
},
```

causes the root export types to be unresolved.

## Reproduction steps

1. Install dependencies: `pnpm i`.
2. Build the package: `pnpm build`. This runs tsc twice, building CJS and ESM version in the ./build directory.
3. Run `pnpm attw`. This checks the output with `@arethetypeswrong/cli`.
