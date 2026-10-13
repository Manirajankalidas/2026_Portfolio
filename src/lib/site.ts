// Edit this file to change your name, contact details, links and navigation.
export const site = {
  name: "Manirajan",
  title: "AI Engineer, Computer Vision | Data Scientist",
  description:
    "Portfolio of Manirajan, an AI engineer working in computer vision and data science.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  email: "Manirajankalidas@gmail.com",
  links: {
    linkedin: "https://www.linkedin.com/in/Manirajan-k/",
    github: "https://github.com/Manirajankalidas",
  },
  // Put your resume in /public (without a phone number) and set e.g. "/resume.pdf".
  // While empty, the "Resume" buttons are hidden.
  resume: "",
  // Contact form key (https://web3forms.com). Empty = form opens the email app.
  web3formsKey: process.env.NEXT_PUBLIC_WEB3FORMS_KEY ?? "",
  nav: [
    { label: "Projects", href: "/projects" },
    { label: "Expertise", href: "/expertise" },
    { label: "Blog", href: "/blog" },
    { label: "Events", href: "/events" },
    { label: "About", href: "/about" },
  ],
} as const;
