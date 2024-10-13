import 'bootstrap/dist/css/bootstrap.min.css';
import 'flowbite/dist/flowbite.min.css';
import '@/module/style.css';

export const metadata = {
  title: "AlvinQID Website",
  description: "Small Website",
};

export default function RootLayout({children}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
