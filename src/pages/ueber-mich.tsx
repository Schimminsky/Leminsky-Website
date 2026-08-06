import { Layout } from "@/components/layout/Layout";
import { mountPage } from "@/lib/mount";
import "@/styles/main.css";

mountPage(
  <Layout title="Über mich" activePath="/ueber-mich">
    <p>Diese Seite befindet sich im Aufbau.</p>
  </Layout>,
);
