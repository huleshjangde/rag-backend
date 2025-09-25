import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import compression from 'compression';
import morgan from 'morgan';
import dotenv from 'dotenv';
dotenv.config();
// import rateLimit from 'express-rate-limit';

const app = express();

app.use(express.static('public'));

app.use(helmet());

// 🌐 CORS
app.use(cors({
  origin: ['http://localhost:3000'], // change for production
  credentials: true,
}));

// 🔃 Compression
app.use(compression());

// 📦 JSON parser
app.use(express.json());

// 📄 URL-encoded parser
app.use(express.urlencoded({ extended: true }));

// 📝 Logging (use 'combined' for production logs)
app.use(morgan('dev'));

// 🚫 Basic Rate Limiting (protects from brute-force attacks)
// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000, // 15 min
//   max: 100, // limit each IP to 100 requests per windowMs
// });
// app.use(limiter);

// 🧪 Health check route
app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

// 🎯 API Routes
app.use('/api', (req, res) => {
  res.json({ message: 'Hello World' });
});

// 🚀 Server start
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
