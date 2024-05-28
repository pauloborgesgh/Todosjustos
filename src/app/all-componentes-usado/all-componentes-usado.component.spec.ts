import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AllComponentesUsadoComponent } from './all-componentes-usado.component';

describe('AllComponentesUsadoComponent', () => {
  let component: AllComponentesUsadoComponent;
  let fixture: ComponentFixture<AllComponentesUsadoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AllComponentesUsadoComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AllComponentesUsadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
