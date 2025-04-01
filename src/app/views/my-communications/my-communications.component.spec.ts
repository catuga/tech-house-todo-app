import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MyCommunicationsComponent } from './my-communications.component';

describe('MyCommunicationsComponent', () => {
  let component: MyCommunicationsComponent;
  let fixture: ComponentFixture<MyCommunicationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyCommunicationsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyCommunicationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
