import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { ContactPage } from "@/components/contact/ContactPage";

export default function ContactRoute() {
  return (
    <DashboardShell>
      <ContactPage />
    </DashboardShell>
  );
}
