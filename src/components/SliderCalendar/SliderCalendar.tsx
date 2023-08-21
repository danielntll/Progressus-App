import { IonButton, IonIcon } from "@ionic/react";
import { calendar } from "ionicons/icons";
import { DefaultComponentText } from "./SliderCalendar-text";

import styles from "./SliderCalendar.module.css";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import CardSingleDay, {
  typeCardSingleDay,
} from "../CardSingleDay/CardSingleDay";
import { useEffect, useState } from "react";
import { getDaysInMonth } from "../../utils/getDaysInMonth";

interface ContainerProps {}

const SliderCalendar: React.FC<ContainerProps> = () => {
  // VARIABLES ---------------------
  const today = new Date();
  const days = ["DOM", "LUN", "MAR", "MER", "GIO", "VEN", "SAB"];
  // CONDITIONS --------------------
  const [selectedYear, setSelectedYear] = useState<number>(today.getFullYear());
  const [selectedMonth, setSelectedMonth] = useState<number>(today.getMonth());
  const [selectedDay, setSelectedDay] = useState<number>(today.getDate());
  const [selectedWeekDay, setSelectedWeekDay] = useState<number>(
    today.getDay()
  );

  const [monthData, setMonthData] = useState<typeCardSingleDay[]>();

  // FUNCTIONS ---------------------
  const handleOpenModalCalendar = () => {
    console.log("handleOpenModalCalendar");
  };

  useEffect(() => {
    console.log("handleGetDayData : ", selectedDay);
  }, [selectedDay]);

  useEffect(() => {
    handleSetMonthData(getDaysInMonth(selectedMonth, selectedYear));
  }, [selectedMonth, selectedYear]);

  const handleSetMonthData = (length: number) => {
    const auxArray: typeCardSingleDay[] = [];
    let startDays = selectedWeekDay + 1;

    for (let index = 0; index < length; index++) {
      auxArray.push({
        dayNumber: index + 1,
        dayString: days[startDays],
      });

      if (startDays !== 6) {
        startDays++;
      } else {
        startDays = 0;
      }
    }
    setMonthData(auxArray);
  };

  const handleChangeDay = (dayNumber: number) => {
    setSelectedDay(dayNumber);
  };
  // RETURN ------------------------
  return (
    <div className={styles.container}>
      <div className={styles.SliderCalendar__header}>
        <h3>{DefaultComponentText.title}</h3>
        <IonButton onClick={() => handleOpenModalCalendar()} size="small">
          <IonIcon icon={calendar} />
        </IonButton>
      </div>
      <div className={styles.SliderCalendar__content}>
        <Swiper slidesPerView={4} initialSlide={selectedDay - 1}>
          {monthData?.map((data: typeCardSingleDay, index: number) => {
            return (
              <SwiperSlide
                key={selectedMonth + index}
                className={styles.SliderCalendar__slide}
              >
                <CardSingleDay
                  data={data}
                  isActive={selectedDay === data.dayNumber ? true : false}
                  isToday={data.dayNumber === today.getDate() ? true : false}
                  callback={() => handleChangeDay(data.dayNumber)}
                />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
};

export default SliderCalendar;
