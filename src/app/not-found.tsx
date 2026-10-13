import { ButtonLink, Container } from "@/components/ui";

export default function NotFound() {
  return (
    <Container className="py-36 text-center">
      <p className="text-xl font-semibold text-muted">404</p>
      <h1 className="mt-3 text-5xl font-bold tracking-tight">Page not found</h1>
      <p className="mb-9 mt-4 text-xl text-muted">The page you are looking for does not exist.</p>
      <ButtonLink href="/">Back to home</ButtonLink>
    </Container>
  );
}
