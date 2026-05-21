import { IsNotEmpty, IsString, IsEmail, MinLength, IsOptional, MaxLength } from "class-validator";

export class RegisterDto {

    @IsOptional()
    @IsString({ message: "Le nom doit être une chaîne de caractères" })
    @MinLength(3, { message: "Le nom doit contenir au moins 3 caractères" })
    @MaxLength(50, { message: "Le nom doit contenir au plus 50 caractères" })
    name?: string;

    @IsNotEmpty({ message: "L'email est requis" })
    @IsEmail({}, { message: "Veuillez entrer un email valide" })
    email: string;

    @IsNotEmpty({ message: "Le mot de passe est requis" })
    @IsString({ message: "Le mot de passe doit être une chaîne de caractères" })
    @MinLength(6, { message: "Le mot de passe doit contenir au moins 6 caractères" })
    password: string;

}
