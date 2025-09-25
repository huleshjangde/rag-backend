import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import compression from 'compression';
import morgan from 'morgan';
import dotenv from 'dotenv';
                                              dotenv.config();

const app = express();

app.use(express.static('public'));

app.use(helmet());

// 🌐 CORS
app.use(cors({
  origin: (req, callback) => callback(null, true),
  credentials: true,
}));


app.use(compression());

app.use(express.json());


app.use(express.urlencoded({ extended: true }));


app.use(morgan('dev'));

app.get('/health', (_req, res) => {
  console.log('====================================');
  console.log('🧪 Health check route accessed');
  console.log('====================================');
  res.json({ status: 'ok' });
});

app.use('/api', (req, res) => {
  res.json({ message: 'Hello World' });
});

// 🚀 Server start
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('====================================');
  console.log('🚀 Server is running...');
  console.log('👉 http://localhost:' + PORT );
  console.log('====================================');
  console.log(`Health check at http://localhost:${PORT}/health`);
  
});
