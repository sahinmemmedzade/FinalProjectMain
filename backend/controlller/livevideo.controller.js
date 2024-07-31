
import NodeWebcam from 'node-webcam';
import User from '../model/auth.model.js';

let webcamInstance = null;
let isCameraRunning = false;
let liveVideo = null;
let viewersCount = 0;

export const startCamera = () => {
    if (isCameraRunning) {
        console.log('Camera is already running.');
        return;
    }

    const webcam = NodeWebcam.create({});

    const capture = () => {
        webcamInstance = webcam.capture('output', (err, data) => {
            if (err) {
                console.error('Error capturing image:', err);
                return;
            }
            console.log('Image captured:', data);

            const newLiveVideo = {
                streamName: 'Live Stream',
                description: 'Open audio and video',
                timestamp: new Date().toISOString()
            };
            liveVideo = newLiveVideo; 

            
            if (isCameraRunning) {
                capture();
            }
        });
    };

    isCameraRunning = true;
    capture();
};

export const stopCamera = () => {
    if (webcamInstance) {
        webcamInstance.stop();
        webcamInstance = null;
        console.log('Camera stopped.');
    }
    
    isCameraRunning = false;
    viewersCount = 0; 
};

export const startStream = async (req, res) => {
    const { streamName, description } = req.body;

    try {
        if (!isCameraRunning) {
            startCamera();
        }

       
        const newLiveVideo = {
            streamName,
            description,
            timestamp: new Date().toISOString()
        };
        liveVideo = newLiveVideo;

        res.status(200).json({ message: `Live stream started: ${streamName}` });
    } catch (error) {
        console.error(`Error starting stream: ${error.message}`);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const getCurrentLiveVideo = async(req, res) => {
    if (isCameraRunning && liveVideo) {
        res.status(200).json({ liveVideo, viewersCount }); 
    } else {
        res.status(404).json({ message: 'No live video available.' });
    }
};

export const stopStream = async (req, res) => {
    try {
      

        stopCamera();
        res.status(200).json({ message: 'Live stream stopped.' });
    } catch (error) {
        console.error(`Error stopping stream: ${error.message}`);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const joinStream = (req, res) => {
    if (liveVideo) {
        viewersCount++; 
        res.status(200).json({ viewersCount });
    } else {
        res.status(404).json({ message: 'No live video available.' });
    }
};
export const leaveStream = (req, res) => {
    if (liveVideo) {
        viewersCount--; 
        res.status(200).json({ viewersCount });
    } else {
        res.status(404).json({ message: 'No live video available.' });
    }
};
export const changeVideoQuality = (req, res) => {
    const { quality } = req.body;

    // Assume quality is properly handled elsewhere, such as adjusting camera settings

    res.status(200).json({ message: `Video quality changed to ${quality}` });
};
