import { VideoStatus } from "@prisma/client";
import { IsNotEmpty, IsString, IsOptional, MaxLength, MinLength, IsDate, IsNumber, IsEnum, IsObject } from "class-validator";

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

    @IsOptional()
    @IsEnum(VideoStatus, { message: "Le statut doit être PENDING, PROCESSING, READY ou ERROR" })
    status: VideoStatus;

    @IsOptional()
    @IsString({ message: "La clé S3 doit être une chaîne de caractères" })
    videoRawKey: string;

    @IsOptional()
    @IsString({ message: "La clé S3 doit être une chaîne de caractères" })
    videoRawUrl: string;

    @IsOptional()
    @IsString({ message: "La clé S3 doit être une chaîne de caractères" })
    thumbnailKey: string;

    @IsOptional()
    @IsString({ message: "La clé S3 doit être une chaîne de caractères" })
    thumbnailUrl: string;

    @IsOptional()
    @IsString({ message: "La clé S3 doit être une chaîne de caractères" })
    videoFinalKey: string;

    @IsOptional()
    @IsObject({ message: "Les sous-titres doivent être un objet" })
    subtitles: object;

    @IsOptional()
    @IsString({ message: "Le nom du fichier doit être une chaîne de caractères" })
    fileName: string;

    @IsOptional()
    @IsNumber()
    fileSize: number;

    @IsOptional()
    @IsString({ message: "Le type MIME doit être une chaîne de caractères" })
    mimeType: string;

    @IsOptional()
    @IsString({ message: "La durée doit être une chaîne de caractères" })
    duration: string;

    @IsNotEmpty({ message: "L'ID du projet est requis" })
    @IsString({ message: "L'ID du projet doit être une chaîne de caractères" })
    projectId: string;

}

// model Video {
//   id String @id @default (uuid())

//   title       String
//   description String ?

//         status VideoStatus @default (PENDING)

//   videoRawUrl  String ?
//         videoRawKey  String ?
//             thumbnailUrl String ?
//                 thumbnailKey String ?

//                     videoFinalKey String ? //video securiser
//                         subtitles     Json ?

//                             fileName String ?
//                                 fileSize Int ?
//                                     mimeType String ?

//                                         duration String ? @default ("00:00")

//   projectId String
//   project   Project @relation(fields: [projectId], references: [id], onDelete: Cascade)

//   createdAt DateTime @default (now())
//   updatedAt DateTime @updatedAt
// }
