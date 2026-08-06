import { Layout } from "@/components/layout/Layout";
import { mountPage } from "@/lib/mount";
import "@/styles/main.css";

mountPage(
  <Layout title="Seite nicht gefunden">
    <p>Diese Seite befindet sich im Aufbau.</p>
    <p className="pt-4">
      <a href="/" className="rounded-sm text-accent underline underline-offset-4">
        Zurück zur Startseite
      </a>
    </p>
  </Layout>,
);
