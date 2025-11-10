import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CounterService } from '../services/counter.service';

export const reflectionGuard: CanActivateFn = () => {
  const counterService = inject(CounterService);
  const router = inject(Router);

  if (counterService.isAccessBlocked()) {
    alert('Acceso bloqueado: Límite de 20 accesos excedido');
    router.navigate(['/']);
    return false;
  }

  counterService.incrementCounter();
  return true;
};
