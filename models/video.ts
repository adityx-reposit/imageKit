import mongoose, { Schema, model, models } from "mongoose";

export const Video_Dimention={
    width:1080,
    video:1920
} as const;

export interface Ivideo {
    id?:mongoose.Types.ObjectId,
    title:string;
    description:string;
    videoUrl:string;
    thumbnailUrl:string;
    controls?:boolean;
    
    transformation?:{
        height:number;
        width:number;
        quality:number;
    };

}

const videoSchema = new Schema<Ivideo>({
     title:{
        type:String,
        require:true,
        
     },
     description:{
        type:String,
        require:true,

     },
     videoUrl:{
        type:String,
        require:true,
        unique:true

     },
     
     thumbnailUrl:{
        type:String,
        require:true,
        unique:true

     },
     controls:{
        type:Boolean,
        default:true
     },
     transformation:{
        height:{Number,default:Video_Dimention},
        width:{Number,default:Video_Dimention},
        quality:{type:Number,min:1,max:100},

     }

     
});
const Video=models?.Video || model<Ivideo>('Video',videoSchema);
export default Video
