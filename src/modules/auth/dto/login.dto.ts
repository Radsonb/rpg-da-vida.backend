import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class LoginDto {
	@IsEmail()
	@IsNotEmpty()
	email: string;

	@IsString()
	@MinLength(8, {message: 'a senha deve conter no mínimo 8 caracteres'})
	password: string
}