import * as koaViews from 'koa-views';

type KoaViewsOptions = Omit<Parameters<typeof koaViews>[1], 'autoRender'>;

export interface ViewsOptions extends KoaViewsOptions {
    dir: string;
}
