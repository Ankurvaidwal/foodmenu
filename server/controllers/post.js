import express from 'express';
import mongoose from 'mongoose';

import PostMessage from '../models/post_message.js'

const router = express.Router();

export const getPosts = async (req, res) => {
    try {
        const postMessages = await PostMessage.find();

        res.status(200).json(postMessages);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}


export const getPost = async (req, res) => {
    const { id } = req.params;

    try {
        const post = await PostMessage.findById(id);

        res.status(200).json(post);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createPost = async (req, res) => {
    const post = req.body;
    const newPost = new PostMessage({ ...post, creator: req.userId, createdAt: new Date().toISOString() });
    try {
        await newPost.save();

        res.status(200).json(newPost);
    } catch (error) {
        res.status(409).json({ message: err.message });
    }
}

export const updatePost = async (req, res) => {
    try {
        const { id: _id } = req.params;
        const post = req.body;
        if (!mongoose.Types.ObjectId.isValid(_id)) {
            return res.status(404).send('no post with id');
        }
        const updatedPost = await PostMessage.findByIdAndUpdate(_id, post, { new: true });
        res.json(updatedPost);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}



export const deletePost = async (req, res) => {
    const { id: _id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send(`No post with id: ${_id}`);

    await PostMessage.findByIdAndRemove(_id);

    res.json({ message: "Post deleted successfully." });
}

export const likePost = async (req, res) => {
    const { id: _id } = req.params;

    if (!req.userId) return res.json({ message: "UnAunthenicated" });
    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send(`No post with id: ${_id}`);

    const post = await PostMessage.findById(_id);
    const index = post.likes.findIndex((_id) => _id === String(req.userId));
    if (index === -1) {
        post.likes.push(req.userId);
    } else {
        post.likes = post.likes.filter((_id) => _id !== String(req.userId));
    }

    const updatedPost = await PostMessage.findByIdAndUpdate(_id, post, { new: true });

    res.json(updatedPost);
}

export default router;