import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ShiftComponent } from './shift.component';

describe('ShiftComponent', () => {
  let component: ShiftComponent;
  let fixture: ComponentFixture<ShiftComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShiftComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ShiftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
