import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
// import { defineCustomElements } from 'swiper/element/bundle';
import { AppModule } from './app/app.module';
// defineCustomElements();


platformBrowserDynamic().bootstrapModule(AppModule, {
  ngZoneEventCoalescing: true
})
  .catch(err => console.error(err));
