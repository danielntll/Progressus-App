import { IonButton, IonIcon } from "@ionic/react";
import { calendar, calendarNumber } from "ionicons/icons";
import { days, DefaultComponentText, months } from "./SliderCalendar-text";

import styles from "./SliderCalendar.module.css";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import CardSingleDay, {
  typeCardSingleDay,
} from "../CardSingleDay/CardSingleDay";
import { useEffect, useState } from "react";
import { getDaysInMonth } from "../../utils/getDaysInMonth";
import ModalCalendar from "../Modal__Calendar/ModalCalendar";

interface ContainerProps {}

const SliderCalendar: React.FC<ContainerProps> = () => {
  // VARIABLES ---------------------
  const today = new Date();

  // CONDITIONS --------------------
  const [calendarSwiper, setCalendarSwiper] = useState<any>();
  const [isModalCalendarOpen, setIsModalCalendarOpen] =
    useState<boolean>(false);

  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
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
    setIsModalCalendarOpen(true);
  };

  useEffect(() => {
    handleSetMonthData(getDaysInMonth(selectedMonth, selectedYear));
    if (calendarSwiper) calendarSwiper.slideTo(selectedDay);
  }, [selectedDay, selectedMonth, selectedYear]);

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

  const handleChangeFullDate = (selectedDate: Date) => {
    const newDate = new Date(selectedDate);
    if (calendarSwiper) calendarSwiper.slideTo(selectedDay);
    setSelectedDate(selectedDate);
    setSelectedDay(newDate.getDate());
    setSelectedMonth(newDate.getMonth());
    setSelectedYear(newDate.getFullYear());
    setSelectedWeekDay(newDate.getDay());
  };
  // RETURN ------------------------
  return (
    <>
      <div className={styles.container}>
        <div className={styles.SliderCalendar__header + " ion-padding"}>
          <div>
            <p className={styles.SliderCalendar__year}>{selectedYear}</p>
            <h3 className={styles.SliderCalendar__month}>
              {months.ita[selectedMonth]}
            </h3>
          </div>
          <div>
            <IonButton
              fill="outline"
              onClick={() => handleChangeFullDate(today)}
              size="small"
            >
              {DefaultComponentText.ita.today}
            </IonButton>
            <IonButton onClick={() => handleOpenModalCalendar()} size="small">
              <IonIcon icon={calendar} />
            </IonButton>
          </div>
        </div>
        <div className={styles.SliderCalendar__content}>
          <Swiper
            onInit={(ev) => {
              setCalendarSwiper(ev);
            }}
            onActiveIndexChange={(e) => {
              console.log(selectedDay);
              console.log(e.activeIndex);
            }}
            centeredSlides={true}
            slidesPerView={4}
            initialSlide={selectedDay - 1}
          >
            {monthData?.map((data: typeCardSingleDay, index: number) => {
              return (
                <SwiperSlide
                  key={selectedMonth + index}
                  className={styles.SliderCalendar__slide}
                >
                  <CardSingleDay
                    data={data}
                    isActive={selectedDay === data.dayNumber ? true : false}
                    isToday={selectedDate === today ? true : false}
                    callback={() => handleChangeDay(data.dayNumber)}
                  />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>
      {/* -------------- EXTRA -------------- */}
      <ModalCalendar
        isOpen={isModalCalendarOpen}
        setIsOpen={setIsModalCalendarOpen}
        callback={handleChangeFullDate}
      />
    </>
  );
};

export default SliderCalendar;
