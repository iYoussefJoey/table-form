import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MicroformsComponent } from './microforms.component';

describe('MicroformsComponent', () => {
  let component: MicroformsComponent;
  let fixture: ComponentFixture<MicroformsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MicroformsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MicroformsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
