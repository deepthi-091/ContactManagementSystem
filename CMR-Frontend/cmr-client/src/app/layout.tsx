import "./globals.css";
import Navbar from "@/components/core/Navbar";
import { SnackbarProvider } from "@/components/core/Snackbar";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      
<head>
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet"
        />
      </head>
      <body className="bg-gray-50 text-gray-900">
        <SnackbarProvider>
          <main className="pt-6">{children}</main>
        </SnackbarProvider>
      </body>
    </html>
  );
}