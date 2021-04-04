import React from 'react';
import Timer from './Timer/Timer';
import './App.css';

import { interval } from 'rxjs';
import { map } from 'rxjs/operators';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  btnStart: {
    backgroundColor: '#00b33c',
    '&:hover': {
      backgroundColor: '#00802b',
    },
  },
  btnWait: {
    margin: '7px',
    backgroundColor: '#ffff00',
    '&:hover': {
      backgroundColor: '#e6e600',
    },
  },
  btnReset: {
    backgroundColor: '#e62e00',
    '&:hover': {
      backgroundColor: '#cc2900',
    },
  },
}));

const delay = 1000;

function App() {
  const [timer, setTimer] = React.useState(0);
  const [diff, setDiff] = React.useState(0);

  const [subscription, setSubscription] = React.useState('');
  const [prevent, setPrevent] = React.useState(true);

  const classes = useStyles();

  const onStartHandler = () => {
    if (!subscription) {
      const timer$ = interval(delay)
        .pipe(map((val) => val + 1))
        .subscribe((val) => {
          setTimer(val + diff);
        });
      setSubscription(timer$);
    } else {
      subscription.unsubscribe();
      setTimer(0);
      setDiff(0);
      setSubscription('');
    }
  };

  const onWaitHandler = (e) => {
    if (prevent) {
      setPrevent(false);
      const timerInstance = setTimeout(function () {
        setPrevent(true);
        clearTimeout(timerInstance);
      }, 300);
    } else {
      if (subscription) {
        subscription.unsubscribe();
      }
      setDiff(timer);
      setSubscription('');
    }
  };

  const onResetHandler = () => {
    if (subscription) {
      subscription.unsubscribe();
    }

    const timer$ = interval(delay).subscribe((val) => {
      setTimer(val);
    });
    setSubscription(timer$);
  };

  return (
    <div className="App">
      <h1>React - RxJS Timer</h1>
      <Timer timePassed={timer ? timer : diff} />
      <div>
        <Button
          className={classes.btnStart}
          onClick={onStartHandler}
          variant="contained"
          color="primary"
        >
          Start/Stop
        </Button>
        <Button
          className={classes.btnWait}
          onClick={onWaitHandler}
          variant="contained"
          color="default"
        >
          Wait
        </Button>
        <Button
          className={classes.btnReset}
          onClick={onResetHandler}
          variant="contained"
          color="secondary"
        >
          Reset
        </Button>
      </div>
    </div>
  );
}

export default App;
