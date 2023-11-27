import NavLink from '../navlink/NavLink';
import styles from './header.module.css';
import Image from 'next/image';


export const Header = () => {
    return (
        <div className={styles.header}>
            <Image src="/logoCodeBreakers.png" alt="Logo da Equipe" width={160} height={100} className={styles.logoImage} />
            <div className={styles.links}>


                <div className={styles.d1}>
                    <Image src="/register-svgrepo-com (1).svg" alt="Cadastro" width={21} height={21}></Image>
                    <NavLink rota="/" texto="" />
                </div>


                <div className={styles.d1}>
                    <Image src="/airplane-svgrepo-com.svg" alt="Viagens" width={21} height={21}></Image>
                    <NavLink rota="/viagens" texto="" />
                </div>

                <div className={styles.d1}>
                    <Image src="/api-page-svgrepo-com.svg" alt="Documentation API" width={23} height={23}></Image>
                    <NavLink rota="/API" texto="" />
                </div>


                <div className={styles.d1}>
                    <Image src="/about-us-svgrepo-com.svg" alt="Sobre nós" width={23} height={23}></Image>
                    <NavLink rota="/sobrenos" texto="" />
                </div>

            </div>
            
        </div>
        
    );
}