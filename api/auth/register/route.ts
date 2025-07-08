import { NextRequest, NextResponse } from "next/server";
import { ConnectData } from "../../../lib/db";
import user from "../../../models/User";


export async function POST(request:NextRequest){
   
    try {
        const {email,password}=await request.json()
        if(!email || !password){
            return NextResponse.json(
                {error : "Email and password are required"},
                {status:400}
            )
        }
        
        await ConnectData()


        const existingUser=await user.findOne({
            email
        })

        if(existingUser){
            NextResponse.json(
                {error:"User Already Existed"},
                {status:403}
            )
        }

        await user.create({
            email,
            password
        })

        return NextResponse.json(
            {message:"You Have Successfully Signed UP"},
            {status:200}
        )
}
catch(error){
    console.log(error);    
}
 
}
export async function GET(){
      
}
export async function PUT(){

}