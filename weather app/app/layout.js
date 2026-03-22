import './globals.css';

export const metadata = {
  title: 'Modern Weather Studio',
  description: 'Modern weather forecasting app built with Next.js and Tailwind CSS.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
