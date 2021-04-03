# monorepo-tsconfig-experiment
This repository exposes a configuration issue with Typescript I can't get past.

First, install dependencies:
```
$ npm run install-all
```

Then run app:
```
$ cd apps/app
$ npm start
> app@0.0.0 start
> ts-node src/app.ts

/monorepo-tsconfig-experiment/apps/app/node_modules/ts-node/src/index.ts:513
    return new TSError(diagnosticText, diagnosticCodes)
           ^
TSError: ⨯ Unable to compile TypeScript:
../../libs/lib/src/index.ts:4:3 - error TS2564: Property 'uninitializedProperty' has no initializer and is not definitely assigned in the constructor.

4   uninitializedProperty: string
    ~~~~~~~~~~~~~~~~~~~~~

    at createTSError (/monorepo-tsconfig-experiment/apps/app/node_modules/ts-node/src/index.ts:513:12)
    at reportTSError (/monorepo-tsconfig-experiment/apps/app/node_modules/ts-node/src/index.ts:517:19)
    at getOutput (/monorepo-tsconfig-experiment/apps/app/node_modules/ts-node/src/index.ts:752:36)
    at Object.compile (/monorepo-tsconfig-experiment/apps/app/node_modules/ts-node/src/index.ts:968:32)
    at Module.m._compile (/monorepo-tsconfig-experiment/apps/app/node_modules/ts-node/src/index.ts:1056:42)
    at Module._extensions..js (node:internal/modules/cjs/loader:1138:10)
    at Object.require.extensions.<computed> [as .ts] (/monorepo-tsconfig-experiment/apps/app/node_modules/ts-node/src/index.ts:1059:12)
    at Module.load (node:internal/modules/cjs/loader:989:32)
    at Function.Module._load (node:internal/modules/cjs/loader:829:14)
    at Module.require (node:internal/modules/cjs/loader:1013:19)
```

So `app` fails because a property has no initializer in `lib`, but if we go to `lib` and run its tests it works fine:
```
$ cd ../../libs/lib 
$ npm test
Ran all test suites.
```

This failure occurs because `lib` contains Typescript code that fails when strict is true, but is okay when strict is false. And `app` enables strict, and `lib` has it disabled.

But somehow `app` uses its **own** tsconfig file when running `lib` code, resulting in the above error. But I want `lib` code to run with the settings **it** specifies. How can I do that?
