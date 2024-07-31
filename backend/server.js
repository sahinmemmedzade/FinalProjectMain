import express from 'express';
import session from 'express-session';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import { createServer } from 'http';
import { Server } from 'socket.io';
import multer from 'multer';
import cors from 'cors';
import SidebarlikeRoute from './route/sidebarlike.rouer.js'
import SidebardislikeRoute from './route/sidebardislike.router.js'
import AuthRoute from './route/auth.routes.js';
import VideoRoute from './route/video.router.js';
import CategoryRoute from './route/category.routes.js';
import ContactRoute from './route/contact.routes.js';
import LiveStreamRoute from './route/livestream.route.js';
import AdvertisimentRoute from './route/advertisiment.routes.js';
import ReviewRoute from './route/review.routes.js';
import NewsRoute from './route/news.rote.js';
import NewsViewRoute from './route/newsview.route.js';
import LikeRoute from './route/like.route.js';
import DislikeRoute from './route/dislike.route.js';
import NewssidebarRoute from './route/newssidebar.route.js';
import SidebarComentRoute from './route/sidebarcomment.route.js';
import BreakingNewsRoute from './route/BreakingNews.router.js';

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;
const MongoDB_url = process.env.MONGODB_URL;

const httpServer = createServer(app);
const io = new Server(httpServer);

// Multer Configuration for Advertisements
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'Images/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage: storage });

// Multer Configuration for News
const newsStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'Images/News/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const newsUpload = multer({ storage: newsStorage });

// Middleware
app.use(cookieParser());
app.use(express.static('./'));
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/auth', AuthRoute);
app.use('/api/video', VideoRoute);
app.use('/api/category', CategoryRoute);
app.use('/api/contact', ContactRoute);
app.use('/api/live-stream', LiveStreamRoute);
app.use('/api/advertisiment', upload.single('productPic'), AdvertisimentRoute);

app.use('/api/news', newsUpload.single('image'), NewsRoute); // Add news route with multer
app.use('/api/review', ReviewRoute);
app.use('/api/newsview', NewsViewRoute);
app.use('/api/like', LikeRoute);
app.use('/api/dislike', DislikeRoute);
app.use('/api/newssidebar', NewssidebarRoute);
app.use('/api/sidebarcomment', SidebarComentRoute);
app.use('/api/Breakingnews', BreakingNewsRoute);
app.use('/api/newssidebarlike', SidebarlikeRoute);
app.use('/api/newssidebardislike', SidebardislikeRoute);


// Socket.IO connection management
io.on('connection', (socket) => {
    console.log('A user connected.');

    socket.on('disconnect', () => {
        console.log('User disconnected.');
    });

    socket.on('startStream', (data) => {
        console.log(`Starting stream for ${data.streamName}`);
        // Handle necessary actions here
    });
});

// Start server
httpServer.listen(PORT, () => {
    mongoose.connect(MongoDB_url).then(() => {
        console.log(`Database connected and server listening on ${PORT}`);
    }).catch((error) => {
        console.error('MongoDB connection error:', error);
    });
});
