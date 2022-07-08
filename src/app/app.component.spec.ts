import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { ICategories } from './shared/interfaces/categories';
import { SharedModule } from './shared/shared.module';

describe('AppComponent', () => {
  let app: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  const mockCategories: ICategories = {
    categories: ['Animal', 'Anime', 'Development', 'Music', 'Open Source Projects', 'Science & Math', 'Weather'],
    count: 7
  } as ICategories;
  const mockLowercaseCategories: string[] = ['animal', 'anime', 'development', 'music', 'open source projects', 'science & math', 'weather'];    

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports: [
        HttpClientModule,
        FormsModule,
        SharedModule,
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
  });

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  describe('generate dictionary', () => {
    beforeEach(() => {   
      spyOn(app, 'generateDictionary').and.callThrough();
      app.generateDictionary(mockCategories.categories);
    });

    describe('categoriesDictionaries field', () => {
      it('should map lowercase categories with original categories', () => {   
        expect(app.categoriesDict['anime']).toEqual('Anime');
        expect(app.categoriesDict['science & math']).toEqual('Science & Math');
        expect(app.categoriesDict['open source projects']).toEqual('Open Source Projects');
      });

      it('should have same the length with the original categories', () => {
        expect(Object.keys(app.categoriesDict).length).toEqual(mockCategories.count);
        expect(Object.keys(app.categoriesDict).length).toEqual(mockCategories.categories.length);
      });
    })

    describe('categories field', () => {
      it('should convert categories to lowercase', () => {
        expect(app.categories).toEqual(mockLowercaseCategories);
      });

      it('should have same the length with the original categories', () => {
        expect(app.categories.length).toEqual(mockCategories.count);
        expect(app.categories.length).toEqual(mockCategories.categories.length);
      });
    }) 
  });

  describe('filter categories', () => {
    beforeEach(() => {
      app.categories = mockLowercaseCategories;
      spyOn(app, 'filterCategories').and.callThrough();
    });

    it('should update this.displayCategories with filtered lowercase categories', () => {
      app.filterCategories('an');
      expect(app.displayCategories).toEqual(['animal', 'anime']);
      app.filterCategories('AN');
      expect(app.displayCategories).toEqual(['animal', 'anime']);
      app.filterCategories('&');
      expect(app.displayCategories).toEqual(['science & math']);
      app.filterCategories(' ');
      expect(app.displayCategories).toEqual(['open source projects', 'science & math']);
      app.filterCategories('');
      expect(app.displayCategories).toEqual(app.categories);
      app.filterCategories('4');
      expect(app.displayCategories).toEqual([]);
    });
  });
});
