import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListaPage } from './lista.page';

describe('ListaPage', () => {
  let component: ListaPage;
  let fixture: ComponentFixture<ListaPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ListaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

function async(arg0: () => void): jasmine.ImplementationCallback {
  throw new Error('Function not implemented.');
}
