
export interface NationPopulation {
    'ID Nation': number;
    'ID Year':number;
    Nation:string;
    Population:string;
    'Slug Nation':string;
    Year:number;
}
export interface NationPopulationResponse{

    data:NationPopulation[]
}
