import { ErrorHandler, Injectable } from "@angular/core";
import { HttpErrorResponse } from "@angular/common/http";

@Injectable({providedIn: 'root'})
export class GlobalErrorHandler implements ErrorHandler{
    handleError(error: HttpErrorResponse): void {
        if(error.status !== 401){

            var errorBody = error.error;
            if(errorBody){
            if("errorMessages" in errorBody){
                alert(errorBody.errorMessages)
        }
    }
    }
    }
}