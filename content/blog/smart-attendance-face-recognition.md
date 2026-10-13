---
title: Smart Attendance System Using Face Recognition Techniques
date: 2023-01-09
tag: Computer Vision
summary: Manual roll calls are slow and RFID cards can be misused. How a face detection, FaceNet embedding and SVM pipeline can mark attendance from a camera, and how it performed on a small dataset.
image: /blog/smart-attendance-face-recognition.webp
link: https://www.linkedin.com/pulse/smart-attendance-system-using-face-recognition-mr-statistician/
draft: false
---

Manual roll calls are slow and RFID cards can be lost or misused. This article describes an attendance system that recognises faces from a camera and marks attendance automatically. It is the write-up behind the [Face Recognition Attendance System](/projects/face-attendance/) project.

## What the article covers

- **The dataset.** About 50 face images per person, captured with Haar Cascade detection, with name, ID and department saved to a CSV.
- **The pipeline.** Face detection with OpenCV's Caffe-trained DNN, FaceNet for 128-number face embeddings, and an SVM classifier to match people.
- **Attendance output.** Recognised people are logged to a CSV per subject, then a daily attendance sheet is saved to Excel.
- **Results.** About 70% accuracy on the project's own small dataset, with frontal faces recognised best.
