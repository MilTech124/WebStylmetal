import "./globals.css";
import { Inter } from "next/font/google";
import Header from "../components/Header";
import Footer from "../components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Stylmetal - producent garaży",
  description: "Stylmetal to firma produkująca garaże na zamówienie. Oferujemy szeroki wybór garaży, od klasycznych po nowoczesne. Nasze garaże są wykonane z najwyższej jakości materiałów i objęte gwarancją.",
  keywords: "garaże, garaże na zamówienie, garaże metalowe, garaże blaszane, garaże drewniane, garaże murowane",
  robots: "index, follow",
  author: "Jarosław Matusiak",
  viewport: "width=device-width, initial-scale=1",
  favicon: "favicon.ico",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pl">   
      <body className={inter.className}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
