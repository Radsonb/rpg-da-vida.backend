import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/configs/prisma/prisma.service';
import { LoginDto } from '../dto/login.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
		private readonly prisma: PrismaService,
		private readonly jwtService: JwtService
	) {}

  async create(data: LoginDto) {
    try {
      const existsUser = await this.prisma.user.findFirst({
        where: {
          email: data.email,
        },
				include: {
					title: {
						select: {
							name: true
						}
					}
				}
      });
			
			if(existsUser) {
				const comparePassword = await bcrypt.compare(data.password, existsUser.password);

				if (!comparePassword) {
					throw new BadRequestException('Credenciais inválidas')
				}

				const payload = {
					sub: existsUser.uuid,
					name: existsUser.name,
					email: existsUser.email,
					title: existsUser.title?.name || '',
				}
				
				const accessToken = await this.jwtService.signAsync(payload, { expiresIn: '1h' })
				const refreshToken = await this.jwtService.signAsync(payload, { expiresIn: '1h' })

				return {
					accessToken,
					refreshToken
				}
			}

			throw new BadRequestException('Credenciais inválidas')
    } catch (error) {
			throw new BadRequestException('Erro ao autenticar');
		}
  }
}
