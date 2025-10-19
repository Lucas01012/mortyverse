import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MyListsPage } from './my-lists-page.component';

describe('MyListsPage (minimal)', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyListsPage, RouterTestingModule, HttpClientTestingModule]
    }).compileComponents();
  });

  it('should create the component', () => {
    const fixture = TestBed.createComponent(MyListsPage as any);
    const comp = fixture.componentInstance as MyListsPage;
    expect(comp).toBeTruthy();
  });
});
