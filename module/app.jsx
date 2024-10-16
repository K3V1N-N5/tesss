"use client";
import vinkev from './assets/vinkev_1.png'; // Ganti dengan path gambar logo yang benar
import { Footer, DarkThemeToggle, Flowbite, Drawer, Sidebar } from "flowbite-react";
import { useState, useEffect, Suspense } from 'react';
import { HiMenu, HiX, HiOutlineCollection, HiOutlineExternalLink, HiInformationCircle } from "react-icons/hi";
import Loading from './utils/Loading'; // Import komponen Loading
import { useTheme } from './ThemeContext'; // Import context tema
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";

function RootApp() {
  const dataSession = useSession();
  const [isOpen, setIsOpen] = useState(false); // Untuk Drawer (Sidebar)
  const [loading, setLoading] = useState(true); // Untuk memantau loading halaman
  const { isDarkMode, setIsDarkMode } = useTheme(); // Menggunakan tema dari context

  // Menyimpan dan membaca state tema dari localStorage
  useEffect(() => {
    // Cek localStorage untuk tema
    const savedTheme = localStorage.getItem('isDarkMode');
    if (savedTheme !== null) {
      setIsDarkMode(savedTheme === 'true'); // Terapkan tema yang disimpan
    } else {
      // Jika tidak ada tema yang disimpan, set default ke dark mode
      setIsDarkMode(true);
      localStorage.setItem('isDarkMode', 'true'); // Simpan tema default ke localStorage
    }
  }, [setIsDarkMode]);

  // Mengatur loading screen saat aplikasi pertama kali di-refresh
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false); // Setelah beberapa detik, set loading ke false
    }, 1000); // Set waktu loading selama 1 detik (sesuaikan sesuai kebutuhan)
    
    return () => clearTimeout(timer); // Bersihkan timer saat komponen unmount
  }, []);

  const toggleDrawer = () => {
    setIsOpen(!isOpen); // Toggle untuk membuka/tutup Drawer (Sidebar)
  };

  const closeDrawer = () => {
    setIsOpen(false); // Menutup Drawer ketika dibutuhkan
  };

  // Function untuk perpindahan halaman
  const handleLinkClick = () => {
    if (isOpen) {
      closeDrawer(); // Menutup Drawer ketika klik pada salah satu link
    }
    setLoading(true); // Set loading ke true saat pindah halaman
    setTimeout(() => setLoading(false), 1000); // Reset loading setelah 1 detik
  };

  if (loading) {
    // Jika dalam state loading, tampilkan komponen loading
    return <Loading />;
  }

  return (
    <>
      <Flowbite>
        <Suspense fallback={<Loading />}> {/* Lazy loading dengan fallback ke Loading */}
          <div
            className={`overflow-x-hidden pt-16 ${
              isDarkMode ? 'dark bg-[#1e1e1e]' : 'bg-white'
            }`}  // Terapkan class dark dan warna background di div utama
            style={{ visibility: loading ? 'hidden' : 'visible' }}
          >
            <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700 h-16">
              <div className="px-4 py-3 lg:px-5 lg:pl-3">
                <div className="flex items-center justify-between">
                  {/* Bagian Kiri: Icon untuk toggle sidebar + logo */}
                  <div className="flex items-center">
                    <div
                      onClick={toggleDrawer}
                      className="p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md cursor-pointer"
                      style={{ width: '40px', height: '40px' }}
                    >
                      <span className="sr-only">Toggle sidebar</span>
                      {isOpen ? (
                        <HiX className="w-6 h-6" aria-hidden="true" /> // Icon ketika drawer dibuka
                      ) : (
                        <HiMenu className="w-6 h-6" aria-hidden="true" /> // Icon ketika drawer ditutup
                      )}
                    </div>

                    <Link href="/" className="flex items-center space-x-2 ms-3 md:ms-5" onClick={handleLinkClick}>
                      <img src={vinkev} className="h-8" alt="VinKev Logo" /> {/* Logo */}
                      <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap text-gray-800 dark:text-white">
                        VinKev Craft
                      </span>
                      <button onClick={() => signIn("google")}>Login With Google</button>
    <button onClick={() => console.log(dataSession)}>Logs The Session</button>
                    </Link>
                  </div>

                  {/* Bagian Kanan: Toggle untuk Dark Mode */}
                  <div className="flex items-center space-x-3">
                    <DarkThemeToggle
                      onClick={() => {
                        setIsDarkMode(prev => !prev); // Mengubah tema
                        localStorage.setItem('isDarkMode', !isDarkMode); // Simpan preferensi tema ke localStorage
                      }}
                      className="text-sm rounded-full focus:ring-4 dark:text-white transition-none motion-reduce:transition-none"
                    />
                  </div>
                </div>
              </div>
            </nav>

            {/* Drawer (Sidebar) */}
            <Drawer open={isOpen} onClose={closeDrawer} className="mt-14 w-72">
              <Drawer.Items>
                <Sidebar aria-label="Sidebar" className="[&>div]:bg-transparent [&>div]:p-0">
                  <div className="flex h-full flex-col justify-between py-2">
                    <div>
                      <Sidebar.Items>
                        <Sidebar.ItemGroup>
                          <Sidebar.Collapse icon={HiOutlineCollection} label="Minecraft">
                            <Link href="/list" onClick={handleLinkClick}><Sidebar.Item>List</Sidebar.Item></Link>
                            <Link href="/post/knz-ui" onClick={handleLinkClick}><Sidebar.Item>KNZ UI</Sidebar.Item></Link>
                          </Sidebar.Collapse>
                          <Link href="/link" onClick={handleLinkClick}>
                            <Sidebar.Item icon={HiOutlineExternalLink}>LinkTree</Sidebar.Item>
                          </Link>
                        </Sidebar.ItemGroup>
                        <Sidebar.ItemGroup>
                          <Sidebar.Item href="https://wa.me/" icon={HiInformationCircle} onClick={handleLinkClick}>
                            Help
                          </Sidebar.Item>
                        </Sidebar.ItemGroup>
                      </Sidebar.Items>
                    </div>
                  </div>
                </Sidebar>
              </Drawer.Items>
            </Drawer>

            {/* Footer */}
            <Footer container className="bg-slate-200">
              <div className="w-full text-center">
                <div className="w-full justify-between sm:flex sm:items-center sm:justify-between">
                  <Footer.Brand href="#landing" src={vinkev} alt="Vinkev Logo" name="VinKev Craft" />
                  <Footer.LinkGroup>
                    <Footer.Link href="https://discord.com/invite/tMbjtxKfck">Discord</Footer.Link>
                    <Footer.Link href="https://whatsapp.com/channel/0029Vag7qpzHbFV0TyWAVp2z">WhatsApp</Footer.Link>
                    <Footer.Link href="https://www.tiktok.com/@vinkevcraft">Tiktok</Footer.Link>
                    <Footer.Link href="https://www.youtube.com/@vinkevcraft">Youtube</Footer.Link>
                  </Footer.LinkGroup>
                </div>
                <Footer.Divider />
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  <Footer.Copyright href="#" by="VinKev Craft. All rights reserved." year={2024} />
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                  This site is not affiliated with Mojang Studios.
                </p>
              </div>
            </Footer>
          </div>
        </Suspense>
      </Flowbite>
    </>
  );
}

export default RootApp;
