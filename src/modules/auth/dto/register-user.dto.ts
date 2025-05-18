import { IsEmail, IsString, MinLength } from "class-validator";
import { Match } from "src/shared/decorators/match.decorator";

export class RegisterUserDto {
	@IsString()
	name: string;

	@IsEmail()
	email: string;

	@IsString()
	@MinLength(8, {message: 'A senha deve conter 8 caracteres'})
	password: string;

	@IsString()
	@Match('password', {message: 'As senhas não coincidem'})
	confirm_password: string;
}