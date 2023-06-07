import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { concatMap, distinctUntilChanged, map, of, Subject, takeUntil, tap } from 'rxjs';
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
  public isValidCepFormat: boolean = false;
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
    this.setup();

    this.informacoesGeraisService.isSindicalizado
      .pipe(takeUntil(this.destroy))
      .subscribe((isSindicalizado) => {
        this.isSindicalizado = isSindicalizado;
      });

    this.cepText
      .pipe(
        distinctUntilChanged(),
        map((cep) => this.enderecoService.formatCEP(cep)),
        tap(
          (formattedCep) =>
            (this.isValidCepFormat =
              this.enderecoService.isValidCepFormat(formattedCep))
        ),
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
          if (this.isValidCepFormat) {
            this.adminEndereco.cep = x.formattedCep;
          }
        }
      });
  }

  private setup(): void {
    // Set it to true if it's in edit mode
    this.isValidCepFormat = this.adminEndereco.id > 0;

    console.log('set up isValidCepFormat', this.isValidCepFormat);
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
    return !this.isValidCepFormat;
  }

  public onChange(): void {
    this.isValidCepFormat = this.enderecoService.isValidCepFormat(
      this.enderecoService.formatCEP(this.adminEndereco.cep)
    );

    this.isValid.emit(this.isValidCepFormat);
  }

  public triggerCepCheck(): void {
    this.cepText.next(this.adminEndereco.cep);
  }
}
