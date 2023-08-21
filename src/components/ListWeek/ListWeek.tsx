import CardSingleDay from "../CardSingleDay/CardSingleDay";
import { DefaultComponentText } from "./DefaultComponent-text";
import styles from "./ListWeek.module.css";

interface ContainerProps {}

const ListWeek: React.FC<ContainerProps> = () => {
  // VARIABLES ---------------------
  // CONDITIONS --------------------
  // FUNCTIONS ---------------------
  // RETURN ------------------------
  return (
    <div className={styles.ListWeek__container}>
      {/* <CardSingleDay data={{ dayNumber: 9, dayString: "LUN" }} /> */}
    </div>
  );
};

export default ListWeek;
