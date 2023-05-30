export class AdminEndereco {
  public id: number;
  public rua?: string;
  public complemento?: string;
  public bairro?: string;
  public cidade?: string;
  // Name & UF
  public estadoId: number | null = null;
  // Required (format example: 74303-160)
  public cep!: string;
}
