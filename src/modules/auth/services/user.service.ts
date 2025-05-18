import { ConflictException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/shared/configs/prisma/prisma.service";
import { RegisterUserDto } from "../dto/register-user.dto";
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
	constructor(private readonly prisma: PrismaService) {}

	async registerUser(data: RegisterUserDto) {
		try {
			const existsuser = await this.prisma.user.findFirst({
				where: { email: data.email}
			});

			if (existsuser) {
				throw new ConflictException('Usuário já cadastrado')
			}

			const hashedPassword = await bcrypt.hash(data.password, 10);

			await this.prisma.user.create({
				data: {
					name: data.name,
					email: data.email,
					password: hashedPassword
				}
			})

			return {
				message: 'usuário cadastrado com sucesso'
			}
		} catch (error) {
			console.log('erro ao cadastrar usuario', error.message)
		}
	}
}