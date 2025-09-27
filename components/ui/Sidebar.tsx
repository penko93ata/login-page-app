"use client";

import { useState } from "react";

import styles from "./Sidebar.module.css";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

type LanguageItem = {
  code: (typeof routing.locales)[number];
  flag: string;
  name: string;
};

const navigationItems = [
  { key: "about", label: "About" },
  { key: "contact", label: "Contact" },
];

const languages: LanguageItem[] = [
  { code: "en", flag: "🇺🇸", name: "English" },
  { code: "bg", flag: "🇧🇬", name: "Български" },
];

export default function Sidebar() {
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  console.log({ locale, pathname });

  const currentLanguage = languages.find((lang) => lang.code === locale);
  console.log({ currentLanguage });

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
