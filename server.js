const express = require('express');
const cors = require('cors')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const authRoutes = require('./routes/auth');
const categoryRoutes = require('./routes/category');
const productRoutes = require('./routes/product');

const app = express();

//MIDDLEWARE
app.use(cors());
app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.json());
app.use('/uploads', express.static('uploads'))

//linking the frontend part
//authorization
app.use('/api/auth', authRoutes);
//questionaire 
//(tutor create, read, update and delete questions)
//description,list of students, publishing(ongoing/scheduled) and deadline date.

//(student)
//(read,add)

app.use('/api/category',categoryRoutes);
app.use('/api/product',productRoutes);

//


//mongoose DB 
const connectDB = require('./database/db');

connectDB();
//on our local machine it will run on port (number 5000) but
//as we push it on a server Port shall be assigned
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Listening on port ${port}`));


