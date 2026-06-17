import Link from "next/link";
import { defaultLocale } from "@/lib/i18n";

/**
 * Root not-found. Kept minimal and self-contained (it can render outside the
 * locale layout), routing visitors back to the default-locale home.
 */
export default function NotFound() {
  return (
    <html lang="it">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#F8FAFB",
          color: "#111827",
          fontFamily: "Inter, system-ui, sans-serif",
        }}
      >
        <main style={{ textAlign: "center", padding: "2rem" }}>
          <p
            style={{
              fontSize: "0.75rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#4FB3BF",
            }}
          >
            404
          </p>
          <h1 style={{ fontSize: "1.75rem", margin: "0.75rem 0 1.5rem" }}>
            Pagina non trovata
          </h1>
          <Link
            href={`/${defaultLocale}`}
            style={{
              display: "inline-block",
              borderRadius: "999px",
              background: "#0F4C5C",
              color: "#F8FAFB",
              padding: "0.6rem 1.6rem",
              textDecoration: "none",
              fontSize: "0.9rem",
            }}
          >
            Torna alla home
          </Link>
        </main>
      </body>
    </html>
  );
}
