export class CreateRaffleDateDto{
    readonly raffleId: number;
    readonly fecha: Date;
    readonly estado?: 'actual'|'pasada'|'aplazada';
}