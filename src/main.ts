// import { bootstrapApplication } from '@angular/platform-browser';
// import { appConfig } from './app/app.config';
// import { App } from './app/app';
// import { HTTP_INTERCEPTORS, provideHttpClient } from '@angular/common/http';
// import { LoaderInterceptor } from './app/interceptors/loader.interceptor';

// bootstrapApplication(App, {
//   ...appConfig,
//   providers: [
//     ...appConfig.providers || [],
//     provideHttpClient(),
//     {
//       provide: HTTP_INTERCEPTORS,
//       useClass: LoaderInterceptor,
//       multi: true,
//     },
//   ],
// }).catch((err) => console.error(err));


// frontend/src/main.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config'; // <-- IMPORTANT: Import your appConfig
import { App } from './app/app';

// REMOVE these lines if they are present in your main.ts
// import { HTTP_INTERCEPTORS, provideHttpClient } from '@angular/common/http';
// import { LoaderInterceptor } from './app/interceptors/loader.interceptor';

// Bootstrap the application using your appConfig, which now contains HttpClient and the interceptor
bootstrapApplication(App, appConfig).catch((err) => console.error(err));