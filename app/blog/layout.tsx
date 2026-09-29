import { Unbounded } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Unbounded for blog headings (loaded and self-hosted by Next.js, no extra setup)
const unbounded = Unbounded({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-unbounded",
  display: "swap",
});

// Adds your site's Header and Footer to every /blog page.
// Import these the same way app/career/page.tsx does. If it uses
// `import { Header } from ...`, change the two import lines above to match.
export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={unbounded.variable}>
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
