import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DateformsComponent } from './dateforms.component';

describe('DateformsComponent', () => {
  let component: DateformsComponent;
  let fixture: ComponentFixture<DateformsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DateformsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DateformsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
