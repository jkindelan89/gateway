import { ArgumentsHost, ExceptionFilter } from '@nestjs/common';
import { MongoError } from "mongodb";
import { HttpAdapterHost } from "@nestjs/core";
export declare class MongoExceptionFilter implements ExceptionFilter {
    private readonly httpAdapterHost;
    constructor(httpAdapterHost: HttpAdapterHost);
    catch(exception: MongoError, host: ArgumentsHost): void;
}
