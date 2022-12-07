import dotenv from 'dotenv';

dotenv.config();

const MONGO_USERNAME = process.env.MONGO_USERNAME || '';
const MONGO_PASSWORD = process.env.MONGO_PASSWORD || '';
const MONGO_DATABASE = process.env.MONGO_DATABASE || '';
const MONGO_URI = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@cluster0.4wp4c.mongodb.net/${MONGO_DATABASE}`;
const SESSION_SECRET = process.env.SESSION_SECRET || '';
const NODE_ENV = process.env.NODE_ENV;
const PORT = process.env.PORT || 5002;

export const config = {
    mongo: {
        url: MONGO_URI
    }, 
    server: {
        port: PORT
    },
    passport: {
        session_secret: SESSION_SECRET
    },
    env: {
        node_env: NODE_ENV
    }
}