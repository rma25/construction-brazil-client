export interface ExternalCepInfo {
  cep: string,
  // Rua
  logradouro: string,
  complemento: string,
  bairro: string,
  // Cidade
  localidade: string,
  // Estado
  uf: string,
  ibge: string,
  gia: string,
  ddd: string,
  siafi: string
  // If the API returns an error it will only return this property;
  erro: boolean;
}
