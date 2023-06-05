import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { concatMap, debounceTime, distinctUntilChanged, map, of, Subject, takeUntil } from 'rxjs';
import { AbstractBaseComponent } from 'src/app/abstract-base/abstract-base.component';
import { ExternalCepDataService } from 'src/app/shared/data/external/external-cep-data.service';
import { EstadoService } from 'src/app/shared/services/static/estado.service';

import { Estado } from '../../interfaces/estado.interface';
import { AdminEndereco } from '../../models/admin-endereco.model';
import { InformacoesGeraisService } from '../informacoes-gerais/services/informacoes-gerais.service';
import { EnderecoService } from './services/endereco.service';

@Component({
  selector: 'app-endereco',
  templateUrl: './endereco.component.html',
  styleUrls: ['./endereco.component.css'],
})
export class EnderecoComponent extends AbstractBaseComponent implements OnInit {
  @Input() adminEndereco!: AdminEndereco;
  @Output() adminEnderecoChange = new EventEmitter<AdminEndereco>();

  @Output() isValid = new EventEmitter<boolean>(false);

  public estados!: Array<Estado>;
  public cepText = new Subject<string>();

  public isSindicalizado: boolean;

  constructor(
    private estadoService: EstadoService,
    private externalCepDataService: ExternalCepDataService,
    private informacoesGeraisService: InformacoesGeraisService,
    private enderecoService: EnderecoService
  ) {
    super();

    this.estados = this.estadoService.getEstados();
  }

  ngOnInit(): void {
    this.informacoesGeraisService.isSindicalizado
      .pipe(takeUntil(this.destroy))
      .subscribe((isSindicalizado) => {
        this.isSindicalizado = isSindicalizado;
      });

    this.cepText
      .pipe(
        distinctUntilChanged(),
        debounceTime(100),
        map((cep) => this.enderecoService.formatCEP(cep)),
        concatMap((formattedCep) => {
          if (formattedCep && formattedCep.length === 9) {
            return this.externalCepDataService
              .getCepInfo(formattedCep)
              .pipe(map((cepInfo) => ({ cepInfo, formattedCep })));
          } else {
            return of({ cepInfo: undefined, formattedCep });
          }
        }),
        takeUntil(this.destroy)
      )
      .subscribe((x) => {
        if (x.cepInfo && !x.cepInfo.erro) {
          this.adminEndereco.cep = x.cepInfo.cep;
          this.adminEndereco.cidade = x.cepInfo.localidade;
          this.adminEndereco.complemento = x.cepInfo.complemento;
          this.adminEndereco.estadoId = this.estadoService.findEstadoIdFor(
            x.cepInfo.uf
          );
          this.adminEndereco.rua = x.cepInfo.logradouro;
          this.adminEndereco.bairro = x.cepInfo.bairro;
        } else {
          if (x.formattedCep && x.formattedCep.length === 9) {
            this.adminEndereco.cep = x.formattedCep;
          }
        }
      });
  }

  public cepContainNaN(cep?: string): boolean {
    return this.enderecoService.cepContainNaN(cep);
  }

  public onCepInput(target: EventTarget | null): void {
    let cepText: string = '';

    if (target) {
      cepText = (<HTMLInputElement>target).value;
    }

    this.cepText.next(cepText);
  }

  public hideAddressForm(): boolean {
    return !this.adminEndereco.cep || this.adminEndereco.cep.length !== 9;
  }

  public onChange(): void {
    this.isValid.emit(
      !!this.adminEndereco.cep && this.adminEndereco.cep.length === 9
    );
  }

  public triggerCepCheck(): void {
    this.cepText.next(this.adminEndereco.cep);
  }
}
