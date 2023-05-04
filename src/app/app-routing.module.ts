import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { ShellComponent } from './home/shell/shell.component';

const routes: Routes = [
  { path: "", redirectTo: "home", pathMatch: "full" },
  {
    path: "",
    component: ShellComponent,
    children: [{ path: "home", component: HomeComponent },   {
      path: 'admin',
      loadChildren: () => import('./admin-module/admin.module').then((m) => m.AdminModule)
    }],
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
