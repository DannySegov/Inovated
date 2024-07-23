import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UprisingsPage } from './uprisings.page';

describe('UprisingsPage', () => {
  let component: UprisingsPage;
  let fixture: ComponentFixture<UprisingsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(UprisingsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
