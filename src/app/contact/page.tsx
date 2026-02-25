import type { Metadata } from "next";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { ContactPage } from "@/components/contact/ContactPage";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch. Whether you need a product designer, a design sprint, or just want to chat.",
};

export default function ContactRoute() {
  return (
    <DashboardShell>
      <ContactPage />
    </DashboardShell>
  );
}
