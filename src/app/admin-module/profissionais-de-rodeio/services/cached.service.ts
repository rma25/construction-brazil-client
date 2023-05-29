import { Injectable } from '@angular/core';
import { DddService } from 'src/app/shared/services/static/ddd.service';
import { EstadoService } from 'src/app/shared/services/static/estado.service';
import { ProfissionalTypeService } from 'src/app/shared/services/static/profissional-type.service';
import { SexoService } from 'src/app/shared/services/static/sexo.service';

@Injectable({ providedIn: 'root' })
export class CachedService {
  // This will just make sure the services are triggered and cached to be used
  constructor(
    private dddService: DddService,
    private estadoService: EstadoService,
    private profissionalTypeService: ProfissionalTypeService,
    private sexoService: SexoService
  ) {}
}
