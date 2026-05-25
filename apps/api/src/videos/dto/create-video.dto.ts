import { IsNotEmpty, IsString, IsOptional, MaxLength, MinLength } from "class-validator";

export class CreateVideoDto {
    @IsNotEmpty({ message: "Le titre est requis" })
    @IsString({ message: "Le titre doit être une chaîne de caractères" })
    @MinLength(3, { message: "Le titre doit contenir au moins 3 caractères" })
    @MaxLength(50, { message: "Le titre doit contenir au plus 50 caractères" })
    title: string;

    @IsOptional()
    @IsString({ message: "La description doit être une chaîne de caractères" })
    @MinLength(3, { message: "La description doit contenir au moins 3 caractères" })
    @MaxLength(1000, { message: "La description doit contenir au plus 1000 caractères" })
    description: string;

    @IsNotEmpty({ message: "L'URL est requise" })
    @IsString({ message: "L'URL doit être une chaîne de caractères" })
    url: string;
}
