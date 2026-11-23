// Each topic is shown as a card. When you write about it, set `href` (for example
// to a blog post) and the "Coming soon" label turns into a link.
// `clip` is a file name (without extension) in public/cv/: <clip>.mp4 plays, <clip>.webp is the poster.
// `appsLabel` replaces the "Suggested applications" heading above the `apps` chips.
//
// Topics with a `slug` get their own detail page at /expertise/<area>/<slug> and their band
// on the area page becomes one big link. Photo credits live in src/content/photo-credits.ts.
export type Hardware = {
  name: string;
  detail?: string; // e.g. the carrier board
  image?: string; // path in public/; without one a neutral placeholder tile shows
  note?: string; // shown under the photo, e.g. "Developer Kit shown for reference"
};
export type Topic = {
  name: string;
  tagline?: string;
  summary?: string;
  apps?: string[];
  appsLabel?: string;
  href?: string;
  clip?: string;
  // Detail page fields (all optional; empty sections are left out)
  slug?: string;
  image?: string; // picture in the band when there is no clip
  hardware?: Hardware[];
  technologies?: string[];
  experience?: string[]; // the owner's own words only
  projects?: string[]; // project slugs from src/content/projects.ts
};
export type Area = {
  slug: string;
  title: string;
  summary: string;
  topics: Topic[];
  banner?: string;
  tagline?: string; // shown under the title in the area page header
  intro?: string; // paragraph in the area page header
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
    tagline: "Bridging intelligent computing with real-world hardware.",
    summary:
      "NVIDIA Jetson, Raspberry Pi, microcontrollers, cameras, sensors and embedded communication.",
    intro:
      "Building and integrating intelligent edge computing systems using NVIDIA Jetson platforms, Raspberry Pi, microcontrollers, industrial cameras, sensors and embedded communication technologies. From hardware integration to real-time AI deployment, I work across the complete edge computing ecosystem.",
    topics: [
      {
        slug: "jetson",
        name: "NVIDIA Jetson Platforms",
        tagline: "GPU-accelerated AI at the edge.",
        summary:
          "Deploying computer vision and deep learning applications on NVIDIA Jetson platforms with GPU acceleration, optimised inference and real-time edge AI capabilities.",
        image: "/edge-ai/jetson-agx-orin.webp",
        appsLabel: "Hardware",
        hardware: [
          {
            name: "Jetson AGX Orin",
            detail: "RTSO 2002 carrier board",
            image: "/edge-ai/jetson-agx-orin.webp",
            note: "Jetson AGX Orin Developer Kit shown for reference.",
          },
          {
            name: "Jetson AGX Orin",
            detail: "RTSO 1002 carrier board",
            image: "/edge-ai/jetson-agx-orin.webp",
            note: "Jetson AGX Orin Developer Kit shown for reference.",
          },
          {
            name: "Jetson Orin NX",
            detail: "D131 carrier board",
            image: "/edge-ai/jetson-orin-nx.webp",
            note: "Orin NX module on a different carrier board shown for reference.",
          },
          {
            name: "Jetson Nano",
            detail: "Developer Kit",
            image: "/edge-ai/jetson-nano.webp",
          },
          { name: "Jetson Orin Nano" },
        ],
        technologies: [
          "NVIDIA JetPack",
          "CUDA",
          "TensorRT",
          "DeepStream",
          "ONNX",
          "Docker",
          "Linux",
        ],
        experience: [
          "Industrial edge deployments on NVIDIA Jetson devices, optimising real-time inference on Linux edge environments.",
        ],
      },
      {
        slug: "raspberry-pi",
        name: "Raspberry Pi",
        tagline: "Compact computers for connected devices.",
        summary:
          "Developing embedded applications using Raspberry Pi platforms, integrating cameras, sensors and external hardware for monitoring and automation.",
        image: "/edge-ai/raspberry-pi-4b.webp",
        appsLabel: "Hardware",
        hardware: [
          { name: "Raspberry Pi 4B", image: "/edge-ai/raspberry-pi-4b.webp" },
          { name: "Raspberry Pi 3B", image: "/edge-ai/raspberry-pi-3b.webp" },
        ],
      },
      {
        slug: "microcontrollers",
        name: "Microcontrollers",
        tagline: "Small boards. Direct control of hardware.",
        summary:
          "Developing microcontroller-based applications for sensor integration, hardware interfacing, data acquisition and IoT automation.",
        image: "/edge-ai/arduino-uno.webp",
        appsLabel: "Hardware",
        hardware: [
          { name: "Arduino Nano", image: "/edge-ai/arduino-nano.webp" },
          { name: "Arduino Uno", image: "/edge-ai/arduino-uno.webp" },
          {
            name: "ESP8266",
            detail: "NodeMCU board",
            image: "/edge-ai/esp8266.webp",
          },
          {
            name: "ESP32",
            detail: "ESP-WROOM-32 module",
            image: "/edge-ai/esp32.webp",
          },
        ],
      },
      {
        slug: "cameras",
        name: "Camera Technologies",
        tagline: "The eyes of every vision system.",
        summary:
          "Integrating industrial and embedded camera systems for computer vision, high-speed image acquisition, real-time video streaming and edge AI applications.",
        image: "/edge-ai/industrial-camera.webp",
        appsLabel: "Hardware",
        hardware: [
          {
            name: "Industrial high-speed cameras",
            image: "/edge-ai/industrial-camera.webp",
          },
          { name: "IP cameras", image: "/edge-ai/ip-camera.webp" },
          { name: "USB webcams", image: "/edge-ai/usb-webcam.webp" },
          { name: "Raspberry Pi cameras", image: "/edge-ai/pi-camera.webp" },
        ],
        experience: [
          "Architected computer vision systems handling 50+ camera streams, using RTSP streaming and custom vision pipelines.",
        ],
        projects: ["face-attendance", "virtual-graffiti"],
      },
      {
        slug: "networking",
        name: "Networking & Connectivity",
        tagline: "Reliable links for cameras and edge devices.",
        summary:
          "Setting up networking infrastructure for camera connectivity, edge devices, video streaming and distributed IoT systems.",
        image: "/edge-ai/poe-switch-8.webp",
        appsLabel: "Hardware",
        hardware: [
          { name: "4-port PoE switch" },
          { name: "8-port PoE switch", image: "/edge-ai/poe-switch-8.webp" },
          { name: "TP-Link Archer C6 router" },
        ],
        experience: [
          "Industrial networking and RTSP streaming for camera systems across 10+ plant environments.",
        ],
      },
      {
        slug: "sensors",
        name: "Sensors & Data Acquisition",
        tagline: "Measure the physical world in real time.",
        summary:
          "Integrating sensors with embedded platforms for environmental monitoring, proximity detection, motion sensing and real-time data acquisition.",
        image: "/edge-ai/ultrasonic.webp",
        appsLabel: "Sensors",
        hardware: [
          { name: "Proximity sensors", image: "/edge-ai/proximity.webp" },
          { name: "Gas sensors" },
          { name: "RFID sensors", image: "/edge-ai/rfid.webp" },
          {
            name: "Gyroscope and accelerometer",
            detail: "MPU-6050 module shown",
            image: "/edge-ai/imu.webp",
          },
          { name: "Air quality sensors", image: "/edge-ai/air-quality.webp" },
          { name: "Ultrasonic sensors", image: "/edge-ai/ultrasonic.webp" },
          { name: "Light sensors", image: "/edge-ai/light.webp" },
          { name: "Infrared sensors" },
        ],
        projects: ["virtual-graffiti"],
      },
      {
        slug: "protocols",
        name: "Communication Protocols",
        tagline: "How devices talk to each other.",
        summary:
          "Connecting embedded devices, sensors and controllers through communication interfaces and protocols for reliable hardware integration and data exchange.",
        image: "/edge-ai/can-bus.webp",
        appsLabel: "Protocols",
        hardware: [
          {
            name: "UART / Serial",
            detail: "USB to serial cable shown",
            image: "/edge-ai/uart.webp",
          },
          { name: "I²C" },
          {
            name: "Bluetooth",
            detail: "HC-05 module with Arduino shown",
            image: "/edge-ai/bluetooth.webp",
          },
          {
            name: "CAN Bus",
            detail: "CAN-BUS shield shown",
            image: "/edge-ai/can-bus.webp",
          },
        ],
      },
      {
        slug: "test-measurement",
        name: "Test & Measurement",
        tagline: "Validate hardware with real signals.",
        summary:
          "Working with programmable test and measurement instrumentation for signal analysis, hardware validation and engineering experiments.",
        image: "/edge-ai/signal-analysis.webp",
        appsLabel: "Equipment",
        hardware: [{ name: "Moku:Go", detail: "by Liquid Instruments" }],
      },
    ],
  },
];
