import styles from './Loading.module.css';

const Loading = () => {
   const bars = [
      { id: 1, left: 0, top: "27px", delay: 0.45, rotate: -90 },
      { id: 2, left: "8px", top: "10px", delay: 0.6, rotate: -45 },
      { id: 3, left: "25px", top: "3px", delay: 0.75, rotate: 0 },
      { id: 4, right: "8px", top: "10px", delay: 0.9, rotate: 45 },
      { id: 5, right: 0, top: "27px", delay: 1.05, rotate: 90 },
      { id: 6, right: "8px", bottom: "7px", delay: 1.2, rotate: 135 },
      { id: 7, left: "25px", bottom: 0, delay: 1.35, rotate: 180 },
      { id: 8, left: "8px", bottom: "7px", delay: 1.5, rotate: -135 },
   ];

   return (
      <div className={styles.floatingBars}>
         {/* <p>Loading ...</p> */}
         {bars.map((bar) => (
         <div
            key={bar.id}
            className={styles.block}
            style={{
               left: bar.left,
               right: bar.right,
               top: bar.top,
               bottom: bar.bottom,
               animationDelay: `${bar.delay}s`,
               transform: `rotate(${bar.rotate}deg)`,
            }}
         ></div>
         ))}
      </div>
   )
};

export default Loading;