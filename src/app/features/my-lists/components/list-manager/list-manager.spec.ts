import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListManager } from './list-manager';

describe('ListManager', () => {
  let component: ListManager;
  let fixture: ComponentFixture<ListManager>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListManager]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListManager);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
