import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MisComunicacionesComponent } from './mis-comunicaciones.component';

describe('MisComunicacionesComponent', () => {
  let component: MisComunicacionesComponent;
  let fixture: ComponentFixture<MisComunicacionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MisComunicacionesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MisComunicacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
