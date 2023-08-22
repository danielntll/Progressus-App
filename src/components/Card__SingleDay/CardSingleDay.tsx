import { DefaultComponentText } from "./DefaultComponent-text";
import styles from "./CardSingleDay.module.css";

import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { IonBadge, } from "@ionic/react";
import { typeCardSingleDay } from "../../types/typeCardSingleDay";

interface ContainerProps {
  data: typeCardSingleDay;
  callback: () => void;
  isActive: boolean;
  isToday: boolean;
}

const CardSingleDay: React.FC<ContainerProps> = ({
  data,
  callback,
  isActive,
  isToday,
}) => {
  // VARIABLES ---------------------
  // CONDITIONS --------------------
  // FUNCTIONS ---------------------
  // RETURN ------------------------
  return (
    <div
      onClick={callback}
      className={
        isActive
          ? styles.CardSingleDay__isActive +
          " " +
          styles.CardSingleDay__container
          : styles.CardSingleDay__container
      }
    >
      <p className={styles.CardSingleDay__dayNumber}>{data.dayNumber}</p>
      <p className={styles.CardSingleDay__dayString}>{data.dayString}</p>
      <div className={styles.CardSingleDay__circularProgress}>
        <CircularProgressbar
          value={50}
          text={`${50}%`}
          strokeWidth={8}
          styles={buildStyles({
            pathColor: `#3880ff`,
            textColor: "#3880ff",
            trailColor: "#d6d6d6",
            backgroundColor: "#3e98c7",
          })}
        />
      </div>
      <div className={styles.CardSingleDay__IonBadge}>
        {isToday ? (
          <IonBadge color="primary">{DefaultComponentText.isToday}</IonBadge>
        ) : null}
      </div>
    </div>
  );
};

export default CardSingleDay;
