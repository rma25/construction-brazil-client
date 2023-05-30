export class AdminContato {
  public id: number;
  public nome!: string;
  public sobrenome!: string;
  public cpf!: string;
  public dataDeNascimento!: Date;
  public email?: string;
  public telefone?: string;
  public profissao?: string;
  // This is the Area Code such as (954 for Miami), comes from CEP Info
  public dddId: number | null = null;
  // Male, Female, Other
  public sexoId: number = 0;
}
