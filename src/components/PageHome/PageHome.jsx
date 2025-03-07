import picHome from '../../assets/parthenon_b.png';
import styles from '../PageHome/pageHome.module.css';

const PageHome = () => {
   return (
      <div className={styles.pageHomeContainer}>
         <p className="textGrey">[the home page]</p>
         <h1 className="title">the home page</h1>
         <img src={picHome} className={styles.picHome} alt="home" />
         <p className="textDashed">Of course, you will speak English!</p>
         <p className="textGrey">[Of course, you will speak English!]</p>
      </div>
   )
};

export default PageHome;