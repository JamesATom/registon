import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
    private logger = new Logger('HTTP');

    use(req: Request, res: Response, next: NextFunction) {
        const { method, originalUrl, ip, body } = req;
        const userAgent = req.get('user-agent') || '';

        // Get auth header (if exists) for debugging
        let authHeader = req.get('authorization') || 'None';
        if (authHeader !== 'None') {
            // For security, show only first 20 chars of token
            const parts = authHeader.split(' ');
            if (parts.length === 2) {
                // If it's a Bearer token
                const tokenStart = parts[1].substring(0, 20);
                authHeader = `${parts[0]} ${tokenStart}...`;
            }
        }

        this.logger.log(
            `[REQUEST] ${method} ${originalUrl} - IP: ${ip} - UserAgent: ${userAgent} - Auth: ${authHeader} - Body: ${JSON.stringify(body)}`,
        );
        const start = Date.now();

        res.on('finish', () => {
            const { statusCode } = res;
            const contentLength = res.get('content-length');
            const responseTime = Date.now() - start;

            this.logger.log(
                `[RESPONSE] ${method} ${originalUrl} - StatusCode: ${statusCode} - ContentLength: ${contentLength} - Time: ${responseTime}ms`,
            );
        });

        next();
    }
}
