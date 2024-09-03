export interface BitCoin {
    chartName:string;
    disclaimer:string;
    time:timeData;
    bpi:bpiData;
}
export interface timeData{
    updated:string;
    updatedISO:string;
    updateduk:string;
}
export interface bpiData{
    EUR:currencyData;
    GBP:currencyData;
    USD:currencyData;
    [key:string]:currencyData
}
export interface currencyData{
    code: string;
    description: string;
    rate: string;
    rate_float: number;
    symbol: string;
}

export interface transforedBitCoin{
    timeUpdated: string;
  timeUpdatedISO: string;
  timeUpdatedUK: string;
  chartName: string;
  currency: string;
  rate: string;
  description: string;
}