import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

import React from 'react'

const Layout = ({children, showSidebar=false}) => {
    // as we want when to shoe sidebar when to not so for that we create showSidebar=false na ki abhi nhi chiaye
  return (
    <div className="min-h-screen">
      <div className="flex">
        {showSidebar && <Sidebar />}
{/*  show sidebar when it is true only */}
       <div className="flex-1 flex flex-col">
          <Navbar />
{/*  main means left side sidebar uper nav neeche uske content and children here means ki homepage ayega layout m, notification ayenga ya kon ayega vo sabh child hoge na , if not mention this toh un pages k neeche layput nhi dikhega na  */}

          <main className="flex-1 overflow-y-auto">{children}</main>
        </div>
      </div>
    </div>
  )
}

export default Layout
