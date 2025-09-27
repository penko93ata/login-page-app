"use client";

import { useState } from "react";

import styles from "./Sidebar.module.css";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { useTheme } from "@/contexts/ThemeContext";
import Link from "next/link";
import { useAuth } from "@/lib/features/auth/useAuth";

type LanguageItem = {
  code: (typeof routing.locales)[number];
  flag: string;
  name: string;
};

const navigationItems = [{ key: "/login", label: "Login", showWhenAuthenticated: false }];

const languages: LanguageItem[] = [
  { code: "en", flag: "🇺🇸", name: "English" },
  { code: "bg", flag: "🇧🇬", name: "Български" },
];

export default function Sidebar() {
  const { theme, toggleTheme } = useTheme();
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated, logout } = useAuth();

  const currentLanguage = languages.find((lang) => lang.code === locale);

  return (
    <aside className={styles.sidebar}>
      <div className={styles.header}>
        {/* Logout icon here if user is logged in */}
        <button className={styles.themeToggle} onClick={toggleTheme} title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}>
          {theme === "light" ? "🌙" : "☀️"}
        </button>
        {isAuthenticated && (
          <button className={styles.logoutButton} onClick={logout} title='Logout'>
            🚪
          </button>
        )}
      </div>

      <nav className={styles.navigation}>
        {navigationItems
          .filter((item) => item.showWhenAuthenticated === isAuthenticated)
          .map((item) => (
            <Link key={item.key} href={item.key} className={`${styles.navItem} ${pathname === item.key ? styles.active : ""}`}>
              <span className={styles.navLabel}>{item.label}</span>
            </Link>
          ))}
      </nav>

      <div className={styles.languageSelector}>
        <button className={styles.languageButton} onClick={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)}>
          <span className={styles.languageFlag}>{currentLanguage?.flag}</span>
          <span className={styles.languageName}>{currentLanguage?.name}</span>
          <span className={`${styles.dropdownArrow} ${isLanguageDropdownOpen ? styles.open : ""}`}>▼</span>
        </button>

        {isLanguageDropdownOpen && (
          <div className={styles.languageDropdown}>
            {languages.map((lang) => (
              <button
                key={lang.code}
                className={`${styles.languageOption} ${locale === lang.code ? styles.selected : ""}`}
                onClick={() => {
                  router.replace(pathname, { locale: lang.code });
                  router.refresh();
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
