import {MiddlewareConsumer, Module} from '@nestjs/common';
import {UserModule} from './user/user.module';
import {AuthModule} from './auth/auth.module';
import {AuthMiddleware} from "./middlewares/auth.middleware";
import {MongooseModule} from "@nestjs/mongoose";
import {ConfigModule, ConfigService} from "@nestjs/config";

@Module({
	imports: [
		ConfigModule.forRoot(),
		MongooseModule.forRootAsync({
			imports: [ConfigModule],
			useFactory: async (configService: ConfigService) => ({
				uri: `mongodb://${configService.get(`MONGO_HOST`)}:${configService.get(`MONGO_PORT`)}/logru`,
			}),
			inject: [ConfigService],
		}),
		UserModule,
		AuthModule
	],
	controllers: [],
	providers: [],
})

export class AppModule {
	configure(consumer: MiddlewareConsumer) {
		consumer.apply(AuthMiddleware).forRoutes(`*`);
	}
}
