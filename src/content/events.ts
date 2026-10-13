// Add an event by adding an entry here (newest year first is not required; they are sorted).
export type EventType = "teaching" | "speaking" | "exhibited" | "attended";

export type EventItem = {
  title: string;
  year: number;
  place: string;
  type: EventType;
  summary: string;
  image: string;
  link?: string;
};

export const eventTypeLabel: Record<EventType, string> = {
  teaching: "Teaching",
  speaking: "Speaking",
  exhibited: "Exhibited",
  attended: "Attended",
};

export const events: EventItem[] = [
  {
    title: "DevFest Chennai 2025 by GDG Chennai",
    year: 2025,
    place: "Chennai",
    type: "attended",
    summary:
      "Sessions on XR, MCP, VLMs and cloud, plus a hands-on workshop on deploying secure MCP servers on Google Cloud Run.",
    image: "/events/devfest-chennai-2025.webp",
    link: "https://www.linkedin.com/posts/Manirajan-k_devfestchennai2025-gdgchennai-devfestchennai2025-ugcPost-7393631853519278080-GFDf",
  },
  {
    title: "TNGSS 2025",
    year: 2025,
    place: "Coimbatore",
    type: "exhibited",
    summary: "Startups, young entrepreneurs and the growing impact of AI in India.",
    image: "/events/tngss-cbe-2025.webp",
    link: "https://www.linkedin.com/posts/Manirajan-k_tngss2025-startupecosystem-digitaltransformation-activity-7383491119554158592-jduI",
  },
  {
    title: "Zyclothon 2025 by Zoho",
    year: 2025,
    place: "Chennai",
    type: "attended",
    summary: "A well-organised hackathon, joined with friends.",
    image: "/events/zoho-cython-2025.webp",
    link: "https://www.linkedin.com/posts/Manirajan-k_zyclothon2025-zoho-activity-7365725625036279808-T06Z",
  },
  {
    title: "Smart Bharat Expo",
    year: 2024,
    place: "Bangalore",
    type: "speaking",
    summary: "Shared insights on smart technology adoption in India.",
    image: "/events/smartbharat-2024.webp",
    link: "https://www.linkedin.com/posts/Manirajan-k_smartbharat-indiaelectronicsweek-iew-activity-7160255182298058752-CQ-B",
  },
  {
    title: "Atlassian GenAI",
    year: 2024,
    place: "Coimbatore",
    type: "attended",
    summary: "GenAI, LLMs, RAG and AI-driven business solutions from industry experts.",
    image: "/events/atlassian-event.webp",
    link: "https://www.linkedin.com/posts/Manirajan-k_cbe-gen-ai-event-activity-7213375285017161728-kiIS",
  },
  {
    title: "Hands-on IoT workshop",
    year: 2023,
    place: "Bangalore",
    type: "teaching",
    summary: "Sensor integration, data collection and real-world projects for engineering students.",
    image: "/events/bng-ftp-mani-speak.webp",
    link: "https://www.linkedin.com/in/Manirajan-k/",
  },
  {
    title: "Student Development Program",
    year: 2023,
    place: "Hubballi",
    type: "teaching",
    summary: "Workshops and training on emerging technologies to build student skills.",
    image: "/events/hubbli-engineering-clg-iot.webp",
    link: "https://www.linkedin.com/in/Manirajan-k/",
  },
  {
    title: "Python Bootcamp, Least Squares",
    year: 2023,
    place: "Online",
    type: "teaching",
    summary: "Python basics and industrial applications for the Least Squares community.",
    image: "/events/ls-python-bootcamp.webp",
  },
  {
    title: "Electronica India",
    year: 2023,
    place: "Bangalore",
    type: "exhibited",
    summary: "Represented Mew Technology with electronics and IoT solutions.",
    image: "/events/electronica-india-2023-2.webp",
    link: "https://www.linkedin.com/posts/Manirajan-k_electronicaindia2023-lasercuttingmachine-activity-7108036713612013568-Kbia",
  },
  {
    title: "IISc Roadshow",
    year: 2023,
    place: "Bangalore",
    type: "exhibited",
    summary: "Presented research and development projects at the IISc Bangalore roadshow.",
    image: "/events/iisc-roadshow-2023.webp",
    link: "https://www.linkedin.com/posts/mew-technology_mew-technology-global-roadshow-2023-iisc-ugcPost-7108752322196885504-_ENc",
  },
  {
    title: "Keras Community Day",
    year: 2023,
    place: "Bangalore",
    type: "attended",
    summary: "Generative AI, LLMs and GANs with TFUG Bangalore.",
    image: "/events/keras-event.webp",
    link: "https://www.linkedin.com/posts/Manirajan-k_kerascommunityday2023-ai-generativeai-activity-7111756992737660928-r5-R",
  },
  {
    title: "GDG DevFest Salem",
    year: 2022,
    place: "Salem",
    type: "attended",
    summary: "Learning from many speakers and technologies as a student.",
    image: "/events/dev-2022.webp",
    link: "https://www.linkedin.com/posts/Manirajan-k_devfest2022-gdgsalem-google-activity-6995049387076784128-7HL1",
  },
];
