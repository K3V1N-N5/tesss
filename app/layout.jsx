import 'bootstrap/dist/css/bootstrap.min.css';
import 'flowbite/dist/flowbite.min.css';
import '@/module/style.css';
import RootApp from "@/module/app.jsx";

export const metadata = {
  title: "AlvinQID Website",
  description: "Small Website",
};

export default function RootLayout({children}) {
  return (
    <html lang="en">
      <body><RootApp>{children}</RootApp></body>
    </html>
  );
}
