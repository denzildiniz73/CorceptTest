import "./globals.css";
// import Header from "@/components/Header/header";
// import Footer from "@/components/Footer/footer";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://use.typekit.net" />
        <link href="https://fonts.cdnfonts.com/css/pt-sans-pro" rel="stylesheet" />
        <link
          rel="preload"
          href="https://use.typekit.net/fzv0brk.css"
          as="style"
        />
        <link rel="stylesheet" href="https://use.typekit.net/fzv0brk.css" />
      </head>
      <body>
        {/* <Header /> */}
        {children}
        {/* <Footer /> */}
      </body>
    </html>
  );
}