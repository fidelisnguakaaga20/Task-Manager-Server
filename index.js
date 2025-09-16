// const express = require('express');
// require('dotenv').config();
// const app = express();
// const connectDB = require('./connect');
// const cors = require("cors");
// const router = require("./routes/tasks");

// app.use(cors());
// app.use(express.json());
// app.use("/api/v1/tasks", router);

//         const start = async () => {
//     try {
//         await connectDB(process.env.MONGO_URI)
//         app.listen(process.env.PORT, () => console.log("Server started..."));
//     } catch (error) {
//         console.log(err)
//     }
// };

// start();


require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./connect');
const router = require('./routes/tasks');

const app = express();

// allow Vite dev origin
app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());

// routes
app.use('/api/v1/tasks', router);

const PORT = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(PORT, () => {
      console.log(`Server started on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.log(err);
  }
};

start();
