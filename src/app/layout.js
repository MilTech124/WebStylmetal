'use client'
import "./globals.css";
import { Inter } from "next/font/google";
import Header from "../components/Header";
import Footer from "../components/Footer";

import { useEffect } from 'react';


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
  useEffect(() => {
    // Existing GTM script
    const script1 = document.createElement('script');
    script1.innerHTML = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
      new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
      j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
      'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer','GTM-KGJFJH5R');`;
    document.head.appendChild(script1);

    // New gtag script
    const script2 = document.createElement('script');
    script2.src = "https://www.googletagmanager.com/gtag/js?id=G-YR8302C8CX";
    script2.async = true;
    document.head.appendChild(script2);

    const script3 = document.createElement('script');
    script3.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-YR8302C8CX');
    `;
    document.head.appendChild(script3);
  }, []);

  return (
    <html lang="pl">   
      <body className={inter.className}>
      <noscript>
        <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-KGJFJH5R"
        height="0" width="0" style={{ display: "none", visibility: "hidden" }}></iframe>
      </noscript>
      <noscript>
        
      </noscript>
      {/* End Google Tag Manager (noscript) */}
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
