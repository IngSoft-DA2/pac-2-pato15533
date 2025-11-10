import { Routes } from '@angular/router';
import { ReflectionComponent } from './pages/reflection/reflection.component';
import { reflectionGuard } from './shared/guards/reflection.guard';

export const routes: Routes = [
  {
    path: 'reflection',
    component: ReflectionComponent,
    canActivate: [reflectionGuard],
  },
];
