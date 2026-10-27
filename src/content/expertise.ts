// Each topic is shown as a card. When you write about it, set `href` (for example
// to a blog post) and the "Coming soon" label turns into a link.
// `clip` is a file name (without extension) in public/cv/: <clip>.mp4 plays, <clip>.webp is the poster.
export type Topic = {
  name: string;
  tagline?: string;
  summary?: string;
  apps?: string[];
  href?: string;
  clip?: string;
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
    slug: "iot",
    media: { image: "/home/iot.webp" },
    title: "IoT",
    summary: "Jetson, Raspberry Pi, Arduino, ESP and components.",
    topics: [
      { name: "Jetson" },
      { name: "Raspberry Pi" },
      { name: "Arduino and ESP" },
      { name: "Components" },
    ],
  },
];
