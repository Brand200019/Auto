import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IniciarseccionPage } from './iniciarseccion.page';

describe('IniciarseccionPage', () => {
  let component: IniciarseccionPage;
  let fixture: ComponentFixture<IniciarseccionPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(IniciarseccionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
