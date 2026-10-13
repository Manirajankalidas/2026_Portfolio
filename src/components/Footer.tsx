import { site } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="bg-alt px-6 py-8 text-center text-[13px] text-muted">
      <p>
        {site.name} · {site.title}
      </p>
      <p className="mt-2 flex flex-wrap justify-center gap-x-5 gap-y-1">
        <a href={site.links.github} className="hover:underline">GitHub</a>
        <a href={site.links.linkedin} className="hover:underline">LinkedIn</a>
        <a href={`mailto:${site.email}`} className="hover:underline">Email</a>
      </p>
      <p className="mt-2">© {new Date().getFullYear()} {site.name}</p>
    </footer>
  );
}
