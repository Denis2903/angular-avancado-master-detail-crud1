import { Injectable } from '@angular/core';
import{HttpClient,HttpHeaders} from "@angular/common/http";
import{Observable, throwError} from "rxjs";
import {map, catchError, flatMap} from "rxjs/operators";
import { Category } from "./Category";
import { element } from '@angular/core/src/render3';


@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private apiPath: string ='api/categories';
  constructor(private http: HttpClient) { }

  getAll(): Observable<Category[]> {
    return this.http.get(this.apiPath).pipe(
      catchError(this.handleError),
      map(this.jsonDataToCategories)
    )
  }


   getById(id: number): Observable<Category[]>{
     const url = '$(rhis.apiPath)/$(id)';

     return this.http.get(url).pipe(
       catchError(this.handleError),
       map(this.jsonDataToCategories)
     )
   }

    create(category: Category): Observable<Category>{
      return this.http.post(this.apiPath, category).pipe(
        catchError(this.handleError),
        map(this.jsonDataToCategory)
      )
    }

    update(category: Category): Observable<Category>{
      const url = '$(rhis.apiPath)/$(category.id)';
      return this.http.put(url, category).pipe(
        catchError(this.handleError),
        map(()=> category)
      )

    }

    delete(id: number): Observable<any>{
      const url = '$(rhis.apiPath)/$(id)';
      return this.http.delete(url).pipe(
        catchError(this.handleError),
        map(()=>null)

      )
    }
  // private methods

  private jsonDataToCategories(jsonData: any[]): Category[]{
    const categories: Category[]=[];
    jsonData.forEach(elemnt => categories.push(element as Category)); 
  return categories
  }

private jsonDataToCategory(jsinData: any): Category {
  return jsinData as Category;
}

  private handleError(error:any): Observable<any>{
  console.log("ERRO NA REQUISIÇÃO =>", error);
  
    return throwError(error);
  }
}
