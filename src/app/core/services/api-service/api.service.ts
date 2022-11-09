import { HttpClient, HttpErrorResponse, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, throwError as observableThrowError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { ApiRequest } from './api-request.model';
import { ApiServiceError } from './api-service-error.model';
import { ApiServiceResult } from './api-service-result.model';

/**
 * The Api service.
 *
 * It handles the calls to the given (Salsah) API viA HTTP
 * and provides the data responses for the data view.
 *
 * Provided in: `root`.
 */
@Injectable({
    providedIn: 'root',
})
export class ApiService {
    /**
     * Public variable: serviceName.
     *
     * It keeps the name of the service.
     */
    serviceName = 'ApiService';

    /**
     * Public variable: httpGetUrl.
     *
     * It keeps the url of the HTTP GET request.
     */
    httpGetUrl = '';

    /**
     * Constructor of the ApiService.
     *
     * It declares a public {@link HttpClient} instance
     * to handle http requests.
     *
     * @param {HttpClient} http Instance of the HttpClient.
     */
    constructor(public http: HttpClient) {}

    /**
     * Public method: getApiResponse.
     *
     * It returns an HTTP GET request response from the given (Salsah) API.
     *
     * @param {*} responseJsonType The given expected response JSON type of the query.
     * @param {string} queryPath The given path of the query.
     * @param {HttpParams} [queryHttpParams] The given optional HTTP params for the query.
     *
     * @returns {Observable<any>} The observable of the API request.
     */
    getApiResponse(responseJsonType: any, queryPath: string, queryHttpParams?: HttpParams): Observable<any> {
        if (!queryHttpParams) {
            queryHttpParams = new HttpParams();
        }

        return this._httpGet(queryPath, queryHttpParams).pipe(
            map((result: ApiServiceResult): Observable<any> => result.getBody(responseJsonType)),
            catchError((error: ApiServiceError): Observable<ApiServiceError> => observableThrowError(() => error))
        );
    }

    /**
     * Private method: _httpGet.
     *
     * Performs an HTTP GET request to the given (Salsah) API.
     *
     * @param {string} queryPath The given path of the query.
     * @param {HttpParams} queryHttpParams The given HTTP params for the query.
     *
     * @returns {Observable<ApiServiceResult | ApiServiceError>} The observable of the api service result or error.
     */
    private _httpGet(queryPath: string, queryHttpParams: HttpParams): Observable<ApiServiceResult | ApiServiceError> {
        const apiRequest = new ApiRequest(queryPath, queryHttpParams);

        return this.http
            .get<ApiServiceResult | ApiServiceError>(apiRequest.url, {
                observe: 'response',
                params: apiRequest.params,
                headers: apiRequest.headers,
            })
            .pipe(
                // Store the actual url
                tap((response: HttpResponse<ApiServiceResult>) => {
                    this.httpGetUrl = response.url;
                }),
                // Map the response into ApiServiceResult class
                map((response: HttpResponse<any>): ApiServiceResult => {
                    const apiServiceResult = new ApiServiceResult();
                    apiServiceResult.status = response.status;
                    apiServiceResult.statusText = response.statusText;
                    apiServiceResult.body = response.body;
                    apiServiceResult.url = response.url;

                    return apiServiceResult;
                }),
                // Catch any errors
                catchError((error: HttpErrorResponse): Observable<ApiServiceError> => this._handleRequestError(error))
            );
    }

    /**
     * Private method: _handleRequestError.
     *
     * It handles request errors in case of server error.
     *
     * @param {HttpErrorResponse} error The given error.
     *
     * @returns {Observable<ApiServiceError>} The observable of the api service error.
     */
    private _handleRequestError(error: HttpErrorResponse): Observable<ApiServiceError> {
        const apiServiceError = new ApiServiceError();
        apiServiceError.status = error.status ? error.status : apiServiceError.status;
        apiServiceError.statusText = error.statusText ? error.statusText : apiServiceError.statusText;
        apiServiceError.errorInfo = error.message ? error.message : apiServiceError.errorInfo;
        apiServiceError.url = error.url ? error.url : apiServiceError.url;
        return observableThrowError(() => apiServiceError);
    }
}
