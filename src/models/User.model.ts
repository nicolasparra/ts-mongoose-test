import { model, Schema, Document } from "mongoose";
import bcrypt from "bcrypt";
import { softDeletePlugin } from "../plugins/softDelete";

const root = "https://s3.amazonaws.com/mybucket";

export interface IUser extends Document {
  idUser: string;
  name: string;
  password: string;
  role: string;
  comparePassword: (password: string) => Promise<Boolean>;
  encryptPassword: (password: string) => Promise<string>;
  picture: string;
  date?: Date;
}

const UserSchema: Schema = new Schema(
  {
    idUser: { type: String, required: true, unique: true },
    name: { type: String, required: true, lowercase: true, trim: true },
    password: { type: String, required: true, select: false },
    comments: {
      type: Array,
      required: false,
      //Función, mensaje error de validación.
      validate: [arrayLimit, "{PATH} exceeds the limit of 6"],
    },
    date: { type: Date, default: Date.now, required: false, alias: "fecha" },
    socialNetworks: {
      type: Map,
      of: String,
      required: false,
    },
    picture: {
      type: String,
      get: (v) => `${root}${v}`,
      required: false,
    },
    role: {
      type: String,
      enum: ["executive", "admin", "superAdmin"],
      default: "executive",
    },
  },
  {
    timestamps: true,
  }
);

softDeletePlugin(UserSchema);

function arrayLimit(val) {
  return val.length <= 6;
}

UserSchema.pre<IUser>("save", async function (next) {
  try {
    const user = this;
    if (!user.isModified("password")) return next();

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(user.password, salt);
    user.password = hash;

    next();
  } catch (error) {
    next(error.message);
  }
});

UserSchema.pre("updateOne", async function (next) {
  try {
    if (this._update.password) {
      const salt = await bcrypt.genSaltSync(10);
      const hashPass = await bcrypt.hashSync(this._update.password, salt);
      this._update.password = hashPass;
    }

    next();
  } catch (error) {
    next(error.message);
  }
});

UserSchema.methods = {
  comparePassword: async function (password: string): Promise<Boolean> {
    return await bcrypt.compare(password, this.password);
  },
  encryptPassword: async function (plainTextPassword): Promise<string> {
    if (!plainTextPassword) {
      return "";
    } else {
      const salt = await bcrypt.genSaltSync(10);
      return await bcrypt.hashSync(plainTextPassword, salt);
    }
  },
};

const User = model<IUser>("User", UserSchema);

// User.watch().on("change", (data) => console.log("User ", new Date(), data));

export default User;

/*
-required: booleano o función, si es verdadero agrega un validador requerido para esta propiedad
-default: Any o función, establece un valor predeterminado para la ruta. Si el valor 
          es una función, el valor de retorno de la función se utiliza como valor predeterminado.
-select:  boolean, especifica proyecciones predeterminadas para consultas.
-validate: función, agrega una función de validación para esta propiedad
-get: función, define un getter personalizado para esta propiedad usando Object.defineProperty ().
-set: función, define un setter personalizado para esta propiedad usando Object.defineProperty ().
-alias: string, mongoose> = 4.10.0 solamente. Define un virtual con el nombre dado que obtiene/establece esta ruta.
-immutable:booleano, define la ruta como inmutable. Mongoose le impide cambiar las rutas inmutables a 
           menos que el documento principal tenga isNew: true.
-transform: function, Mongoose llama a esta función cuando llama a la función 
            Document # toJSON (), incluso cuando JSON.stringify () un documento. 
*/
