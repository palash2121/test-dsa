import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-gray-50 dark:bg-neutral-900">
      <Header />
      <main className="container mx-auto flex-1 p-4">{children}</main>
      <Footer />
    </div>
  );
}
