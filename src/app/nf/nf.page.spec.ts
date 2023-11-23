import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NfPage } from './nf.page';

describe('NfPage', () => {
  let component: NfPage;
  let fixture: ComponentFixture<NfPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(NfPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
