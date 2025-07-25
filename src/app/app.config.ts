import { ApplicationConfig, provideZoneChangeDetection } from "@angular/core";
import { provideHttpClient, withInterceptors } from "@angular/common/http";
import { authInterceptor } from "./interceptors/auth.interceptor";

export const appConfig: ApplicationConfig = {
    providers: [
        provideZoneChangeDetection({ eventCoalescing: true }),
        //provideRouter(routes),
        provideHttpClient(
            withInterceptors([authInterceptor])), //Recibe los interceptores que vamos a usar
    ],
};