// Each topic is shown as a card. When you write about it, set `href` (for example
// to a blog post) and the "Coming soon" label turns into a link.
// `clip` is a file name (without extension) in public/cv/: <clip>.mp4 plays, <clip>.webp is the poster.
// `appsLabel` replaces the "Suggested applications" heading above the `apps` chips.
// `image` is a picture (path in public/) shown in the band when there is no clip; its credit,
// if it needs one, lives in src/content/photo-credits.ts.
export type Topic = {
  name: string;
  tagline?: string;
  summary?: string;
  apps?: string[];
  appsLabel?: string;
  href?: string;
  clip?: string;
  image?: string;
  cutout?: boolean; // `image` has a transparent background: show it without the rounded frame
};
export type Area = {
  slug: string;
  title: string;
  summary: string;
  topics: Topic[];
  banner?: string;
  // Picture shown on the Home and Expertise pages: a clip in public/cv/, or an image path. `wide` = keep the whole picture.
  media?: { clip?: string; image?: string; wide?: boolean };
};

export const areas: Area[] = [
  {
    slug: "computer-vision",
    media: { clip: "detection" },
    title: "Computer Vision",
    summary:
      "Detection, classification, segmentation, pose estimation and image processing.",
    banner: "/cv/banner.webp",
    topics: [
      {
        name: "Detection",
        tagline: "Find objects. Understand what's happening.",
        summary:
          "Detect and locate objects in images and video using bounding boxes and confidence scores. From identifying people and PPE to monitoring products on production lines, detection turns camera feeds into actionable information.",
        apps: [
          "Object detection",
          "PPE monitoring",
          "People counting",
          "Defect detection",
        ],
        clip: "detection",
      },
      {
        name: "Classification",
        tagline: "Turn visual data into meaningful labels.",
        summary:
          "Classify images into predefined categories using deep learning models. This helps identify product types, categorize defects, recognize visual patterns, and distinguish between acceptable and unacceptable conditions.",
        apps: [
          "Image classification",
          "Quality inspection",
          "Defect categorization",
          "Visual recognition",
        ],
        clip: "classification",
      },
      {
        name: "Segmentation",
        tagline: "Understand images at the pixel level.",
        summary:
          "Separate objects and regions with pixel-level precision to understand their exact shapes and boundaries. Segmentation supports applications where object outlines, surface regions, or spatial detail matter more than a bounding box alone.",
        apps: [
          "Instance segmentation",
          "Semantic segmentation",
          "Surface inspection",
          "Region analysis",
        ],
        clip: "segmentation",
      },
      {
        name: "Pose estimation",
        tagline: "Understand posture, movement, and body position.",
        summary:
          "Identify key points on the human body and track their spatial relationships to estimate posture and movement. This can support ergonomic assessments, activity recognition, and workplace safety monitoring when combined with suitable detection and tracking logic.",
        apps: [
          "Keypoint detection",
          "Movement analysis",
          "Ergonomics",
          "Activity recognition",
        ],
        clip: "pose",
      },
      {
        name: "Image processing",
        tagline: "Prepare images for reliable analysis.",
        summary:
          "Enhance, filter, transform, and extract useful information from images before or after model inference. Classical computer vision techniques remain valuable for reducing noise, detecting edges, improving image quality, and building efficient inspection pipelines.",
        apps: [
          "OpenCV",
          "Edge detection",
          "Image enhancement",
          "Filtering",
          "Contour analysis",
        ],
        clip: "image-processing",
      },
      {
        name: "Model Optimisation & Deployment",
        tagline: "Faster Inference. Smarter Deployment.",
        summary:
          "Optimising deep learning models for high-performance inference and real-world deployment. Converting trained models into ONNX and NVIDIA TensorRT engine formats, applying FP32, FP16 and INT8 precision optimisation, and benchmarking performance across GPU and edge devices.",
        appsLabel: "Key technologies",
        apps: [
          "ONNX",
          "NVIDIA TensorRT",
          "FP32 / FP16 / INT8",
          "PyTorch",
          "Ultralytics YOLO",
          "CUDA",
          "NVIDIA Jetson",
        ],
        clip: "optimisation",
      },
    ],
  },
  {
    slug: "data-science",
    media: { image: "/home/data-science.webp", wide: true },
    title: "Data Science",
    summary: "EDA, pre-processing, cleaning and modelling.",
    topics: [
      { name: "EDA" },
      { name: "Pre-processing" },
      { name: "Data cleaning" },
      { name: "Modelling" },
    ],
  },
  {
    // Was "IoT" at /expertise/iot (redirected in vercel.json).
    slug: "edge-ai-embedded-systems",
    media: { image: "/edge-ai/jetson-agx-orin.webp" },
    banner: "/edge-ai/banner.webp",
    title: "Edge AI & Embedded Systems",
    summary:
      "NVIDIA Jetson, Raspberry Pi, microcontrollers, cameras, sensors and embedded communication.",
    topics: [
      {
        name: "NVIDIA Jetson Platforms",
        tagline: "GPU-accelerated AI at the edge.",
        summary:
          "Deploying computer vision and deep learning applications on NVIDIA Jetson platforms with GPU acceleration, optimised inference and real-time edge AI capabilities.",
        image: "/edge-ai/jetson-orin-nano.webp",
        cutout: true,
        appsLabel: "Hardware",
        apps: [
          "Jetson AGX Orin + RTSO 2002 carrier",
          "Jetson AGX Orin + RTSO 1002 carrier",
          "Jetson Orin NX + D131 carrier",
          "Jetson Nano",
          "Jetson Orin Nano",
        ],
      },
      {
        name: "Raspberry Pi",
        tagline: "Compact computers for connected devices.",
        summary:
          "Developing embedded applications using Raspberry Pi platforms, integrating cameras, sensors and external hardware for monitoring and automation.",
        image: "/edge-ai/raspberry-pi.webp",
        cutout: true,
        appsLabel: "Hardware",
        apps: [
          "Raspberry Pi 4B",
          "Raspberry Pi 3B",
        ],
      },
      {
        name: "Microcontrollers",
        tagline: "Small boards. Direct control of hardware.",
        summary:
          "Developing microcontroller-based applications for sensor integration, hardware interfacing, data acquisition and IoT automation.",
        image: "/edge-ai/esp32.webp",
        cutout: true,
        appsLabel: "Hardware",
        apps: [
          "Arduino Nano",
          "Arduino Uno",
          "ESP8266",
          "ESP32",
        ],
      },
      {
        name: "Camera Technologies",
        tagline: "The eyes of every vision system.",
        summary:
          "Integrating industrial and embedded camera systems for computer vision, high-speed image acquisition, real-time video streaming and edge AI applications.",
        image: "/edge-ai/camera.webp",
        cutout: true,
        appsLabel: "Hardware",
        apps: [
          "Industrial high-speed cameras",
          "IP cameras",
          "USB webcams",
          "Raspberry Pi cameras",
        ],
      },
      {
        name: "Networking & Connectivity",
        tagline: "Reliable links for cameras and edge devices.",
        summary:
          "Setting up networking infrastructure for camera connectivity, edge devices, video streaming and distributed IoT systems.",
        image: "/edge-ai/switch.webp",
        cutout: true,
        appsLabel: "Hardware",
        apps: [
          "4-port PoE switch",
          "8-port PoE switch",
          "TP-Link Archer C6 router",
        ],
      },
      {
        name: "Sensors & Data Acquisition",
        tagline: "Measure the physical world in real time.",
        summary:
          "Integrating sensors with embedded platforms for environmental monitoring, proximity detection, motion sensing and real-time data acquisition.",
        image: "/edge-ai/sensor.webp",
        cutout: true,
        appsLabel: "Sensors",
        apps: [
          "Proximity sensors",
          "Gas sensors",
          "RFID sensors",
          "Gyroscope and accelerometer",
          "Air quality sensors",
          "Ultrasonic sensors",
          "Light sensors",
          "Infrared sensors",
        ],
      },
      {
        name: "Communication Protocols",
        tagline: "How devices talk to each other.",
        summary:
          "Connecting embedded devices, sensors and controllers through communication interfaces and protocols for reliable hardware integration and data exchange.",
        image: "/edge-ai/uart.webp",
        cutout: true,
        appsLabel: "Protocols",
        apps: [
          "UART / Serial",
          "I²C",
          "Bluetooth",
          "CAN Bus",
        ],
      },
      {
        name: "Test & Measurement",
        tagline: "Validate hardware with real signals.",
        summary:
          "Working with programmable test and measurement instrumentation for signal analysis, hardware validation and engineering experiments.",
        image: "/edge-ai/moku-go.webp",
        appsLabel: "Equipment",
        apps: [
          "Moku:Go by Liquid Instruments",
        ],
      },
    ],
  },
];
