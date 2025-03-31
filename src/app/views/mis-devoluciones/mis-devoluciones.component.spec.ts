import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MisDevolucionesComponent } from './mis-devoluciones.component';

describe('MisDevolucionesComponent', () => {
  let component: MisDevolucionesComponent;
  let fixture: ComponentFixture<MisDevolucionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MisDevolucionesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MisDevolucionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
