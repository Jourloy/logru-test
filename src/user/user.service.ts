import {Injectable} from '@nestjs/common';
import {Model} from "mongoose";
import {InjectModel} from "@nestjs/mongoose";
import {User, UserDocument} from "./schemas/user.schema";
import * as jwt from "jsonwebtoken";
import * as crypto from "crypto";

@Injectable()
export class UserService {
	constructor(
		@InjectModel(User.name) private userModel: Model<UserDocument>,
	) {
	}

	/**
	 * This function creates a new user in the database
	 * @param {UserCreate} opt - UserCreate
	 * @returns An object with two properties: error and token.
	 */
	public async create(opt: UserCreate): Promise<UserCreateReturn> {
		const _user = await this.getOneByUsername(opt.username);

		if (_user) return {error: true};

		const token = this.generateToken(opt.username);
		const pass = crypto
			.createHash(`sha256`)
			.update(opt.password)
			.digest(`hex`);

		const u = new this.userModel({
			username: opt.username,
			password: pass,
			role: `user`,
		});
		await u.save();

		return {error: false, token: token};
	}

	/**
	 * Get a user by their username.
	 * @param {string} username - string
	 * @returns A promise that resolves to a user object.
	 */
	public async getOneByUsername(username: string) {
		return await this.userModel.findOne({username: username}).exec();
	}

	/**
	 * It returns a promise that resolves to an array of all the users in the database
	 * @returns An array of all the users in the database.
	 */
	public async getAll() {
		return this.userModel.find().exec();
	}

	/**
	 * It takes a UserChange object, finds the user with the given username, changes the user's
	 * username and role to the values in the UserChange object, and then saves the user
	 * @param {UserChange} opt - UserChange
	 * @returns The user object
	 */
	public async change(opt: UserChange) {
		const user = await this.getOneByUsername(opt.username);
		if (opt.username) user.username = opt.username;
		if (opt.role) user.role = opt.role;
		await user.save();
		return user;
	}

	/**
	 * It removes a user from the database.
	 * @param {string} username - The username of the user to be removed.
	 * @returns A boolean value.
	 */
	public async remove(username: string) {
		return await this.userModel.findOneAndRemove({username: username})
			.then(() => true)
			.catch(() => false);
	}

	/**
	 * It takes a username as an argument, and returns a JWT token that expires in 15 minutes
	 * @param {string} username - The username of the user that is logging in.
	 * @returns A token that is signed with the username and the secret.
	 */
	public generateToken(username: string) {
		return jwt.sign({username: username}, process.env.SECRET, {expiresIn: `15min`});
	}
}

interface UserCreateReturn {
	error: boolean;
	token?: string;
}

interface UserCreate {
	username: string;
	password: string;
}

interface UserChange {
	username?: string;
	role?: string;
}