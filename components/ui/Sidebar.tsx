"use client";

import { useState } from "react";

import styles from "./Sidebar.module.css";

export default function Sidebar() {
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);

  const navigationItems = [
    { key: "about", label: "About" },
    { key: "contact", label: "Contact" },
  ];

  const languages = [
    { code: "en", flag: "🇺🇸", name: "English" },
    { code: "bg", flag: "🇧🇬", name: "Български" },
  ];

  //   const currentLanguage = languages.find((lang) => lang.code === language)

  return (
    <aside className={styles.sidebar}>
      <div className={styles.header}>
        {/* Logout icon here if user is logged in */}
        <button className={styles.themeToggle} onClick={() => null} title={`Switch to dark mode`}>
          {/* {"light" ? "🌙" : "☀️"} */}
          ☀️
        </button>
      </div>

      <nav className={styles.navigation}>
        {navigationItems.map((item) => (
          <button key={item.key} className={styles.navItem} onClick={() => null}>
            <span className={styles.navLabel}>{item.label}</span>
          </button>
        ))}
      </nav>

      <div className={styles.languageSelector}>
        <button className={styles.languageButton} onClick={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)}>
          <span className={styles.languageFlag}>🇺🇸</span>
          <span className={styles.languageName}>English</span>
          <span className={`${styles.dropdownArrow} ${isLanguageDropdownOpen ? styles.open : ""}`}>▼</span>
        </button>

        {isLanguageDropdownOpen && (
          <div className={styles.languageDropdown}>
            {languages.map((lang) => (
              <button
                key={lang.code}
                className={`${styles.languageOption} ${"en" === lang.code ? styles.selected : ""}`}
                onClick={() => {
                  setIsLanguageDropdownOpen(false);
                }}
              >
                <span className={styles.languageFlag}>{lang.flag}</span>
                <span className={styles.languageName}>{lang.name}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </aside>
  );
}
