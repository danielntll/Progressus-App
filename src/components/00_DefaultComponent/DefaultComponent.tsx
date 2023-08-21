import { DefaultComponentText } from "./DefaultComponent-text";
import styles from "./DefaultComponent.module.css";

interface ContainerProps {}

const DefaultComponent: React.FC<ContainerProps> = () => {
  // VARIABLES ---------------------
  // CONDITIONS --------------------
  // FUNCTIONS ---------------------
  // RETURN ------------------------
  return <div className={styles.container}>{DefaultComponentText.title}</div>;
};

export default DefaultComponent;
