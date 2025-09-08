export const ExceptionMessage = {
  IsString: (property: string) =>
    `O campo ${property}, deve ser no formato de texto`,
  IsEmail: (property: string) => `O campo ${property} deve ser um email valido`,
  IsDate: (property: string) => `O campo ${property} deve ser uma data valida`,
  IsNotEmpty: (property: string) => `O campo ${property} é obrigatório`,
  MinLength: (property: string, min: number) =>
    `O campo ${property}, precisa ter o mínimo de ${min} caracteres`,
  IsUUID: (property: string) => `O campo ${property}, não é um id valido `,
  IsNumber: (property: string) =>
    `O campo ${property}, dever ser do tipo numérico`,
  IsCpf: (property: string) => `O campo ${property} deve ser um cpf valido`,
};
