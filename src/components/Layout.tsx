import React from "react";
import Header from "@/components/Header";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="bg-background text-lightGray min-h-screen">
      <Header />
      <main className="max-w-screen-xl mx-auto p-4">{children}</main>
    </div>
  );
};

export default Layout;
