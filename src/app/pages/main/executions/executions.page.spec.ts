import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExecutionsPage } from './executions.page';

describe('ExecutionsPage', () => {
  let component: ExecutionsPage;
  let fixture: ComponentFixture<ExecutionsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ExecutionsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
