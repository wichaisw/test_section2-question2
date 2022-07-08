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
    const res: Observable<ICategories> = this.http.get(`https://api.publicapis.org/categories`) as Observable<ICategories>;

    console.log(res);
    return res;
  }
}
