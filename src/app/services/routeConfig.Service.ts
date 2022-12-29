import  {InjectionToken} from '@angular/core';
import { environment } from 'src/environments/environment';
import { RouteConfig } from './routeConfig';

export const RouteConfigToken = new InjectionToken<RouteConfig>('routeConfig');

