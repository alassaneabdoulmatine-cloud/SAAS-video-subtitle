import { userRole } from "@prisma/client";
import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from "class-validator";

export class CreateUserDto {

    @IsString({ message: "le nom doit etre une chaine de caractere" })
    @IsNotEmpty({ message: "le nom est requis" })
    @MinLength(3, { message: "le nom doit contenir au moins 3 caracteres" })
    @MaxLength(20, { message: "le nom doit contenir au plus 20 caracteres" })
    name: string;

    @IsEmail({}, { message: "l'email est invalide" })
    @IsNotEmpty({ message: "l'email est requis" })
    email: string;

    @IsNotEmpty({ message: "le mot de passe est requis" })
    @MinLength(8, { message: "le mot de passe doit contenir au moins 8 caracteres" })
    @MaxLength(20, { message: "le mot de passe doit contenir au plus 20 caracteres" })
    password: string;

    @IsOptional()
    @IsEnum(userRole, { message: "le role est invalide" })
    role?: userRole
}