import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { Component } from '@angular/core';
import { AddListForm } from './add-list-form';
import { CreateListDto } from '../../../../core/models/custom-list.model';

@Component({
  standalone: true,
  imports: [AddListForm],
  template: `<app-add-list-form
    [editMode]="editMode"
    [initialName]="initialName"
    [initialDescription]="initialDescription"
    (listCreated)="createdSpy($event)"
    (listUpdated)="updatedSpy($event)"
    (cancelled)="cancelledSpy()"
  ></app-add-list-form>`
})
class TestHostComponent {
  editMode = false;
  initialName = '';
  initialDescription = '';
  createdSpy = jasmine.createSpy('createdSpy');
  updatedSpy = jasmine.createSpy('updatedSpy');
  cancelledSpy = jasmine.createSpy('cancelledSpy');
}

describe('AddListForm', () => {
  let component: AddListForm;
  let fixture: ComponentFixture<TestHostComponent>;
  let hostComponent: TestHostComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    hostComponent = fixture.componentInstance;
    component = fixture.debugElement.children[0].componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with empty name and description when editMode is false', () => {
    hostComponent.editMode = false;
    hostComponent.initialName = '';
    hostComponent.initialDescription = '';
    fixture.detectChanges();
    expect((component as any).name()).toBe('');
    expect((component as any).description()).toBe('');
  });

  it('should initialize with initial values when editMode is true', () => {
    hostComponent.editMode = true;
    hostComponent.initialName = 'Test List';
    hostComponent.initialDescription = 'Test Description';
    fixture.detectChanges();
    expect((component as any).name()).toBe('Test List');
    expect((component as any).description()).toBe('Test Description');
  });

  it('should emit listCreated on submit when editMode is false', () => {
  hostComponent.editMode = false;
  fixture.detectChanges();
  (component as any).name.set('New List');
  (component as any).description.set('Description');

  (component as any).onSubmit();

    expect(hostComponent.createdSpy).toHaveBeenCalledWith({
      name: 'New List',
      description: 'Description'
    });
  });

  it('should emit listUpdated on submit when editMode is true', () => {
  hostComponent.editMode = true;
  fixture.detectChanges();
  (component as any).name.set('Updated List');
  (component as any).description.set('Updated Description');

  (component as any).onSubmit();

    expect(hostComponent.updatedSpy).toHaveBeenCalledWith({
      name: 'Updated List',
      description: 'Updated Description'
    });
  });

  it('should not emit if name is empty or whitespace', () => {
    spyOn(component.listCreated, 'emit');
    hostComponent.editMode = false;
    (component as any).name.set('   ');
    fixture.detectChanges();

    (component as any).onSubmit();

    expect(component.listCreated.emit).not.toHaveBeenCalled();
  });

  it('should trim name and description on submit', () => {
  hostComponent.editMode = false;
  fixture.detectChanges();
  (component as any).name.set('  List Name  ');
  (component as any).description.set('  Description  ');

  (component as any).onSubmit();

    expect(hostComponent.createdSpy).toHaveBeenCalledWith({
      name: 'List Name',
      description: 'Description'
    });
  });

  it('should set description to undefined if empty after trim', () => {
  hostComponent.editMode = false;
  fixture.detectChanges();
  (component as any).name.set('List Name');
  (component as any).description.set('   ');

  (component as any).onSubmit();

    expect(hostComponent.createdSpy).toHaveBeenCalledWith({
      name: 'List Name',
      description: undefined
    });
  });

  it('should emit cancelled on cancel', () => {
    hostComponent.editMode = false;
    (component as any).name.set('Test');
    (component as any).description.set('Test');
    fixture.detectChanges();

    (component as any).onCancel();

    expect(hostComponent.cancelledSpy).toHaveBeenCalled();
    expect((component as any).name()).toBe('');
    expect((component as any).description()).toBe('');
  });
});
