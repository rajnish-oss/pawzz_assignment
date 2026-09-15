"use client";

import SideNav from "./SideNav";
import BottomNav from "./BottomNav";
import TopBar from "./TopBar";

export default function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-paper">
      <div className="mx-auto flex max-w-[1400px]">
        <SideNav />
        <div className="flex min-h-screen w-full flex-col md:pl-[220px]">
          <TopBar />
          <main className="flex-1 pb-24 md:pb-10">{children}</main>
        </div>
      </div>
      <BottomNav />
    </div>
  );
}
