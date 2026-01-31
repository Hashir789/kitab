"use client";
import Link from "next/link";
import styles from "./Navbar.module.css";
import { usePathname } from "next/navigation";

type NavItem = { label: string; href: string; };
type NavLinksClientProps = { items: NavItem[]; };

export default function NavLinksClient({ items }: NavLinksClientProps) {

    const pathname = usePathname();
    const activeIndex = items.findIndex(item => item.href === pathname);
    const leftPos = 5 + (activeIndex === -1 ? 0 : activeIndex * 112);

    return (
        <ul className={styles.navList} style={{ "--active-left": `${leftPos}px` } as any} role="list">
            {
                items.map((item, index) => {
                    const isActive = item.href === pathname;
                    const navClass = `${styles.navItem} ${styles[`navItem${index + 1}`]} ${isActive ? styles.navItemActive : ""}`;
                    return (
                        <li key={item.label} className={navClass} role="listitem" itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
                            <Link 
                                href={item.href} 
                                aria-current={isActive ? "page" : undefined}
                                itemProp="url"
                            >
                                <span itemProp="name">{item.label}</span>
                            </Link>
                        </li>
                    );
                })
            }
        </ul>
    );
}