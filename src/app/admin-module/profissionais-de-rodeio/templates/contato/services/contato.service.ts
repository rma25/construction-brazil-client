import { Injectable } from '@angular/core';
import { StringManipulationService } from 'src/app/shared/services/string-manipulation.service';

@Injectable({ providedIn: 'root' })
export class ContatoService {
  constructor(private stringManipulationService: StringManipulationService) {}

  public cleanCpf(cpf?: string): string {
    return this.stringManipulationService.removeNaN(cpf);
  }

  public cpfContainNaN(cpf?: string): boolean {
    if (!cpf) return false;
    let filteredCpf = cpf ? cpf.replaceAll('.', '').replaceAll('-', '') : '';

    const containsNaN = Array.from(filteredCpf).some((x) => isNaN(parseInt(x)));

    return containsNaN;
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
