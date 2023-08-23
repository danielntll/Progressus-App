import { IonButton, IonIcon } from "@ionic/react";
import { calendar } from "ionicons/icons";
import { text } from "./text";

import styles from "./SliderCalendar.module.css";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";

import { useEffect, useState } from "react";
import { getDaysInMonth } from "../../utils/getDaysInMonth";
import ModalCalendar from "../Modal__Calendar/ModalCalendar";
import { typeCardSingleDay } from "../../types/typeCardSingleDay";
import CardSingleDay from "../Card__SingleDay/CardSingleDay";
import { typeAviableLanguages } from "../../types/typeAviableLanguages";
import { days, months } from "../../text/textDays&Months";





interface ContainerProps {
  selectedDate: Date,
  setSelectedDate: (newDate: Date) => void;
}

const SliderCalendar: React.FC<ContainerProps> = ({
  selectedDate,
  setSelectedDate,
}) => {
  // VARIABLES ---------------------
  const language: typeAviableLanguages = "ita";
  const today = new Date();

  // CONDITIONS --------------------
  const [calendarSwiper, setCalendarSwiper] = useState<any>();
  const [isModalCalendarOpen, setIsModalCalendarOpen] =
    useState<boolean>(false);

  const [selectedYear, setSelectedYear] = useState<number>(selectedDate.getFullYear());
  const [selectedMonth, setSelectedMonth] = useState<number>(selectedDate.getMonth());
  const [selectedDay, setSelectedDay] = useState<number>(selectedDate.getDate());
  const [selectedWeekDay, setSelectedWeekDay] = useState<number>(
    selectedDate.getDay()
  );

  const [monthData, setMonthData] = useState<typeCardSingleDay[]>();

  // FUNCTIONS ---------------------
  const handleOpenModalCalendar = () => {
    setIsModalCalendarOpen(true);
  };

  useEffect(() => {
    handleSetMonthData(getDaysInMonth(selectedMonth + 1, selectedYear));
    setSelectedDate(new Date(selectedYear + "-" + (selectedMonth + 1) + "-" + selectedDay))
    if (calendarSwiper) calendarSwiper.slideTo(selectedDay);
  }, [selectedDay, selectedMonth, selectedYear]);

  const handleSetMonthData = (length: number) => {
    const monthIndex = selectedMonth; // 0-11
    const yearNumber = selectedYear;

    const firstDayOfMonth = new Date(yearNumber + "-" + (monthIndex + 1) + "-" + 1)

    setMonthData([]);
    const auxArray: typeCardSingleDay[] = [];
    let startDays = firstDayOfMonth.getDay();

    for (let index = 0; index < length; index++) {
      auxArray.push({
        dayNumber: index + 1,
        dayString: days[language][startDays],
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

    const converted = new Date(selectedDate);
    const selDay = converted.getDate();
    const selMonth = converted.getMonth();
    const selYear = converted.getFullYear();
    const selWeekendDay = converted.getDay();

    setSelectedDate(selectedDate);
    setSelectedDay(selDay);
    setSelectedMonth(selMonth);
    setSelectedYear(selYear);
    setSelectedWeekDay(selWeekendDay);

    handleSetMonthData(getDaysInMonth(selMonth + 1, selYear));

    if (calendarSwiper) calendarSwiper.slideTo(selDay);
  };
  // RETURN ------------------------
  return (
    <>
      <div className={styles.container}>
        <div className={styles.SliderCalendar__header + " ion-padding"}>
          <div>
            <p className={styles.SliderCalendar__year}>{selectedYear}</p>
            <h3 className={styles.SliderCalendar__month}>
              {months[language][selectedMonth]}
            </h3>
          </div>
          <div>
            <IonButton
              fill="outline"
              onClick={() => handleChangeFullDate(today)}
              size="small"
            >
              {text[language].today}
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
