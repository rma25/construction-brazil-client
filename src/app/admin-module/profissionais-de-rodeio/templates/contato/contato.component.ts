import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { debounceTime, distinctUntilChanged, Subject, takeUntil } from 'rxjs';
import { AbstractBaseComponent } from 'src/app/abstract-base/abstract-base.component';

import { AdminContato } from '../../models/admin-contato.model';

@Component({
  selector: 'app-contato',
  templateUrl: './contato.component.html',
  styleUrls: ['./contato.component.css'],
})
export class ContatoComponent extends AbstractBaseComponent implements OnInit {
  @Input() adminContato!: AdminContato;
  @Output() adminContatoChange = new EventEmitter<AdminContato>();

  public cpfText = new Subject<string>();

  constructor() {
    super();
  }

  ngOnInit(): void {
    this.cpfText
      .pipe(distinctUntilChanged(), debounceTime(300), takeUntil(this.destroy))
      .subscribe((cpf) => {
        this.adminContato.cpf = this.formatCPF(cpf);
      });
  }

  public formatCPF(cpf?: string): string {
    let formattedCpf = '';
    // CPF Format: 123.456.789-01
    if (!cpf) {
      return formattedCpf;
    }

    for (let i = 0; i < cpf.length; i++) {
      const value = cpf[i];

      if (value === '-' || value === '.') continue;

      formattedCpf += cpf[i];

      if (i === 10) {
        formattedCpf += '-';
      } else if (i === 2 || i === 6) {
        formattedCpf += '.';
      }
    }

    return formattedCpf;
  }

  public onCpfInput(target: EventTarget | null): void {
    let cpfText: string = '';

    if (target) {
      cpfText = (<HTMLInputElement>target).value;
    }

    this.cpfText.next(cpfText);
  }
}