export class AdminContato {
  public nome: string;
  public sobrenome: string;
  public cpf: string;
  public dataDeNascimento: Date;
  public telefone: string;
  public profissao: string;
  // This is the Area Code such as (954 for Miami), comes from CEP Info
  public dddId: number;
  // Male, Female, Other
  public sexoId: number;
}
