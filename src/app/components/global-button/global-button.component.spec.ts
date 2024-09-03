import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalButtonComponent } from './global-button.component';

describe('GlobalButtonComponent', () => {
  let component: GlobalButtonComponent;
  let fixture: ComponentFixture<GlobalButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GlobalButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GlobalButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
