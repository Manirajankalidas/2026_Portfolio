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
  whyTitle?: string;
  why?: { title: string; body: string }[];
  flow?: {
    label: string;
    note: string;
    steps: { title: string; detail: string }[];
  }[];
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
      {
        title: "Roll calls are slow",
        body: "Calling names from a register takes class or work time away from the actual work.",
      },
      {
        title: "Cards can be misused",
        body: "RFID cards get lost, and one person can punch in for another.",
      },
      {
        title: "Unknown entry goes unnoticed",
        body: "Face recognition can tell a known person from a stranger.",
      },
    ],
    flow: [
      {
        label: "Enrol (one time per person)",
        note: "Builds the dataset and trains the recogniser.",
        steps: [
          {
            title: "Capture",
            detail:
              "About 50 face images per person from the camera, found with a Haar Cascade.",
          },
          {
            title: "Store",
            detail:
              "Images in labelled folders. Name, ID and department in a CSV.",
          },
          {
            title: "Detect",
            detail:
              "OpenCV DNN face detector (Caffe-trained CNN) finds each face.",
          },
          {
            title: "Embed",
            detail: "FaceNet turns each face into a 128-number faceprint.",
          },
          {
            title: "Train",
            detail: "A Support Vector Machine learns to tell people apart.",
          },
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
          {
            title: "Log",
            detail:
              "Name and time go to the subject's CSV, then a daily sheet in Excel.",
          },
        ],
      },
    ],
    stack: [
      {
        layer: "Capture and detection",
        items: ["OpenCV", "Haar Cascade", "OpenCV DNN (Caffe)"],
      },
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
    eyebrow: "Smart board",
    summary:
      "An IR camera and IR pen smart board, for teaching, meetings and play.",
    tone: "light",
    tags: ["Smart board", "Interactive", "Entertainment"],
    image: "/projects/virtual-graffiti.webp",
    imagePosition: "50% 100%",
    tagline: "A smart board that turns an IR pen into a brush.",
    overview: [
      "Virtual Graffiti is an infrared (IR) smart board. An IR camera and an IR sensor follow an IR pen, so you draw on a display or wall from a distance, with no touch screen needed.",
      "The same idea can become a smart board for teaching and meetings, or an entertainment product where anyone can paint a virtual wall.",
    ],
    facts: [
      { label: "Input", value: "IR pen" },
      { label: "Sensing", value: "IR camera and IR sensor" },
      { label: "Use", value: "Smart board or entertainment" },
    ],
    whyTitle: "Where it fits",
    why: [
      {
        title: "Smart board",
        body: "Write and draw on a shared display with an IR pen, for classrooms and meeting rooms.",
      },
      {
        title: "Entertainment",
        body: "A playful product where visitors graffiti a virtual wall, for events and exhibitions.",
      },
      {
        title: "Interactive displays",
        body: "Turn any projected screen into something people can touch, point at and draw on.",
      },
    ],
    youtubeId: "B0BO7cWcv7c",
    // github: "https://github.com/Manirajankalidas/<repo>",
  },
];
