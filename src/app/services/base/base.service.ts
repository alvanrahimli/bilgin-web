import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { BaseModelResponse } from 'src/app/models/base-model/response/base-model';

@Injectable({
  providedIn: 'root'
})
export class BaseService {
  headers: HttpHeaders;
  protected http: HttpClient;
  public API_EndPoint = "http://localhost:8080/";

  constructor(http: HttpClient) {
    this.http = http;
    const headers = new HttpHeaders({
      "Content-Type": "application/json; charset=utf-8",
      "Access-Control-Allow-Origin": "*"
    });
    this.headers = headers;
  }

  async get<T>(url: string, customHeaders: any = {}): Promise<BaseModelResponse<T>> {
    let response: BaseModelResponse<T> = {} as BaseModelResponse<T>;

    try {
      let finalHeaders = customHeaders == null ? this.headers : new HttpHeaders(customHeaders);
      let tempResponseObsr = this.http.get<T>(this.API_EndPoint + url, 
        { headers: finalHeaders });
      let tempResponse = await firstValueFrom(tempResponseObsr);

      if (tempResponse) {
        response.data = tempResponse;
        response.hasError = false;
        response.error = {};
      }

      return response;
    } catch (error) {
      response.hasError = true;
      response.error = error;
      response.data = {} as T;
      console.log("Error while GET:", error);
      return response;
    }
  }

  async post<T>(url: string, request: any, customHeaders: any = {}): Promise<BaseModelResponse<T>> {
    let response: BaseModelResponse<T> = {} as BaseModelResponse<T>;

    try {
      let finalHeaders = customHeaders == null ? this.headers : new HttpHeaders(customHeaders);
      let tempResponseObsr = this.http.post<T>(this.API_EndPoint + url, request, {
        headers: finalHeaders,
      });
      let tempResponse = await firstValueFrom(tempResponseObsr);
      
      if (tempResponse) {
        response.data = tempResponse;
        response.hasError = false;
        response.error = {};
      }

      return response;
    } catch (error) {
      response.hasError = true;
      response.error = error;
      response.data = {} as T;
      console.error("Error while POST", error);
      return response;
    }
  }

  async put<T>(url: string, request: any, headers: any = {}): Promise<BaseModelResponse<T>> {
    let response: BaseModelResponse<T> = {} as BaseModelResponse<T>;

    try {
      let tempResponseObsr = this.http.put<T>(this.API_EndPoint + url, request, { headers: headers ?? this.headers });
      let tempResponse = await firstValueFrom(tempResponseObsr);

      if (tempResponse) {
        response.hasError = false;
        response.data = tempResponse;
        response.error = {};
      }

      return response;
    } catch (error) {
      response.hasError = true;
      response.error = error;
      response.data = {} as T;
      console.error("Error while PUT:", error);
      return response;
    }
  }

  async delete<T>(url: string, request: any, headers: any = {}): Promise<BaseModelResponse<T>> {
    let response: BaseModelResponse<T> = {} as BaseModelResponse<T>;

    try {
      let tempResponseObsr = this.http.delete<T>(this.API_EndPoint + url, { headers: this.headers, body: request });
      let tempResponse = await firstValueFrom(tempResponseObsr);
      
      if (tempResponse) {
        response.data = tempResponse;
        response.hasError = false;
        response.error = {};
      }

      return response;
    } catch (error) {
      response.hasError = true;
      response.error = error;
      response.data = {} as T;
      console.log("Error while DELETE", error);
      return response;
    }
  }
}
