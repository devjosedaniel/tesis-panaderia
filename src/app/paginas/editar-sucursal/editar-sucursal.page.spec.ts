import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditarSucursalPage } from './editar-sucursal.page';

describe('EditarSucursalPage', () => {
  let component: EditarSucursalPage;
  let fixture: ComponentFixture<EditarSucursalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarSucursalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditarSucursalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
