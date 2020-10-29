import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ApiUrlInterceptor implements HttpInterceptor {
    constructor() {}

    intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        const clone = request.clone({
            url: `${environment.apiURL}${request.url}`,
        });
        return next.handle(clone).pipe(
            catchError((error: HttpErrorResponse) => {
                if (error.error instanceof ErrorEvent) {
                    console.error('An error occurred:', error.error.message);
                } else {
                    console.error(
                        `Backend returned code ${error.status}, ` +
                            `body was: ${error.message}`
                    );
                }
                return throwError('An error occurred, please try again later.');
            })
        );
    }
}
