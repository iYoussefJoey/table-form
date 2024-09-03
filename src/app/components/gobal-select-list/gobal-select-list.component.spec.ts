import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GobalSelectListComponent } from './gobal-select-list.component';

describe('GobalSelectListComponent', () => {
  let component: GobalSelectListComponent;
  let fixture: ComponentFixture<GobalSelectListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GobalSelectListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GobalSelectListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
