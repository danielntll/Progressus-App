{
  // const handleSetSelectedCategory = (value: any) => {
  //   categorySwiper.slideTo(todoCategory.indexOf(todoCategory[value.target.value[0]]));
  //   setTodo({ ...todo, categoryType: todoCategory[value.target.value[0]] });
  // }
  /* <div className="ion-padding">
            <IonLabel>
              <p className="padding-bottom-small">
                {text[language].category}
              </p>
            </IonLabel>

            <IonSegment
              value={todoCategory.indexOf(todo.categoryType) + "-" + todo.categoryType}
              onIonChange={(e) => {
                handleSetSelectedCategory(e)
              }}
            >
              {todoCategory.map((_: string, index: number) => {
                return (
                  <IonSegmentButton
                    value={(index + "-" + todoCategory[index]).toString()}
                    key={index + "categories"}
                  >
                    <IonLabel>{textTodoCategory[language][todoCategory[index]]}</IonLabel>
                  </IonSegmentButton>
                )
              })}
            </IonSegment>
          </div>

          <div>
            <Swiper
              onInit={(ev) => {
                setCategorySwiper(ev);
              }}
              centeredSlides={true}
              slidesPerView={1}
              initialSlide={0}
            >
              <SwiperSlide>
                <CardCustomizeDaily />
              </SwiperSlide>
              <SwiperSlide>
                <CardCustomizeCategoryGoal />
              </SwiperSlide>
              <SwiperSlide>
                <CardCustomizeCategoryFolder />
              </SwiperSlide>
            </Swiper>
          </div> 
          */
}
