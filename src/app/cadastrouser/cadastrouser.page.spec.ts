import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CadastrouserPage } from './cadastrouser.page';

describe('CadastrouserPage', () => {
  let component: CadastrouserPage;
  let fixture: ComponentFixture<CadastrouserPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CadastrouserPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
