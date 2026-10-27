import { Unbounded } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Same heading font and chrome as /blog and /services.
const unbounded = Unbounded({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-unbounded",
  display: "swap",
});

export default function CaseStudiesLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={unbounded.variable}>
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
