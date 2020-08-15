import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BrightnessScrollComponent } from './brightness-scroll.component';

describe('BrightnessScrollComponent', () => {
  let component: BrightnessScrollComponent;
  let fixture: ComponentFixture<BrightnessScrollComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrightnessScrollComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BrightnessScrollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
