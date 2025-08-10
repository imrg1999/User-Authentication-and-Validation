import express, { urlencoded } from 'express';
import { connectDB } from './Config/dbConnection.js';
import userRoutes from './Routes/userRoutes.js';

const app = express();
const port = 3000;


//Middleware
app.use(express.json());
app.use(urlencoded({extended:true}));

//Route
app.use('/db',userRoutes);

//DB
connectDB();


app.get('/',(req,res)=> {
    return res.status(200).json({
        message: "HOMEPAGE"
    });
});

app.listen(port, () => {
    console.log(`server is listening on port no. ${port}`);
})