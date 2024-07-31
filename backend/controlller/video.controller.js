// video.controller.js

import Video from '../model/video.model.js';

export const createVideo = async (req, res) => {
  try {
    const { title, description, videoUrl } = req.body;
    const newVideo = new Video({ title, description, videoUrl });
    await newVideo.save();
    res.status(201).send(newVideo);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

export const getAllVideos = async (req, res) => {
  try {
    const videos = await Video.find();
    res.status(200).send(videos);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

export const getVideo = async (req, res) => {
  try {
    const { id } = req.params;
    const video = await Video.findById(id);
    if (!video) {
      return res.status(404).send({ error: 'Video not found' });
    }
    res.status(200).send(video);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

export const updateVideo = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, videoUrl } = req.body;
    const updatedVideo = await Video.findByIdAndUpdate(id, { title, description, videoUrl }, { new: true });
    if (!updatedVideo) {
      return res.status(404).send({ error: 'Video not found' });
    }
    res.status(200).send(updatedVideo);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

export const deleteVideo = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedVideo = await Video.findByIdAndDelete(id);
    if (!deletedVideo) {
      return res.status(404).send({ error: 'Video not found' });
    }
    res.status(200).send({ message: 'Video deleted successfully' });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};
