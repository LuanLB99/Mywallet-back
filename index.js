import  express from "express";
import { MongoClient } from "mongodb";
import joi from "joi";
import dotenv from 'dotenv';
import cors from "cors";
import bcrypt from "bcrypt";
import dayjs from "dayjs";
import { v4 as uuid} from "uuid";

dotenv.config();
const server = express();
server.use(cors());
server.use(express.json());


let db;
const mongoClient = new MongoClient(process.env.MONGO_URI);
mongoClient.connect().then(() =>{
    db = mongoClient.db("test");
})


const signSchema = joi.object({
    name: joi.string().required().min(3).empty(""),
    email:joi.string().email().required(),
    password: joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
    repeat_password: joi.ref('password'),
}).with("password", "repeat_password");

const loginSchema = joi.object({
    email:joi.string().email().required().empty(""),
    password:joi.string().required()
});

const transactionSchema = joi.object({
    value:joi.number().empty("").required(),
    description: joi.string().min(3).max(30).empty("").required(),
    type:joi.string().required()
})


server.post('/sign', async(req, res) => {
    const {name, email, password, repeat_password} = req.body;

    const sign = signSchema.validate({name, email, password, repeat_password});
    if(sign.error){
     return res.status(401).send(sign.error.details.map((detail) => detail.message));
    }

    
    try{
        const user = await db.collection('users').findOne({name});
        console.log(user);
        if(user) {
           return res.status(401).send("Usuário ja existe");
        }

        const passwordHash = bcrypt.hashSync(password,10);
    
    db.collection('users').insertOne({
        name,
        email,
        password:passwordHash,
        transactions:[]
    })


    } catch(error){
        console.log(error.message);
    }
    

    res.send('inseriu usuário');
})

server.post('/sign-up', async(req, res) => {
    const {email, password} = req.body;

    const login = loginSchema.validate({email,password});
    if(login.error){
        return res.status(401).send(login.error.details.map((detail) => detail.message));
    }

    try {
        const user = await db.collection('users').findOne({email});
        console.log(user);
        if(user && bcrypt.compareSync(password,user.password)){
            const token = uuid();

           await db.collection('sessions').insertOne({
                userId:user._id,
                token
            })
            return res.status(201).send(token)
        } else {
            return res.status(401).send("usuário e/ou senha incorretos!");
        }

    } catch (error) {
        console.error(error)
    }

    res.sendStatus("ok")
}
)

server.get('/', async (req, res) => {
    const { authorization } = req.headers;
    const token = authorization?.replace('Bearer ', "")



    if(!token){return res.status(401).send("SAaai daqui");}


    try {
        const session = await db.collection("sessions").findOne({token})

    if(!session){ return res.sendStatus(401);}

        const user = await db.collection("users").findOne({_id:session.userId});
        console.log(user)
        const transactions = await db.collection("transactions").find().toArray();
        const filtertransactions = transactions
        .filter(transaction => transaction.name === user.name);

        if(!user){
            return res.sendStatus(401); 
        }
        const myuser = {
            name: user.name,
            email:user.email,
            transactions:filtertransactions
        }


        return res.send(myuser)
        
    } catch {
        console.error(error)
    }
    

    res.sendStatus(201)
})

server.post('/transactions', async (req, res) =>{
    const {authorization} = req.headers;
    const { value, description, type} = req.body;

    const validation = transactionSchema.validate({value, description, type})

    if(validation.error){
        return res.status(401).send(validation.error.details.map((detail) => detail.message));
    }

    const token = authorization?.replace('Bearer ', "")

    if(!token){return res.status(401);}

    try {
        const session = await db.collection("sessions").findOne({token})

    if(!session){ return res.sendStatus(401);}

        const user = await db.collection("users").findOne({_id:session.userId});

    if(!user){ return res.sendStatus(401); } 

    await db.collection("transactions").insertOne({
            name:user.name,
            userId:user._id,
            value,
            description,
            type,
            date:dayjs().format('DD/MM')
        })

    } catch {
            console.error(error);
        }

       
        res.sendStatus(200);
})

server.listen(5000, console.log("The magic happens on port 5000"))