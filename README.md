# imörs: Immersive Music Experience

**imörs** (pronounced *“immerse”*) is a web application designed to provide an immersive audio-reactive visualization of music. Users can upload an MP3 file, and our application uses the **lucidsonicdreams** algorithm along with **NVIDIA’s StyleGAN2** to generate an MP4 video that visually "dances" in sync with the music. Choose from several pretrained models to create entrancing visualizations like maps, drawings, and more.

## What is a GAN (Generative Adversarial Network)?

A GAN is an AI algorithm used for creating realistic imagery. It consists of two parts:
- **Generator**: Creates images that look realistic.
- **Discriminator**: Evaluates the realism of these images.

The interaction between these two helps in producing imagery that is nearly indistinguishable from real-life visuals.

## What is StyleGAN?

**StyleGAN** is a variant of GAN focused on generating high-quality, realistic images with particular attention to style and detail. It features a unique architecture that allows separate control over image attributes at different levels, making it possible to produce diverse and complex images.

## Technical Stack

- **Frontend**: React
- **Backend**: Node.js (with BullMQ, Redis), Express, MongoDB, Firebase
- **GAN**: NVIDIA’s StyleGAN2, lucidsonicdreams
- **Deployment:** AWS

## Setup Instructions (Local Machine)

### Setting up the Frontend
```bash
cd frontend
npm install
npm run start
```
### Setting up the Backend
```bash
cd backend
npm install
npm run start
```

## Requirements

- MongoDB
- Redis
- A very good GPU capable of generating imagery from StyleGAN2
- Python version 3.6 or 3.7
- You might need to add .env files for the frontend and backend

