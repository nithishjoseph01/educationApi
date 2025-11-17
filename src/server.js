require('dotenv').config();
const mongoose = require('mongoose');
const app = require('./app');

const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('MongoDB connected');
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    })
    .catch(err => {
        console.error('MongoDB Error:', err);
    });

const authRoutes = require("./routes/auth");
app.use("/auth", authRoutes);

const scheduleRoutes = require("./routes/schedule");
app.use("/schedules", scheduleRoutes);


const userRoutes = require("./routes/user");
app.use("/users", userRoutes);

