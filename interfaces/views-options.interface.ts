export interface ViewsOptions {
    dir: string;
    /*
    * default extension for your views
    */
    extension?: string;
    /*
    * these options will get passed to the view engine
    */
    options?: any; // eslint-disable-line @typescript-eslint/no-explicit-any
    /*
    * map a file extension to an engine
    */
    map?: any; // eslint-disable-line @typescript-eslint/no-explicit-any
    /*
    * replace consolidate as default engine source
    */
    engineSource?: any; // eslint-disable-line @typescript-eslint/no-explicit-any
}
