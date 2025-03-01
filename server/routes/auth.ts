import express,{ Request, Response } from "express";
import { generateToken } from "../auth";
import { User } from "../user";

module.exports = (app: express.Express) => {
    app.post('/api/login' ,(req:Request,res:Response):void => {
        try{
            const {username, password} = req.body;
            const user = User[username];
            if (user === undefined) {
                 res.status(401).json({success:false,message: 'Invalid username'})
                 return
            }
            if (user !== password) {
                 res.status(401).json({success:false,message: 'Invalid password'})
                 return
            }
    
            const token = generateToken({username})
    
             res.status(200).json({success:true, token ,message: 'Login successful'})
             return
    
        }catch(error) {
            res.status(401).json({message: 'Unauthorized'})
            return
        }
    })
}