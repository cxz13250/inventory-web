import { join } from 'path';

import { SeedConfig } from './seed.config';
// import { ExtendPackages } from './seed.config.interfaces';

/**
 * This class extends the basic seed configuration, allowing for project specific overrides. A few examples can be found
 * below.
 */
export class ProjectConfig extends SeedConfig {

  PROJECT_TASKS_DIR = join(process.cwd(), this.TOOLS_DIR, 'tasks', 'project');

  constructor() {
    super();
    // this.APP_TITLE = 'Put name of your app here';
    // this.GOOGLE_ANALYTICS_ID = 'Your site's ID';

    /* Enable typeless compiler runs (faster) between typed compiler runs. */
    // this.TYPED_COMPILE_INTERVAL = 5;

    // Add `NPM` third-party libraries to be injected/bundled.
    this.NPM_DEPENDENCIES = [
      ...this.NPM_DEPENDENCIES,
      // {src: 'jquery/dist/jquery.min.js', inject: 'libs'},
      // {src: 'lodash/lodash.min.js', inject: 'libs'},
      { src: 'bootstrap/dist/css/bootstrap.min.css', inject: true }, // inject into css section
      { src: 'bootstrap/dist/css/bootstrap-theme.min.css', inject: true }, // inject into css section
      { src: 'bootstrap/dist/css/bootstrap-theme.min.css.map', inject: true }, // inject into css section
      { src: 'admin-lte/dist/css/AdminLTE.css', inject: true},
      { src: 'admin-lte/dist/css/skins/_all-skins.css', inject: true},
    ];

    // Add `local` third-party libraries to be injected/bundled.
    this.APP_ASSETS = [
      // {src: `${this.APP_SRC}/your-path-to-lib/libs/jquery-ui.js`, inject: true, vendor: false}
      // {src: `${this.CSS_SRC}/path-to-lib/test-lib.css`, inject: true, vendor: false},
      { src: `${this.APP_SRC}/js/jquery.min.js`, inject: true, vendor: false },
      { src: `${this.APP_SRC}/js/bootstrap.min.js`,inject: true, vendor:true },
      { src: `${this.APP_SRC}/js/pnotify.custom.min.js`, inject: true, vendor: false },
      { src: `${this.APP_SRC}/js/notification.js`, inject: true, vendor: false },
      { src: `${this.APP_SRC}/js/adminlte.min.js`,inject: true, vendor:true },
      { src: `${this.APP_SRC}/js/moment.min.js`, inject: true, vendor: false },
      { src: `${this.APP_SRC}/js/daterangepicker.js`, inject: true, vendor: false },

      { src: `${this.CSS_SRC}/AdminLTE.min.css`, inject: true, vendor: false },
      { src: `${this.CSS_SRC}/dataTables.bootstrap.min.css`, inject: true, vendor: false },
      { src: `${this.CSS_SRC}/bootstrap.min.css`, inject: true, vendor: false },
      { src: `${this.CSS_SRC}/_all-skins.css`, inject: true, vendor: false },
      { src: `${this.CSS_SRC}/main.css`, inject: true, vendor: false },
      { src: `${this.CSS_SRC}/font-awesome.min.css`, inject: true, vendor: false },
      { src: `${this.CSS_SRC}/pnotify.custom.min.css`, inject: true, vendor: false },
      { src: `${this.CSS_SRC}/inventory.css`, inject: true, vendor: false },
      { src: `${this.CSS_SRC}/daterangepicker.css`, inject: true, vendor: false },
    ];

    this.ROLLUP_INCLUDE_DIR = [
      ...this.ROLLUP_INCLUDE_DIR,
      //'node_modules/moment/**'
    ];

    this.ROLLUP_NAMED_EXPORTS = [
      ...this.ROLLUP_NAMED_EXPORTS,
      //{'node_modules/immutable/dist/immutable.js': [ 'Map' ]},
    ];

    // Add packages (e.g. ng2-translate)
    // let additionalPackages: ExtendPackages[] = [{
    //   name: 'ng2-translate',
    //   // Path to the package's bundle
    //   path: 'node_modules/ng2-translate/bundles/ng2-translate.umd.js'
    // }];
    //
    // this.addPackagesBundles(additionalPackages);

    /* Add proxy middleware */
    // this.PROXY_MIDDLEWARE = [
    //   require('http-proxy-middleware')('/api', { ws: false, target: 'http://localhost:3003' })
    // ];

    /* Add to or override NPM module configurations: */
    // this.PLUGIN_CONFIGS['browser-sync'] = { ghostMode: false };
  }

}
