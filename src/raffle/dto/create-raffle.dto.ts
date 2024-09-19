export class CreateRaffleDto{
    readonly usuarioId: number;
    readonly premio: string;
    readonly fechaCreacion: Date;
    readonly fechaRifa: Date;
    readonly numeroMaximo: number;
}