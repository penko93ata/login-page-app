"use client";

import { useState } from "react";

import styles from "./Sidebar.module.css";
import { Messages, useLocale, useTranslations } from "next-intl";
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

type NavigationItem = {
  key: string;
  labelKey: keyof Messages["Navigation"];
  showWhenAuthenticated: boolean;
};

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
  const t = useTranslations("Navigation");
  const tTheme = useTranslations("Theme");
  const tSidebar = useTranslations("Sidebar");

  const navigationItems: NavigationItem[] = [
    { key: "/login", labelKey: "login" as keyof Messages["Navigation"], showWhenAuthenticated: false },
  ];

  const currentLanguage = languages.find((lang) => lang.code === locale);

  const getThemeToggleTitle = () => {
    return theme === "light" ? tTheme("switchToDark") : tTheme("switchToLight");
  };

  return (
    <aside className={styles.sidebar}>
      <div className={styles.header}>
        <button className={styles.themeToggle} onClick={toggleTheme} title={getThemeToggleTitle()} aria-label={tSidebar("themeToggle")}>
          {theme === "light" ? "🌙" : "☀️"}
        </button>
        {isAuthenticated && (
          <button className={styles.logoutButton} onClick={logout} title={t("logout")} aria-label={tSidebar("logout")}>
            🚪
          </button>
        )}
      </div>

      <nav className={styles.navigation}>
        {navigationItems
          .filter((item) => item.showWhenAuthenticated === isAuthenticated)
          .map((item) => (
            <Link key={item.key} href={item.key} className={`${styles.navItem} ${pathname === item.key ? styles.active : ""}`}>
              <span className={styles.navLabel}>{t(item.labelKey as keyof Messages["Navigation"])}</span>
            </Link>
          ))}
      </nav>

      <div className={styles.languageSelector}>
        <button
          className={styles.languageButton}
          onClick={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)}
          aria-label={tSidebar("languageSelector")}
        >
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
