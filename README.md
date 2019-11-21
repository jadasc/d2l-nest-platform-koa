# D2L Nest Platform Koa

## Description

[Koa](https://koajs.com/) adapter for [Nest](https://github.com/nestjs/nest).

## Installation

```bash
$ npm install --save d2l-nest-platform-koa
$ # Not required if `bodyParser` option is set to false
$ npm install --save koa-bodyparser
$ # Optional depending on app configuration. See `NestApplicationOptions` from '@nestjs/common' module
$ npm install --save @koa/cors koa-mount koa-static koa-views
```

## Usage

### Typescript

```typescript
import { NestFactory } from '@nestjs/core';
import { KoaAdapter, NestKoaApplication } from 'd2l-nest-platform-koa';
import { ApplicationModule } from './app.module';

const app = await NestFactory.create<NestKoaApplication>(
  ApplicationModule,
  new KoaAdapter(),
);
```

### Javascript

```javascript
import { NestFactory } from '@nestjs/core';
import { KoaAdapter } from 'd2l-nest-platform-koa';
import { ApplicationModule } from './app.module';

const app = await NestFactory.create(
  ApplicationModule,
  new KoaAdapter(),
);
```

## Test

```bash
# unit tests
$ npm test

# test coverage
$ npm run test:cov
```

## Versioning

d2l-nest-platform-koa is maintained under [the Semantic Versioning guidelines](http://semver.org/).

## Contributing

Please read through our [contributing guidelines](CONTRIBUTING.md). Included are directions for opening issues, coding standards, and notes on development.
