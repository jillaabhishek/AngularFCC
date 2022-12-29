import { Injectable, Inject } from '@angular/core';
import { RouteConfig } from './routeConfig';
import { RouteConfigToken } from './routeConfig.Service';

@Injectable({
  providedIn: 'any'
})
export class ConfigService {

  constructor(@Inject(RouteConfigToken) private routeConfig: RouteConfig) { 
    console.log(routeConfig);
  }
}
