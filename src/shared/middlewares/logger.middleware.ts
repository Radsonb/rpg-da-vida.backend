import { Injectable, Logger, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
	private readonly logger = new Logger(LoggerMiddleware.name);
	
	use(req: Request, res: Response, next: NextFunction) {
		const { method, originalUrl, body } = req;
		const start = Date.now();

		res.on('finish', () => {
			const responseTime = Date.now() - start;
			const statusCode = res.statusCode;
			const body = Object.keys(req.body || {}).length > 0 ? req.body : undefined;

			this.logger.log(`Request Time: [${new Date().toISOString()}]`);
			this.logger.log(`Method: ${method}`);
			this.logger.log(`URL: ${originalUrl}`);
			this.logger.log(`Status Code: ${statusCode}`);
			this.logger.log(`Response Time: ${responseTime}ms`);
			this.logger.log(`Body: ${body}`);			
		});

		next();
	}
}