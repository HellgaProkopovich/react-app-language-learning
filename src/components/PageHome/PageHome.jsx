import picHome from '../../assets/parthenon_b.png';
import styles from '../PageHome/pageHome.module.css';

const PageHome = () => {
   return (
      <div className={styles.pageHomeContainer}>
         <p className={styles.textGreyHome}>[the home page]</p>
         <h1 className={styles.titleHome}>το σπίτι page</h1>
         <img src={picHome} className={styles.picHome} alt="home" />
         <p className={styles.textHome}>Φισικά, θα μιλάς ελληνικά!</p>
         <p className={styles.textGreyHome}>[Of course, you will speak Greek!]</p>
      </div>
   )
};

export default PageHome;