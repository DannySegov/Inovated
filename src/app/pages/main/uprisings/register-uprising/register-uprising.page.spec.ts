import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisterUprisingPage } from './register-uprising.page';

describe('RegisterUprisingPage', () => {
  let component: RegisterUprisingPage;
  let fixture: ComponentFixture<RegisterUprisingPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterUprisingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
