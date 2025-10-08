
const mongoose = require('mongoose');
const connectDB = async () => {
    const uri = "mongodb+srv://6222321:password11@cluster0.nvvmrgg.mongodb.net/e-commerce?retryWrites=true&w=majority&appName=Cluster0";


   
    
    
      try {
        await mongoose.connect(uri); 
       
        console.log('MongoDB connected successfully!');
      } catch (err) {
        console.error('MongoDB connection error:', err);
        process.exit(1); // Exit the application on connection failure
      }
    
}
export default connectDB;