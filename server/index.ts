import express from 'express';
import dotenv from 'dotenv';
import {connectDB} from './config/mongooseConnect';
//import userRoutes from './routes/user.routes';

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

//app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=>console.log(`server running on port ${PORT}`));
