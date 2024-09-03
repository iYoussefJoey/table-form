import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FakeApiComponent } from './fake-api.component';

describe('FakeApiComponent', () => {
  let component: FakeApiComponent;
  let fixture: ComponentFixture<FakeApiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FakeApiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FakeApiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
