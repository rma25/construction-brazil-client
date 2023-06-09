import { AdminContato } from './admin-contato.model';
import { AdminEndereco } from './admin-endereco.model';

export class AdminProfissional {
  constructor() {
    this.endereco = new AdminEndereco();
    this.contato = new AdminContato();
  }
  public id: number;
  public contato!: AdminContato;
  public endereco!: AdminEndereco;
  public observacoes?: string;
  public pis?: string;
  public rg?: string;
  public pix?: string;
  public ativo: boolean = false;
  public sindicalizado: boolean = false;
  public profissionalTypeId: number = 0;
  public criado: Date;
  public modificado?: Date;
}
