import Header from "@/app/components/Header/header";
import "./globals.css";
import Footer from "@/app/components/Footer/footer";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://use.typekit.net" />

        <link
          rel="preload"
          href="https://use.typekit.net/fzv0brk.css"
          as="style"
        />
        <link rel="stylesheet" href="https://use.typekit.net/fzv0brk.css" />
      </head>
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
