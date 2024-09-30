import { PartialType } from "@nestjs/mapped-types";
import { CreateChoosenNumberDto } from "./create-choosen-number.dto";

export class updateChoosenNumberDto extends PartialType(CreateChoosenNumberDto){}