---
title: "Beyond the Numbers: What Model Optimization on the Jetson Taught Me About Edge AI"
date: 2026-09-12
tag: Edge AI
summary: Hands-on notes from optimizing a YOLO vehicle detection model on an NVIDIA Jetson edge device. Comparing PyTorch, ONNX Runtime and TensorRT showed that edge AI is about the whole pipeline, not just model accuracy or inference speed.
image: /blog/model-optimization-jetson-edge-ai.webp
link: https://www.linkedin.com/pulse/beyond-numbers-what-model-optimization-jetson-taught-me-manirajan-k-ethgc/
draft: false
---

Accuracy takes center stage in papers and tutorials, but on a physical NVIDIA Jetson inside an industrial plant it means little if frames drop or the system cannot keep up with real-time video. This article shares hands-on experience optimizing an Ultralytics YOLO vehicle detection pipeline on an NVIDIA edge device.

## What the article covers

- **Three runtimes, one target.** The same model at 640×640 as native PyTorch (.pt), ONNX Runtime (.onnx) and a TensorRT engine (.engine).
- **Optimization decides usability.** PyTorch ran at about 18 FPS, short of the 30 FPS needed for real-time monitoring. TensorRT cut inference latency by 69.3% (46.6 ms to 14.3 ms) and brought the pipeline to about 39 FPS.
- **The hidden bottleneck.** Once inference is fast, preprocessing and postprocessing (letterboxing, color conversion, NMS) take about 11.5 ms, nearly 45% of the frame budget. The whole pipeline has to be treated as one system.
- **Detection stays reliable.** The optimized engine kept sharp localization and high confidence on the test frames.
- **The takeaway.** An AI engineer is more than a model builder: hardware, memory bandwidth, runtime graph optimization and video pipelines all matter.
