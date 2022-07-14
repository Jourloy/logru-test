import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {Document} from "mongoose";

export type UserDocument = User & Document;

@Schema({timestamps: true})
export class User {
	@Prop()
	username: string;

	@Prop()
	password: string;

	@Prop()
	hash: string;

	@Prop()
	role: string;

	@Prop()
	scopes: string[];

	@Prop()
	refreshToken?: string;

	@Prop()
	twitchID?: string;

	@Prop()
	discordID?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);