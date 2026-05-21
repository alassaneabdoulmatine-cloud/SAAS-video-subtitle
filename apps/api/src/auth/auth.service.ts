import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { user } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {


  constructor(private readonly userservice: UserService, private readonly jwtService: JwtService) { }


  // 1. Valider l'utilisateur lors du login
  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userservice.findByEmail(email);
    if (user && (await this.userservice.verifyPASSWORD(password, user.password))) {
      const { password, ...result } = user;
      return result; // Retourne l'utilisateur sans son mot de passe
    }
    return null;
  }

  // fonction priver pour generer le token
  private generateToken(user: any) {
    return {
      access_token: this.jwtService.sign({
        sub: user.id,
        email: user.email,
      }),
    };
  }

  // 2. Générer le JWT
  async login(user: user) {
    return this.generateToken(user);
  }

  // 3. Enregistrer un utilisateur
  async register(registerDto: RegisterDto) {
    const existingUser = await this.userservice.findByEmail(registerDto.email);
    if (existingUser) {
      throw new ConflictException("Cet email est déjà utilisé");
    }
    const user = await this.userservice.create({
      name: registerDto.name || 'Utilisateur',
      email: registerDto.email,
      password: registerDto.password,
    });
    return this.generateToken(user);
  }
}
