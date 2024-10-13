import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NewServicePage } from './new-service.page';

describe('NewServicePage', () => {
  let component: NewServicePage;
  let fixture: ComponentFixture<NewServicePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(NewServicePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
