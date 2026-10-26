import { Unbounded } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Same heading font and chrome as /blog, so service pages share its look.
const unbounded = Unbounded({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-unbounded",
  display: "swap",
});

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={unbounded.variable}>
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
