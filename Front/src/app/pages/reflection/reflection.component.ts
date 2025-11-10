import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReflectionService } from '../../shared/services/reflection.service';
import { CounterService } from '../../shared/services/counter.service';

@Component({
  selector: 'app-reflection',
  imports: [CommonModule],
  templateUrl: './reflection.component.html',
  styleUrl: './reflection.component.css',
})
export class ReflectionComponent {
  importers: string[] = [];
  isLoading: boolean = false;
  hasError: boolean = false;
  errorMessage: string = '';

  constructor(
    private reflectionService: ReflectionService,
    public counterService: CounterService
  ) {}

  get currentCount(): number {
    return this.counterService.getCounter();
  }

  loadImporters(): void {
    this.isLoading = true;
    this.hasError = false;
    this.errorMessage = '';

    this.reflectionService.getImporters().subscribe({
      next: (data) => {
        this.importers = data;
        this.isLoading = false;
      },
      error: (error) => {
        this.hasError = true;
        this.errorMessage = 'Error al cargar los importers: ' + error;
        this.isLoading = false;
      },
    });
  }
}
