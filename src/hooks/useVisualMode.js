import { useState } from 'react';


export default function useVisualMode(initial) {
  const [ mode, setMode ] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(nextMode, replace = false) {

    // replace recent mode with next (eg. [FIRST, SECOND] --> [FIRST, THIRD])
    if (replace) {

      let cutRecentMode = history.slice(0, -1);
      setMode(nextMode);
      setHistory([...cutRecentMode, nextMode]);

      // else behave normally (add mode)
    } else {

      setMode(nextMode);
      setHistory([...history, nextMode])
    }
  }

  function back() {
    if (history.length > 1) {
      let prevHistory = history.slice(0, -1);
      setHistory(prevHistory); // later
      setMode(prevHistory[prevHistory.length - 1]);
    }

  }


  return { mode, transition, back };
}

