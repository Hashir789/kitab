import Link from "next/link";
import Image from "next/image";
import styles from "./Navbar.module.css";
import NavLinksClient from "./NavLinksClient";
import WaitlistForm from "./WaitlistForm";
import Tooltip from "../tooltip/Tooltip";

export default function Navbar() {
  const navItems = [
    { label: "Home", href: "/" },
    { label: "Features", href: "/features" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <header
      className={styles.header}
      role="banner"
      itemScope
      itemType="https://schema.org/Organization"
    >
      <div className="container">
        <nav
          aria-label="Primary"
          className={styles.nav}
          itemScope
          itemType="https://schema.org/SiteNavigationElement"
          itemProp="hasPart"
        >

          <div className={styles.navLeft}>
            <div className={styles.logoContainer}>
              <Tooltip text="Kitaab - Be your own accountant" position="right">
                <Link
                  href="/"
                  className={styles.logo}
                  aria-label="Kitaab home"
                  itemProp="url"
                >
                  <Image
                    src="/kitaab-logo.png"
                    alt="Kitaab logo"
                    width={180}
                    height={60}
                    className={styles.logo}
                    itemProp="logo"
                    priority
                  />
                  <span className={styles.srOnly} itemProp="name">
                    Kitaab
                  </span>
                </Link>
              </Tooltip>
            </div>
          </div>

          <div className={styles.navCenter}>
            <NavLinksClient items={navItems} />
          </div>

          <div className={styles.navRight}>
            <WaitlistForm />
          </div>
        </nav>
      </div>
    </header>
  );
}
