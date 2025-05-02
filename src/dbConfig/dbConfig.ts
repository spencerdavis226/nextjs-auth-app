import mongoose from 'mongoose';

export async function connect() {
  try {
    await mongoose.connect(process.env.MONGO_URL!);
    const connection = mongoose.connection;

    connection.on('connected', () => {
      console.log('MongoDB connected');
    });

    connection.on('error', (err) => {
      console.error('MongoDB connection error:', err);
      process.exit();
    });
  } catch (error) {
    console.error('MongoDB connection error:', error);
  }
}
