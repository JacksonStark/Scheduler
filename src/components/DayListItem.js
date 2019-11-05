import React from 'react';
import 'components/DayListItem.scss'
import classnames from 'classnames';



export default function DayListItem(props) {

  function formatSpots(prop) {
    if (props.spots === 0) {
      return `no spots remaining`
    }
    else if (props.spots === 1) {
      return `${prop} spot remaining`
    }
    return `${prop} spots remaining`
  }

  const dayClass = classnames('day-list__item', {
    'day-list__item--full': props.spots === 0,
    'day-list__item--selected': props.selected
  })


  return (
    <li className={dayClass} data-testid="day" onClick={() => props.setDay(props.name)}> {/* Represents entire DAY item */}
      <h2 className='text--regular'>{props.name}</h2> {/* Display day name */}     
      <h3 className='text--light'>{formatSpots(props.spots)}</h3>  {/* Display spots remaining*/}
    </li>
  );
}