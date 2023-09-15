import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Inicio1Page } from './inicio1.page';

describe('Inicio1Page', () => {
  let component: Inicio1Page;
  let fixture: ComponentFixture<Inicio1Page>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(Inicio1Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
