import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PrevencaoPage } from './prevencao.page';

describe('PrevencaoPage', () => {
  let component: PrevencaoPage;
  let fixture: ComponentFixture<PrevencaoPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PrevencaoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
