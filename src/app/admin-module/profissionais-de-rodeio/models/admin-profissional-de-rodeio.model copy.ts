import { AdminContato } from './admin-contato.model';
import { AdminEndereco } from './admin-endereco.model';

export class AdminProfissionalDeRodeio {
  constructor() {
    this.endereco = new AdminEndereco();
    this.contato = new AdminContato();
  }
  public id: number;
  public observacoes: string;
  public pis: string;
  public rg: string;
  public pix: string;
  public endereco: AdminEndereco;
  public contato: AdminContato;
  public criado: Date;
  public atualizado: Date;
}
