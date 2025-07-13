import React from "react";
import { useState, useEffect } from "react";
// import { Button } from "@/components/ui/button";
import { Sun, Moon } from "lucide-react";
// import url("https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css");

export default function ThemeToggle() {
  const [darkMode, setDarkMode] = useState(
    typeof window !== "undefined" ? localStorage.getItem("theme") === "dark" : false
  );

  useEffect(() => {
    if (darkMode) {
    //   document.documentElement.classList.add("dark");
    //   localStorage.setItem("theme", "dark");
    // document.body.classList.add("bg-dark", "text-white");
    localStorage.setItem("theme", "dark");
    } else {
    //   document.documentElement.classList.remove("dark");
    //   localStorage.setItem("theme", "light");
    
    // document.body.classList.remove("bg-dark", "text-white");
    localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <button onClick={() => setDarkMode(!darkMode)} className="p-2 rounded-lg">
      {/* {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />} */}
      {darkMode? <i class="bi bi-toggle-on"></i>:<i class="bi bi-toggle-off"></i>}
    </button>
  );
}
