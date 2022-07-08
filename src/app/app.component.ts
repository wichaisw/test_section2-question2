import { Component } from '@angular/core';
import { CategoriesService } from 'src/app/core/services/categories.service';
import { ICategories } from 'src/app/shared/interfaces/categories';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  categories: string[] = [] as string[];
  displayCategories: string[] = [] as string[];
  filterVal: string = '';
  categoriesDict: {[key: string]: string } = {};

  constructor(
    private categoriesService: CategoriesService
  ) {}
  
  ngOnInit(): void {    
    this.categoriesService.findAll()
      .subscribe({
        next: (data: ICategories) => { 
          this.generateDictionary(data.categories);
          this.displayCategories = this.categories;
        },
        error: () => console.error('failed to get categories data')
      });
  }

  generateDictionary(categories: string[]) {
    for(let category of categories) {
      let lowercaseCategory = category.toLocaleLowerCase();
      // define dictionary object to capitalize categories later with O(1) time complexity
      this.categoriesDict[lowercaseCategory] = category;
      
      // populate lowercase categories array
      this.categories.push(lowercaseCategory);
    }
  }

  filterCategories(val: string): void {
    val = val.toLocaleLowerCase();

    this.displayCategories = this.categories.filter( (cat: string) => {
      return cat.includes(val);
    })
  }

}
