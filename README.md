# D2L Nest Platform Koa

[![CircleCI](https://circleci.com/gh/Brightspace/d2l-nest-platform-koa.svg?style=svg)](https://circleci.com/gh/Brightspace/d2l-nest-platform-koa)

## Description

[Koa](https://koajs.com/) adapter for [Nest](https://github.com/nestjs/nest).

## Installation

```bash
$ npm install --save d2l-nest-platform-koa
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
