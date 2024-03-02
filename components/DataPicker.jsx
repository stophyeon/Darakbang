import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const CustomDatePicker = () => {
  const YEARS = Array.from(
    { length: getYear(new Date()) + 1 - 2000 },
    (_, i) => getYear(new Date()) - i
  );
  const MONTHS = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const [selectedDate, setSelectedDate] = useState(null);

  const handleMonthChange = (date) => {
    setSelectedDate(date);
  };

  const handleYearChange = (year) => {
    setSelectedDate(year);
  };

  return (
    <DatePicker
        // 요일이 Su Mo Tu가 아닌 S M T 형태로 나타냄
        formatWeekDay={(nameOfDay) => nameOfDay.substring(0, 1)}
        showYearDropdown
        scrollableYearDropdown
        yearDropdownItemNumber={100}
        renderCustomHeader={({
          date,
          changeYear,
          decreaseMonth,
          increaseMonth,
          prevMonthButtonDisabled,
          nextMonthButtonDisabled,
        }) => (
          <div className={styles.customHeaderContainer}>
            <div>
              <span className={styles.month}>{MONTHS[getMonth(date)]}</span>
              <select
                value={getYear(date)}
                className={styles.year}
                onChange={({ target: { value } }) => changeYear(+value)}
              >
                {YEARS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <button
                type='button'
                onClick={decreaseMonth}
                className={styles.monthButton}
                disabled={prevMonthButtonDisabled}
              >
                <LeftArrow fill='#ffffff' />
              </button>
              <button
                type='button'
                onClick={increaseMonth}
                className={styles.monthButton}
                disabled={nextMonthButtonDisabled}
              >
                <RightArrow fill='#ffffff' />
              </button>
            </div>
          </div>
        )}
      />
    
  );
};

export default CustomDatePicker;
