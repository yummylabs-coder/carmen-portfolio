/**
 * Minimal layout for share packet pages.
 * No DashboardShell / sidebar — clean, focused view for recipients.
 */
export default function ShareLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-white">
      {children}
    </div>
  );
}
