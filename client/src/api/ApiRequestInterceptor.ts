import { HttpErrorResponse, HttpEvent,  HttpHandlerFn, HttpInterceptorFn, HttpRequest } from "@angular/common/http";
import { Observable,  of} from "rxjs";
import { catchError } from 'rxjs/operators';

export const apiRequestInterceptor : HttpInterceptorFn = (req : HttpRequest<any>,next : HttpHandlerFn ) : Observable<HttpEvent<any>> => {

    const token = localStorage.getItem('token');
    const baseUrl = 'http://localhost:8000/api'; 
    
    let apiReq = req.clone({
        url: baseUrl + req.url
    });

    if (token) {
        apiReq = apiReq.clone({
            setHeaders: {
                Authorization: `Token ${token}`
            }
        });
    }
    return next(apiReq).pipe(
        catchError((error: HttpErrorResponse) => {
            console.error('Error request', error);
            return of(error.error);
          })
    )
}