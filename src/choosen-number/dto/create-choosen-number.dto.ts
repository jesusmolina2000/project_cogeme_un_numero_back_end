export class CreateChoosenNumberDto{
    readonly numero: number;
    readonly nombre: string;
    readonly numeroDeContacto: string;
    readonly raffleId: number;
    readonly estado?: 'pendiente' | 'aceptado' | 'rechazado'
}