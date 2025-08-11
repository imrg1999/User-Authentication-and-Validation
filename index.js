import express from 'express';
import { connectDB } from './Config/dbConnection.js';
import userRoutes from './Routes/userRoutes.js';
import authRoutes from './Routes/authRoutes.js'

const app = express();
const port = 3000;


//Middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//Route
app.use('/db',userRoutes);

// Mount your auth routes at /auth
app.use('/auth', authRoutes);

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