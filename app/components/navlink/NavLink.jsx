import Link from "next/link";
import styles from './NavLink.module.css'

const NavLink = ({rota, texto}) => {
    return (
        <div className={styles.links}>
            <Link href={rota} className={styles.slideInFromRight}>{texto}</Link>
        </div>
    );
}

export default NavLink;
