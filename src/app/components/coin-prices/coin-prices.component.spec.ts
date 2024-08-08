import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoinPricesComponent } from './coin-prices.component';

describe('CoinPricesComponent', () => {
  let component: CoinPricesComponent;
  let fixture: ComponentFixture<CoinPricesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoinPricesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoinPricesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
