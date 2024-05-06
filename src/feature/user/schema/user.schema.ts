import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HabbitEnum } from "../enum/habbit.enum";
import { RoleEnum } from "../enum/role.enum";
import { HydratedDocument } from "mongoose";
import { hashSync } from "bcrypt";

@Schema({ timestamps: true, collection: "users" })
export class User {
    @Prop({ type: String, default: "" })
    username: string;

    @Prop({ type: String, default: "" })
    password: string;

    @Prop({ type: String, default: "" })
    fullName: string;

    @Prop({ type: String, default: "" })
    email: string;

    @Prop({ type: String, default: "" })
    phoneNumber: string;

    @Prop({ type: String, default: RoleEnum.USER })
    role: RoleEnum;

    @Prop({ type: [String], default: [] })
    habbit: HabbitEnum[];

    @Prop({ type: [String], default: [] })
    address: string[];

    @Prop({ type: String, default: ''})
    avatar: string;

}
export type UserDocument = HydratedDocument<User>;
const UserSchema = SchemaFactory.createForClass(User);

// crypt password
UserSchema.pre("save", async function preSave(next: any) {
    const useṛ: any = this;

    if (!useṛ.isModified('password')) return next();

    useṛ.password = await hashSync(useṛ.password, 10);

    return next();
})

export default UserSchema;