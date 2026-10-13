import type { Metadata } from "next";
import EventsBrowser from "@/components/EventsBrowser";
import { Container, PageHeader } from "@/components/ui";

export const metadata: Metadata = {
  title: "Events",
  description: "Workshops taught, expos exhibited and communities joined by Manirajan.",
};

export default function EventsPage() {
  return (
    <>
      <PageHeader
        title="Every day is a chance to learn"
        intro="Workshops I have taught, expos I have shown work at, and communities I keep learning from."
      />
      <Container className="pb-8">
        <EventsBrowser />
      </Container>
    </>
  );
}
