"use client";
import { Footer, DarkThemeToggle, Flowbite, Drawer, Sidebar } from "flowbite-react";

export default function Index() {
  return (
    <>
    <div><p>Just Small Website!</p></div>
      <Flowbite><Footer container className="bg-slate-200">
              <div className="w-full text-center">
                <div className="w-full justify-between sm:flex sm:items-center sm:justify-between">
                  <Footer.Brand href="#landing" src="https://vinkevcraft.ddns.net/profile.ico" alt="Vinkev Logo" name="VinKev Craft" />
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
            </Footer></Flowbite>
    </>
    )
}
