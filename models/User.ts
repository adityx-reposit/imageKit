import mongoose, { Schema, model, models } from "mongoose";
import bcrypt from "bcrypt";

export interface Iuser {
  email: string;
  password: string;
  _id?: mongoose.Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}


const userSchema=new Schema<Iuser>({
    email:{
        type:String ,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    }
});

userSchema.pre('save',async function(next){
    if(this.isModified('password')){
       this.password= await bcrypt.hash (this.password,10)
    }
    next()
})


const user = models?.User || model<Iuser>('User',userSchema)
export default user
