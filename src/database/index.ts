import mongoose from 'mongoose';


export const connectDatabase = () => {
    mongoose.connect(
        // `${process.env.MONGO_DATABASE_URI}`,
        `mongodb+srv://admin:uAlYBeoYGu6xbtKm@cluster0.7w75e.mongodb.net/strapp?retryWrites=true&w=majority`,
        { useNewUrlParser: true, useUnifiedTopology: true }
    );


    return new Promise<void>((resolve, reject) => {
        mongoose.connection.on('error', () => { 
            console.error.bind(console, 'connection error:')
            reject();
        });
        mongoose.connection.once('open', function() {
            console.log('DATABASE CONNECTED!');
            resolve();
        });
    });
}