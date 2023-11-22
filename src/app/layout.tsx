import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "./providers/auth";
import { Footer } from "@/components/ui/footer";
import { Toaster } from "@/components/ui/toaster";
import { UserProvider } from "./providers/user";
import { SocketProvider } from "./providers/socket";
import { Header } from "@/components/ui/header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Waves Sustentabilidade",
  description: "Waves Sustentabilidade is the most popular.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className="scroll-smooth">
      <body className={inter.className}>
        <div className="flex h-full flex-col">
          <AuthProvider>
            <UserProvider>
              <SocketProvider>
                <Header />
                <div className="flex-1">{children}</div>
                <Toaster />
                <Footer />
              </SocketProvider>
            </UserProvider>
          </AuthProvider>
        </div>
      </body>
    </html>
  );
}
