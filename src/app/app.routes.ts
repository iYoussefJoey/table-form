import { Routes } from '@angular/router';
import { TableComponent } from './components/table/table.component';
import { FormsComponent } from './components/forms/forms.component';
import { UserSettingsComponent } from './components/user-settings/user-settings.component';
import { CoinPricesComponent } from './components/coin-prices/coin-prices.component';
import { authGuard } from './auth.guard';
import { NationPopulationComponent } from './components/nation-population/nation-population.component';
import { CarsComponent } from './components/cars/cars.component';

export const routes: Routes = [

    {path: '', redirectTo: 'settings', pathMatch: 'full'},
    {path: 'table' , canActivate: [authGuard], component: TableComponent},
    {path: 'forms', canActivate: [authGuard], component: FormsComponent},
    {path: 'forms/:id', canActivate: [authGuard] , component: FormsComponent},
    {path: 'coin', canActivate: [authGuard] , component: CoinPricesComponent},
    {path: 'nation', canActivate: [authGuard] , component: NationPopulationComponent},
    {path: 'cars', canActivate: [authGuard] , component: CarsComponent},
    {path: 'settings', component: UserSettingsComponent},
    
];
