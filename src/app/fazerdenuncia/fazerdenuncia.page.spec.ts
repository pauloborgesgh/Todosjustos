import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FazerdenunciaPage } from './fazerdenuncia.page';

describe('FazerdenunciaPage', () => {
  let component: FazerdenunciaPage;
  let fixture: ComponentFixture<FazerdenunciaPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(FazerdenunciaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
