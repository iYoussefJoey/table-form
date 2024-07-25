import { Routes } from '@angular/router';
import { TableComponent } from './components/table/table.component';
import { FormsComponent } from './components/forms/forms.component';
import { UserSettingsComponent } from './components/user-settings/user-settings.component';
import { authGuard } from './auth.guard';
import { authsettingsGuard } from './authsettings.guard';

export const routes: Routes = [

    {path: '', redirectTo: 'settings', pathMatch: 'full'},
    {path: 'table' , canActivate: [authGuard], component: TableComponent},
    {path: 'forms', canActivate: [authGuard], component: FormsComponent},
    {path: 'forms/:id', canActivate: [authGuard] , component: FormsComponent},
    {path: 'settings',canActivate: [authsettingsGuard], component: UserSettingsComponent},

];
