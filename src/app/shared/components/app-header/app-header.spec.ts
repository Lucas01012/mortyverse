import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { AppHeader } from './app-header';

describe('AppHeader', () => {
  let component: AppHeader;
  let fixture: ComponentFixture<AppHeader>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppHeader, RouterTestingModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppHeader);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should start with mobile menu closed', () => {
    expect((component as any).isMobileMenuOpen()).toBe(false);
  });

  it('should toggle mobile menu open', () => {
    (component as any).toggleMobileMenu();
    expect((component as any).isMobileMenuOpen()).toBe(true);
  });

  it('should toggle mobile menu closed', () => {
    (component as any).isMobileMenuOpen.set(true);
    (component as any).toggleMobileMenu();
    expect((component as any).isMobileMenuOpen()).toBe(false);
  });

  it('should close mobile menu', () => {
    (component as any).isMobileMenuOpen.set(true);
    (component as any).closeMobileMenu();
    expect((component as any).isMobileMenuOpen()).toBe(false);
  });

  it('should keep mobile menu closed when already closed', () => {
    (component as any).closeMobileMenu();
    expect((component as any).isMobileMenuOpen()).toBe(false);
  });
});
