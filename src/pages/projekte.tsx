import { Layout } from "@/components/layout/Layout";
import { mountPage } from "@/lib/mount";
import "@/styles/main.css";

mountPage(
  <Layout title="Projekte" activePath="/projekte">
    <p>Diese Seite befindet sich im Aufbau.</p>
  </Layout>,
);
