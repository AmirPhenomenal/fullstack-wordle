import React from "react";
import DateTimeDisplay from "./DateTimeDisplay";
import { useCountdown } from "./useCountdown";
import "./styles.css";
const ExpiredNotice = () => {
  localStorage.clear();
  window.location.reload();
  return (
    <div className="expired-notice">
      <span>Word Has Expired!!!</span>
    </div>
  );
};

const ShowCounter = ({ days, hours, minutes, seconds }) => {
  return (
    <div className="show-counter">
      <div className="countdown-link">
        {/* <DateTimeDisplay value={days} type={"Days"} isDanger={days <= 3} />
        <p>:</p> */}
        <DateTimeDisplay value={hours} type={"Hours"} isDanger={false} />
        <p>:</p>
        <DateTimeDisplay value={minutes} type={"Minutes"} isDanger={false} />
        <p>:</p>
        <DateTimeDisplay
          value={seconds}
          type={"Seconds"}
          isDanger={hours == 0 && minutes == 0 && seconds <= 59}
        />
      </div>
    </div>
  );
};

const Countdown = ({ targetDate }) => {
  const [days, hours, minutes, seconds] = useCountdown(targetDate);

  if (days + hours + minutes + seconds <= 0) {
    return <ExpiredNotice />;
  } else {
    return (
      <ShowCounter
        days={days}
        hours={hours}
        minutes={minutes}
        seconds={seconds}
      />
    );
  }
};

export default Countdown;
