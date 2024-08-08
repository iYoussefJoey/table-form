import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NationPopulationComponent } from './nation-population.component';

describe('NationPopulationComponent', () => {
  let component: NationPopulationComponent;
  let fixture: ComponentFixture<NationPopulationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NationPopulationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NationPopulationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
