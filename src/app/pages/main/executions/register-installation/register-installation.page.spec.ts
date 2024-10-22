import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisterInstallationPage } from './register-installation.page';

describe('RegisterInstallationPage', () => {
  let component: RegisterInstallationPage;
  let fixture: ComponentFixture<RegisterInstallationPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterInstallationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
