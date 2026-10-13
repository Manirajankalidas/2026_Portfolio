---
title: Your Camera Stream Is Not Just a Video. It's a Pipeline.
date: 2026-09-18
tag: Computer Vision
summary: A sine wave in a network graph led me to see that camera feed problems often start long before a frame reaches the model: encoding, compression, transport and decoding all shape what the AI sees.
image: /blog/camera-stream-is-a-pipeline.webp
link: https://www.linkedin.com/pulse/your-camera-stream-just-video-its-pipeline-manirajan-k-4rpac/
draft: false
---

A sine wave in a network graph, seen while streaming a single IP camera, led to a bigger lesson from working with 50+ IP cameras in industrial AI deployments: many camera feed problems start before a frame ever reaches the model.

## What the article covers

- **The sine wave.** Why a 25 FPS camera does not send data at a steady rate.
- **The real pipeline.** Camera, video encoder, compression, packetization, network, depacketization, decoder, frames, then the AI application.
- **Keyframes.** H.264 and H.265 do not send individual JPEGs. Periodic keyframes carry the full image and the frames after them mostly describe changes, which is why bandwidth rises and falls.
- **The glitchy frame.** Pixelation, gray frames and freezing are often blamed on the camera, cable or OpenCV, but the decoder is easy to overlook.
- **A changed mental model.** From Camera → RTSP → Model to the full path of a frame, from encoding all the way to inference.
