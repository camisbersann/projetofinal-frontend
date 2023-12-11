import NavLink from '../navlink/NavLink';
import styles from './header.module.css';
import Image from 'next/image';


export const Header = () => {
    return (
        <div className={styles.header}>
            <Image src="/logoCodeBreakers.png" alt="Logo da Equipe" width={160} height={100} className={styles.logoImage} />
            <div className={styles.links}>


                <div className={styles.d1}>
                    <NavLink rota="/" imagem={"/register-svgrepo-com (1).svg"}/>
                </div>


                <div className={styles.d1}>
                    <NavLink rota="/principalpage" imagem={"/airplane-svgrepo-com.svg"}/>
                </div>

                <div className={styles.d1}>
                    <NavLink rota="/api" imagem={"/api-page-svgrepo-com.svg"}/>
                </div>


                <div className={styles.d1}>
                    <NavLink rota="/person" imagem={"/about-us-svgrepo-com.svg"} />
                </div>

            </div>
            
        </div>
        
    );
}