import React from 'react';

const Timer = (props) => {
  const [hours, setHours] = React.useState(0);
  const [minutes, setMinutes] = React.useState(0);
  const [seconds, setSeconds] = React.useState(0);

  React.useEffect(() => {
    let hours = Math.floor(props.timePassed / 3600);
    setHours(() => (hours.toString().length === 1 ? '0' : '') + hours);

    let minutes = Math.floor((props.timePassed % 3600) / 60);
    setMinutes(() => (minutes.toString().length === 1 ? '0' : '') + minutes);

    let seconds = props.timePassed % 60;
    setSeconds(() => (seconds.toString().length === 1 ? '0' : '') + seconds);
  }, [props.timePassed]);

  return (
    <>
      <h3>
        {hours}:{minutes}:{seconds}
      </h3>
    </>
  );
};

export default Timer;
