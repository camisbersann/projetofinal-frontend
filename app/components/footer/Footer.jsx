import Image from "next/image"
import styles from "./footer.module.css"


export default function Footer() {

  return (
    <div className={styles.colors}>
      <div className={styles.a}>
      <img src="/LogoCodeBreakers.png" alt="Logo da Equipe" width={160} height={100} className={styles.logoImage} />

        <div className={styles.a} id={styles.text}>
          <h2>Code Breakers</h2>
        </div>
        <div className={styles.a} id={styles.icons}>
          <a href="https://linktr.ee/lonaenrico" target="_blank" rel="noopener noreferrer"><Image src={"/md_5af2d4cabfdf2-removebg-preview.png"} width={50} height={50} alt="logo do whatsapp" /></a>
          <a href="http://linktr.ee/camisbersan" target="_blank" rel="noopener noreferrer"><Image src={"/whatsapp-removebg-preview.png"} width={28} height={28} alt="logo do instagram" /></a>
          <a href="https://linktr.ee/andreybotero?utm_source=linktree_admin_share" target="_blank" rel="noopener noreferrer"><Image src={'/pngwing.com.png'} width={38} height={38} alt="logo do github" /></a>
        </div>
      </div>
      <div className={styles.linha}></div>
      <p className={styles.text2}>@Todos os direitos reservados</p>

    </div>

  )

}