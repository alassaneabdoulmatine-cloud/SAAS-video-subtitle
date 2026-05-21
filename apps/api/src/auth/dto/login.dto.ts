import { IsNotEmpty, IsString, IsEmail, MinLength } from "class-validator";

export class LoginDto {
    @IsNotEmpty({ message: "L'email est requis" })
    @IsString({ message: "L'email doit être une chaîne de caractères" })
    @IsEmail({}, { message: "Veuillez entrer un email valide" })
    email: string;

    @IsNotEmpty({ message: "Le mot de passe est requis" })
    @IsString({ message: "Le mot de passe doit être une chaîne de caractères" })
    @MinLength(6, { message: "Le mot de passe doit contenir au moins 6 caractères" })
    password: string;
}
