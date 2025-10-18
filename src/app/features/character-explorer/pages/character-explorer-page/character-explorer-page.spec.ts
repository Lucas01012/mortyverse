import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterExplorerPage } from './character-explorer-page.component';

describe('CharacterExplorerPage', () => {
  let component: CharacterExplorerPage;
  let fixture: ComponentFixture<CharacterExplorerPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CharacterExplorerPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CharacterExplorerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
