import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BiblePickerLibComponent } from './bible-picker-lib.component';

describe('BiblePickerLibComponent', () => {
  let component: BiblePickerLibComponent;
  let fixture: ComponentFixture<BiblePickerLibComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BiblePickerLibComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BiblePickerLibComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
