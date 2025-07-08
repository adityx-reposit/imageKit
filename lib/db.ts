import { error } from "console";
import mongoose from "mongoose";


const MONGODB_URL=process.env.MONGODB_URL!;


if(!MONGODB_URL){
  throw new Error("please define variables")
}



let catched = global.mongoose

if(!catched){
    catched= global.mongoose={
        conn:null,
        promise:null
 
    }
}


export async function ConnectData(){
   if(catched.conn){
    return catched.conn
   }
    if(!catched.promise){
        const opts ={
            bufferCommands:true,
            maxPoolSize:10
        }
        
        mongoose.connect(MONGODB_URL,opts)
        .then(()=>mongoose.connection)
    }
    try{
       catched.conn= await catched.promise
    }
    catch(error){
        catched.promise=null
    }
    return catched.conn;

}