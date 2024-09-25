import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserAssigmentPage } from './user-assigment.page';

describe('UserAssigmentPage', () => {
  let component: UserAssigmentPage;
  let fixture: ComponentFixture<UserAssigmentPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(UserAssigmentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
