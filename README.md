# `eslint-webpack-plugin`

## No Issue

With `eslint-webpack-plugin@2.5.4`

`npm start`

no issues reported

## Issue

Update to `eslint-webpack-plugin@3.0.0`

```bash
$ npm run repack
$ npm start
```

### Error
```
TypeError [ERR_UNKNOWN_FILE_EXTENSION]: Unknown file extension ".ts" for /project_path/react-typescript/.webpack/dev.config.ts
```

### Note

In `.webpack/dev.config.ts` uncomment the `ESLintPlugin`

```
new ESLintPlugin({
  extensions: ['js', 'jsx', 'ts', 'tsx']
})
```

`npm start` and error goes away
