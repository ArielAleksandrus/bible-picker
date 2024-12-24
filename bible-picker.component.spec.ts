import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BiblePickerComponent } from './bible-picker.component';

describe('BiblePickerComponent', () => {
  let component: BiblePickerComponent;
  let fixture: ComponentFixture<BiblePickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BiblePickerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BiblePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
