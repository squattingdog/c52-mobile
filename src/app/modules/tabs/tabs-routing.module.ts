import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './../../pages/tabs/tabs.page';

const routes: Routes = [
  { path: 'tabs', component: TabsPage, children: [
    { path: 'home', children: [
      { path: '', loadChildren: () => import('../../pages/home/home.module').then(m => m.HomePageModule) }
    ]},
    { path: 'serve', children: [
      {path: '', loadChildren: () => import('../../modules/events/events.module').then(m => m.EventsPageModule) }
    ]},
    { path: 'videos', children: [
      {path: '', loadChildren: () => import('../../pages/videos/videos.module').then(m => m.VideosPageModule) }
    ]},
    { path: '', redirectTo: '/tabs/home', pathMatch: 'full' }
  ]},
  { path: '',  redirectTo: '/tabs/home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
