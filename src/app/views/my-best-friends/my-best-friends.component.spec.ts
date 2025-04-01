import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MyBestFriendsComponent } from './my-best-friends.component';


describe('MyBestFriendsComponent', () => {
  let component: MyBestFriendsComponent;
  let fixture: ComponentFixture<MyBestFriendsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyBestFriendsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyBestFriendsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
