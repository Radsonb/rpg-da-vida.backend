import { registerDecorator, ValidationArguments, ValidationOptions } from "class-validator";

export function Match(property: string, validationOptions?: ValidationOptions) {
	return function (object: Object, propertyName: string) {
		registerDecorator({
			name: 'match',
			target: object.constructor,
			propertyName: propertyName,
			options: validationOptions,
			constraints: [property],
			validator: {
				validate(value: any, args: ValidationArguments) {
					const [relatedPropertyName] = args.constraints;
					return value === (args.object as any)[relatedPropertyName];
				},
				defaultMessage(args: ValidationArguments) {
					const [relatedPropertyName] = args.constraints;
					return `${propertyName} deve ser igual a ${relatedPropertyName}`;
				},
			},
		});
	};
}