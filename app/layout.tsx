import type { Metadata } from 'next';
import './globals.css';
import { CartProvider } from '@/context/CartContext';
import { NavBar } from '@/components/NavBar';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: 'NeonForge | Gaming Gear',
  description: 'Cyberpunk gaming equipment store with neon aesthetics.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="bg-grid" />
        <CartProvider>
          <NavBar />
          <main className="container">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
