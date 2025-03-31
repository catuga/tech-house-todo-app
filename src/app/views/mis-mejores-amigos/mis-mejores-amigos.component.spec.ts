import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MisMejoresAmigosComponent } from './mis-mejores-amigos.component';

describe('MisMejoresAmigosComponent', () => {
  let component: MisMejoresAmigosComponent;
  let fixture: ComponentFixture<MisMejoresAmigosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MisMejoresAmigosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MisMejoresAmigosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
