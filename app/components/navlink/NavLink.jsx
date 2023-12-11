import Link from "next/link";
import styles from './NavLink.module.css'
import Image from "next/image";

const NavLink = ({rota, imagem}) => {
    return (
        <div className={styles.links}>
            <Link href={rota} className={styles.slideInFromRight}>
                <Image src={imagem} width={21} height={21}/>
            </Link>
        </div>
    );
}

export default NavLink;
