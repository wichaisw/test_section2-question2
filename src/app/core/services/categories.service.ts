import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { ICategories } from 'src/app/shared/interfaces/categories';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  constructor(
    private http: HttpClient,
  ) { }

  findAll(): Observable<ICategories> {
    return this.http.get<ICategories>(`https://api.publicapis.org/categories`);
  }
}
