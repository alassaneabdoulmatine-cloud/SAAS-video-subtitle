import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/Prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { updateuserDto } from './dto/update-user.dto';

const saltOrRounds = 10

@Injectable()
export class UserService {
    constructor(private readonly prisma: PrismaService) { }

    // Créer un utilisateur
    async create(createUserDto: CreateUserDto) {
        try {
            const hashedPassword = await bcrypt.hash(createUserDto.password, saltOrRounds);
            const user = await this.prisma.user.create({
                data: {
                    ...createUserDto,
                    password: hashedPassword,
                },
            });

            const { role, password, ...userWithoutPassword } = user;
            return userWithoutPassword;
        } catch (error) {
            throw new BadRequestException("Impossible de créer l'utilisateur : " + error.message);
        }
    }

    // Récupérer tous les utilisateurs (uniquement le rôle USER)
    async findAll() {
        try {
            return await this.prisma.user.findMany({
                where: { role: 'USER' },
                select: {
                    id: true,
                    name: true,
                    email: true,
                },
            });
        } catch (error) {
            throw new BadRequestException('Erreur lors de la récupération des utilisateurs : ' + error.message);
        }
    }

    // Récupérer un utilisateur par son ID
    async findOne(id: string) {
        try {
            const user = await this.prisma.user.findUnique({
                where: { id },
                select: {
                    id: true,
                    name: true,
                    email: true,
                },
            });

            if (!user) throw new NotFoundException(`L'utilisateur avec l'ID ${id} n'existe pas`);
            return user;
        } catch (error) {
            if (error instanceof NotFoundException) throw error;
            throw new BadRequestException("Erreur lors de la récupération de l'utilisateur : " + error.message);
        }
    }

    // Trouver un utilisateur par son email (Utile pour l'Auth / Login)
    // On garde TOUS les champs (y compris le password) pour pouvoir valider la connexion dans l'AuthService
    async findByEmail(email: string) {
        try {
            return await this.prisma.user.findUnique({
                where: { email },
            });
        } catch (error) {
            throw new BadRequestException("Erreur lors de la recherche par email : " + error.message);
        }
    }

    // Mettre à jour un utilisateur
    async update(id: string, updateUserDto: updateuserDto) {
        try {
            // On prépare les données à modifier
            const updateData: updateuserDto = { ...updateUserDto };

            // Si un nouveau mot de passe est fourni, on le hache
            if (updateUserDto.password) {
                updateData.password = await bcrypt.hash(updateUserDto.password, saltOrRounds);
            } else {
                // S'il n'est pas fourni, on supprime la clé pour ne pas écraser l'ancien en BDD
                delete updateData.password;
            }

            const user = await this.prisma.user.update({
                where: { id },
                data: updateData,
            });

            const { password, role, ...userWithoutPass } = user;
            return userWithoutPass;
        } catch (error) {
            throw new BadRequestException("Erreur lors de la mise à jour de l'utilisateur : " + error.message);
        }
    }

    // Supprimer un utilisateur
    async delete(id: string) {
        try {
            const user = await this.prisma.user.delete({
                where: { id },
            });
            const { password, role, ...userWithoutPass } = user;
            return userWithoutPass;
        } catch (error) {
            throw new BadRequestException("Erreur lors de la suppression de l'utilisateur : " + error.message);
        }
    }

    // Vérifier le mot de passe
    async verifyPASSWORD(plainPassword: string, hashPassword: string) {
        return await bcrypt.compare(plainPassword, hashPassword);
    }
}