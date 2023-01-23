# Defiantly patch `aws-cdk-lib` 😈

This package patches the [aws-cdk-lib](https://www.npmjs.com/package/aws-cdk-lib)'s `package.json#exports` to add `core` as an individual export so that it can be imported without importing all libraries in the AWS CDK (which is crazy slow and resource intensive).

## How

It runs a `postinstall` script that discovers the installed aws-cdk-lib and hot-fixes its exports.

```json
"exports": {
  // ..
  "./core": "./core/index.js"
}
```

## Installation

Just add this package as a dependency alongside the `aws-cdk-lib` and install.

```json
{
  "dependencies": {
    "aws-cdk-lib": "*",
    "defiantly-patch-aws-cdk-lib": "*"
  }
}
```

Install using whatever your package manager's command is:

```
npm i
yarn
pnpm i
```

## Why

This is exceptionally bad practice and naughty 🙈, but AWS has rejected multiple one-line PRs attempting to contribute this fix to the core library with [dogmatic reasoning](https://github.com/aws/aws-cdk/pull/17986#issuecomment-994770587). We love the capability provided to us by the CDK but have been disappointed with the lack of support from the AWS team in improving performance. This protest can hopefully catalyze the change we need.

Rejected PRs:

- https://github.com/aws/aws-cdk/pull/17986
- https://github.com/aws/aws-cdk/pull/21563
