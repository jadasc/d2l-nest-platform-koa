import { INestApplication } from '@nestjs/common';
import * as koaStatic from 'koa-static';
import { ViewsOptions } from './views-options.interface';

export interface NestKoaApplication extends INestApplication {
    /**
     * Sets a base directory for public assets.
     * Example `app.useStaticAssets('public')`
     *
     * @returns {this}
     */
     useStaticAssets(root: string, opts?: koaStatic.Options & { prefix?: string }): this;

     /**
      * Sets a view engine and base directory for templates (views).
      * @example
      * app.setViewEngine({ dir: 'views', map: { hbs: 'handlebars' } })
      * @see ViewsOptions
      *
      * @returns {this}
      */
     setViewEngine(opts: ViewsOptions): this;
}
