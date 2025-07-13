import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { Sun, Moon } from "lucide-react";
import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";

export default function ThemeToggle() {
  const [darkMode, setDarkMode] = useState(
    typeof window !== "undefined" ? localStorage.getItem("theme") === "dark" : false
  );

  useEffect(() => {
    const body = document.body;
    const html = document.documentElement;
    if (darkMode) {
      // body.classList.add("bg-dark", "text-white");
      html.setAttribute("data-bs-theme", "dark");
      localStorage.setItem("theme", "dark");
    } else {
      // body.classList.remove("bg-dark", "text-white");
      html.setAttribute("data-bs-theme", "light");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    // <Button onClick={() => setDarkMode(!darkMode)} variant={darkMode ? "light" : "dark"}>
    <Button onClick={() => setDarkMode(!darkMode)} className={darkMode? "btn btn-light" : "btn btn-dark"}>
      {darkMode? <i class="bi bi-toggle-on"></i>:<i class="bi bi-toggle-off"></i>}
    </Button>
  );
}
