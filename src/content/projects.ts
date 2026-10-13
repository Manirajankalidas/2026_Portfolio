// Add a project by adding an entry here. The page /projects/<slug> is created automatically.
export type Project = {
  slug: string;
  title: string;
  eyebrow: string;
  summary: string;
  tone: "light" | "dark";
  tags: string[];
  overview: string[];
  tagline?: string;
  image?: string;
  imagePosition?: string;
  facts?: { label: string; value: string }[];
  why?: { title: string; body: string }[];
  flow?: { label: string; note: string; steps: { title: string; detail: string }[] }[];
  stack?: { layer: string; items: string[] }[];
  results?: string[];
  links?: { label: string; href: string }[];
  youtubeId?: string;
  github?: string;
};

export const projects: Project[] = [
  {
    slug: "face-attendance",
    title: "Face Recognition Attendance System",
    eyebrow: "Computer Vision",
    summary:
      "Real-time face detection and recognition from a live camera feed, logging who was present and when.",
    tone: "light",
    tags: ["Python", "OpenCV", "SVM"],
    image: "/projects/face-attendance.webp",
    tagline: "Walk past a camera. Attendance is marked. No register, no card.",
    overview: [
      "A smart attendance application that recognises people from a live camera feed and records their attendance automatically, so nobody has to sign a sheet.",
    ],
    facts: [
      { label: "Input", value: "Live camera feed" },
      { label: "Core model", value: "FaceNet embeddings + SVM" },
      { label: "Output", value: "Daily attendance in CSV and Excel" },
    ],
    why: [
      { title: "Roll calls are slow", body: "Calling names from a register takes class or work time away from the actual work." },
      { title: "Cards can be misused", body: "RFID cards get lost, and one person can punch in for another." },
      { title: "Unknown entry goes unnoticed", body: "Face recognition can tell a known person from a stranger." },
    ],
    flow: [
      {
        label: "Enrol (one time per person)",
        note: "Builds the dataset and trains the recogniser.",
        steps: [
          { title: "Capture", detail: "About 50 face images per person from the camera, found with a Haar Cascade." },
          { title: "Store", detail: "Images in labelled folders. Name, ID and department in a CSV." },
          { title: "Detect", detail: "OpenCV DNN face detector (Caffe-trained CNN) finds each face." },
          { title: "Embed", detail: "FaceNet turns each face into a 128-number faceprint." },
          { title: "Train", detail: "A Support Vector Machine learns to tell people apart." },
        ],
      },
      {
        label: "Recognise (every day)",
        note: "Runs on the live camera and logs who is present.",
        steps: [
          { title: "Camera", detail: "Live video feed." },
          { title: "Detect", detail: "Find faces in each frame." },
          { title: "Embed", detail: "Compute the faceprint with FaceNet." },
          { title: "Match", detail: "The SVM picks the closest known person." },
          { title: "Log", detail: "Name and time go to the subject's CSV, then a daily sheet in Excel." },
        ],
      },
    ],
    stack: [
      { layer: "Capture and detection", items: ["OpenCV", "Haar Cascade", "OpenCV DNN (Caffe)"] },
      { layer: "Face representation", items: ["FaceNet (128-d embeddings)"] },
      { layer: "Classification", items: ["Support Vector Machine"] },
      { layer: "Data and reports", items: ["Python", "CSV", "Excel"] },
    ],
    results: [
      "About 70% accuracy on the project's own dataset, as reported in the article.",
      "Frontal faces were recognised more accurately than turned ones.",
      "Small dataset and a first version, so treat the figure as a starting point.",
    ],
    links: [
      {
        label: "Read the article on LinkedIn",
        href: "https://www.linkedin.com/pulse/smart-attendance-system-using-face-recognition-mr-statistician/",
      },
    ],
    // github: "https://github.com/Manirajankalidas/<repo>",
  },
  {
    slug: "virtual-graffiti",
    title: "Virtual Graffiti",
    eyebrow: "Interactive",
    summary: "A Wiimote-controlled virtual drawing demo.",
    tone: "light",
    tags: ["Wiimote", "Interactive"],
    image: "/projects/virtual-graffiti.webp",
    imagePosition: "50% 100%",
    tagline: "Draw in virtual space with a Wii Remote as the brush.",
    overview: [
      "A demo of drawing in a virtual space using a Nintendo Wii Remote (Wiimote) as the brush.",
      // Add: what it does, how it works, the tools you used and what you learned.
    ],
    youtubeId: "B0BO7cWcv7c",
    // github: "https://github.com/Manirajankalidas/<repo>",
  },
];
