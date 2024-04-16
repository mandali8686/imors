imörs is a web application offering immersive music experience.

imörs (pronounced “immerse”) is a web application for immersive audio-reactive visualizations of music. Users upload an mp3 file of a song, and our website uses the lucidsonicdreams algorithm to create a mp4 file which is a video that changes and “dances” in sync with the music. Users can choose between several pretrained models, generating videos of entrancing maps, drawings, and more.

Instructions:

cd frontend
npm i
npm run start

cd backend
npm i
npm run start

You need mongoDB and redis, as well as a very good GPU capable of generating 
imagery from stylegan2. The generation algorithm has been tested on Python 3.6 and 3.7


