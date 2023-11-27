import styles from './page.module.css'
import { Header } from './components/header/Header'
import Footer from './components/footer/Footer'
export default function Home() {
  return (
    <div>
      <Header />
      <h1 className={styles.title}>HOME PAGE</h1>
      <Footer />
    </div>
  )
}
