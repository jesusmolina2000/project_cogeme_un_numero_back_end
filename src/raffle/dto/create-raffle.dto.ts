export class CreateRaffleDto{
    readonly usuarioId: number;
    readonly premio: string;
    readonly loteria: string;
    readonly fechaRifa: Date;
    readonly numeroMaximo: number;
    readonly precioNumero: number;
}