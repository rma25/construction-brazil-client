export class AdminContato {
  public nome: string;
  public sobrenome: string;
  public cpf: string;
  public dataDeNascimento: Date | null | undefined;
  // This is the Area Code such as (954 for Miami), comes from CEP Info
  public ddd: string;
  public telefone: string;
  public profissao: string;
}
