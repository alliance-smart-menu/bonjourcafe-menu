import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http'
import {Observable} from 'rxjs'
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor(private http: HttpClient) { }

  public token: string | undefined

  public language: string = "ru"

  public loading: boolean = false

  public categories: any[] | undefined
  public category: any

  public all_positions: any[] | undefined
  public positions: any[] | undefined

   // API запросы
   getMenu(): Observable<any> {
       
    let queryParams = new HttpParams();

    if (this.token) {
      queryParams = queryParams.append("token", this.token);
    } 

    return this.http.get<any>(`${environment.apiURL}/api/0001/menu`)
  }
}
