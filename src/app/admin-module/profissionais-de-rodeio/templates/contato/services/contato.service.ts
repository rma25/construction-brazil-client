import { Injectable } from '@angular/core';
import { StringManipulationService } from 'src/app/shared/services/string-manipulation.service';

@Injectable({ providedIn: 'root' })
export class ContatoService {
  constructor(private stringManipulationService: StringManipulationService) {}

  public cleanCpf(cpf?: string): string {
    return this.stringManipulationService.removeNaN(cpf);
  }

  public cpfContainNaN(cpf?: string): boolean {
    return this.stringManipulationService.containsNaN(cpf, ['-', '.']);
  }

  public isValidCpfFormat(cpf?: string): boolean {
    // CPF Format: 123.456.789-01
    return (
      !!cpf &&
      cpf.length === 14 &&
      cpf[3] === '.' &&
      cpf[7] === '.' &&
      cpf[11] === '-' &&
      Array.from(cpf).every(
        (x, i) => i === 3 || i === 7 || i === 11 || !isNaN(parseInt(x))
      )
    );
  }

  public formatCPF(cpf?: string): string {
    // CPF Format: 123.456.789-01
    let formattedCpf = '';

    if (!cpf) return formattedCpf;

    const filteredCpf = this.cleanCpf(cpf);

    if (filteredCpf.length < 11) return formattedCpf;

    for (let i = 0; i < filteredCpf.length; i++) {
      const value = filteredCpf[i];

      if (value === '.' || value === '-') continue;

      formattedCpf += filteredCpf[i];

      if (i === 8) {
        formattedCpf += '-';
      } else if (i === 2 || i === 5) {
        formattedCpf += '.';
      }
    }

    return formattedCpf;
  }
}
