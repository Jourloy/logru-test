import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";
// eslint-disable-next-line @typescript-eslint/no-var-requires
require(`dotenv`).config();

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	const config = new DocumentBuilder()
		.setTitle(`LOGRU test case`)
		.setDescription(`API description`)
		.setVersion(`1.0.0`)
		.addTag(`User`)
		.addTag(`Auth`)
		.addBearerAuth()
		.build();
	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup(`api`, app, document);

	await app.listen(process.env.APP_PORT);
}

bootstrap();
