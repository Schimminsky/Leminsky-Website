import { Layout } from "@/components/layout/Layout";
import { mountPage } from "@/lib/mount";
import "@/styles/main.css";

mountPage(
  <Layout title="Lebenslauf" activePath="/lebenslauf">
    <p>Diese Seite befindet sich im Aufbau.</p>
  </Layout>,
);
