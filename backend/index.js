// Import necessary modules
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const helmet = require('helmet');
const authRouter = require('./routes/auth');
const carsRouter = require('./routes/cars');
const driversRouter = require('./routes/drivers');
const customersRouter = require('./routes/customers');
const dutySlipRouter = require('./routes/dutySlips');
const invoicesRouter = require('./routes/invoice');
const bookingsRouter = require('./routes/bookings');
const dutyTypesRouter = require('./routes/dutyTypes');

// Initialize the Express app
const app = express();
const corsMiddleware = cors();

// Middleware
app.use(helmet()); // Security middleware
app.use(cors()); // Enable Cross-Origin Resource Sharing (CORS)
app.use(bodyParser.json()); // Parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(morgan('dev')); // HTTP request logging
app.use('/uploads', (_, res, next) => {
  res.set('Cross-Origin-Resource-Policy', 'cross-origin');
  next();
})
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Create an Express router for the API endpoints
const apiRouter = express.Router();

// Routes
apiRouter.get('/', (req, res) => {
  res.json({ message: 'Welcome to the industry standard Express server!' });
});

// Prefix all routes with /api
app.use('/api', apiRouter);
apiRouter.use(authRouter);
apiRouter.use(carsRouter);
apiRouter.use(driversRouter);
apiRouter.use(customersRouter);
apiRouter.use(dutySlipRouter);
apiRouter.use(invoicesRouter);
apiRouter.use(bookingsRouter);
apiRouter.use(dutyTypesRouter);

// Start the server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
