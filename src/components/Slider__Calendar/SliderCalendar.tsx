import { IonButton, IonIcon } from "@ionic/react";
import { calendar } from "ionicons/icons";
import { days, DefaultComponentText, months } from "./text";

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

interface ContainerProps { }

const SliderCalendar: React.FC<ContainerProps> = () => {
  // VARIABLES ---------------------
  const language: typeAviableLanguages = "ita";
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
    setIsModalCalendarOpen(true);
  };

  useEffect(() => {
    console.log("UseEffect : ");
    handleSetMonthData(getDaysInMonth(selectedMonth + 1, selectedYear));
    if (calendarSwiper) calendarSwiper.slideTo(selectedDay);
  }, [selectedDay, selectedMonth, selectedYear]);

  const handleSetMonthData = (length: number) => {
    console.log("handleSetMonthData : ", length);
    setMonthData([]);
    const auxArray: typeCardSingleDay[] = [];
    let startDays = selectedWeekDay + 1;

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
    console.log("selectedDate : ", selectedDate);

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
