



<div align="center">
  <h1>☁️ Drive</h1>
  <strong>Open Source cloud file storage server (Similar To Google Drive)</strong>
</div>

## 🔍 Index

- [Features](#features)
- [Tech stack](#tech-stack)
- [Common installation issues](#common-installation-issues)


<span id="features"></span>

## ⭐️ Features

- Upload Files
- Download Files
- Upload Folders
- Download Folders 
- Photo, Video Viewer and Media Gallery
- JWT (Access and Refresh Tokens)

<span id="tech-stack"></span>

## 👨‍🔬 Tech Stack

- React
- Node.js
- Express
- MongoDB

<span id="running"></span>

> [!IMPORTANT]
> Requirements
> - Node.js (20 Recommended)
> - MongoDB (Unless using a service like Atlas)
> - FFMPEG (Optional, used for video thumbnails)
> - build-essential package (If using linux)

1. Install dependencies

```sh
npm install
```

2. Create Environment Variables

You can find enviroment variable examples under: <br />  
[`backend/config`](backend/config) -> Backend Enviroment Variables  
[`src/config`](src/config) -> Frontend Enviroment Variables

Simply remove the .example from the end of the filename, and fill in the values.  
> Note: In most cases you will only have to change FE enviroment variables for development purposes.

3. Run the build command

```sh
npm run build
```

4. Start the server

```sh
npm run start
```

<span id="common-installation-issues"></span>

#### Possible installation issues

Make issue

```sh
npm error gyp ERR! stack Error: not found: make
```

This is because you do not have the build essentials installed which is required for Linux. You can install them by running the following command:

```sh
sudo apt-get install build-essential
```

Memory issue

```sh
Aborted (core dumped)
```

When running the `npm run build` command it may take more memory than node allows by default. You will get the above error in such a case. To fix this, you can run the following command instead when building:

```sh
NODE_OPTIONS="--max-old-space-size=4096" npm run build
```




