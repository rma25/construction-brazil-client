import { Injectable } from '@angular/core';
import { StringManipulationService } from 'src/app/shared/services/string-manipulation.service';

@Injectable({ providedIn: 'root' })
export class EnderecoService {
  constructor(private stringManipulationService: StringManipulationService) {}

  public cleanCep(cep?: string): string {
    return this.stringManipulationService.removeNaN(cep);
  }

  public cepContainNaN(cep?: string): boolean {
    return this.stringManipulationService.containsNaN(cep, ['.', '-']);
  }

  public formatCEP(cep?: string): string {
    let formattedCep = '';

    // CEP Format: 12345-678
    if (!cep) {
      return formattedCep;
    }

    const filteredCep = this.cleanCep(cep);

    if (filteredCep.length < 8) return formattedCep;

    for (let i = 0; i < cep.length; i++) {
      const value = cep[i];

      if (value === '-' || value === '.') continue;

      formattedCep += cep[i];

      if (i === 4) {
        formattedCep += '-';
      }
    }

    return formattedCep;
  }
}
