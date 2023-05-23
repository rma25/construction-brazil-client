import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { debounceTime, distinctUntilChanged, map, Subject, takeUntil } from 'rxjs';
import { AbstractBaseComponent } from 'src/app/abstract-base/abstract-base.component';
import { StaticDataService } from 'src/app/shared/services/static-data.service';

import { AdminContato } from '../../models/admin-contato.model';

@Component({
  selector: 'app-contato',
  templateUrl: './contato.component.html',
  styleUrls: ['./contato.component.css'],
})
export class ContatoComponent extends AbstractBaseComponent implements OnInit {
  @Input() adminContato!: AdminContato;
  @Output() adminContatoChange = new EventEmitter<AdminContato>();

  @Output() isValid = new EventEmitter<boolean>();

  public cpfText = new Subject<string>();
  public ddds!: Array<string>;
  public dataDeNascimentoTouched: boolean;

  constructor(private staticData: StaticDataService) {
    super();

    this.ddds = this.staticData.getDdds();
  }

  ngOnInit(): void {
    this.cpfText
      .pipe(
        distinctUntilChanged(),
        debounceTime(300),
        map((cpf) => this.formatCPF(cpf)),
        takeUntil(this.destroy)
      )
      .subscribe((cpf) => {
        this.adminContato.cpf = cpf;
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

  public onChange(): void {
    this.isValid.emit(
      !!this.adminContato.cpf &&
        this.adminContato.cpf.length === 14 &&
        !!this.adminContato.nome &&
        this.adminContato.nome.length > 0 &&
        !!this.adminContato.sobrenome &&
        this.adminContato.sobrenome.length > 0 &&
        !!this.adminContato.dataDeNascimento
    );
  }
}
