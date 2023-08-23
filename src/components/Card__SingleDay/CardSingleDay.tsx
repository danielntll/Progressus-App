import { text } from "./text";
import styles from "./CardSingleDay.module.css";

import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { IonBadge, } from "@ionic/react";
import { typeCardSingleDay } from "../../types/typeCardSingleDay";
import { typeAviableLanguages } from "../../types/typeAviableLanguages";
import { constColors } from "../../constants/colors";

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
  const language: typeAviableLanguages = "ita";
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
          strokeWidth={12}
          styles={buildStyles({
            pathColor: constColors.primary,
            textColor: constColors.primary,
            trailColor: "#d6d6d6",
            backgroundColor: "#3e98c7",
          })}
        />
      </div>
      <div className={styles.CardSingleDay__IonBadge}>
        {isToday ? (
          <IonBadge color="primary">{text[language].isToday}</IonBadge>
        ) : null}
      </div>
    </div>
  );
};

export default CardSingleDay;
