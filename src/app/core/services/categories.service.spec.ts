
import { HttpClientTestingModule, HttpTestingController, TestRequest } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ICategories } from 'src/app/shared/interfaces/categories';

import { CategoriesService } from './categories.service';

describe('CategoriesService', () => {
  let categoriesService: CategoriesService;
  let httpMock: HttpTestingController;

  const mockCategories: ICategories = {
    categories: ['Animal', 'Anime', 'Development', 'Music', 'Science & Math', 'Weather'],
    count: 6
  } as ICategories;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    categoriesService = TestBed.inject(CategoriesService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(categoriesService).toBeTruthy();
  });

  describe('findAll', () => {
    it('should make GET request with a correct endpoint', () => {
  
      categoriesService.findAll().subscribe({
        next: data => {
          expect(data).toEqual(mockCategories);
        }
      });
      
      const req: TestRequest = httpMock.expectOne('https://api.publicapis.org/categories');
      expect(req.request.method).toEqual('GET');
      req.flush(mockCategories);
    });
  });
});
