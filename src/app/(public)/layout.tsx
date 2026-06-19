import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar cartCount={3} />
      <main>{children}</main>
      <Footer />
    </>
  );
}
