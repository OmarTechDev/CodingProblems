import { useState, ChangeEvent} from 'react'
import TitleBoard from './Title'
import Board from './Board'
import { ComandLine } from './CommandLine'
import { RoversPositions } from './RoversMovement'

import './Body.css'

function Body() {
  const [rangeValueX, setRangeValueX] = useState(0)
  const [rangeValueY, setRangeValueY] = useState(0)
  const [numberPositionR, setNumberPositionR] = useState<string[]>([])
  const [routeRovers, setRouteRovers] = useState<string[]>([])

  const handleRangeChange = (e: ChangeEvent<HTMLInputElement>, identifier: 'X' | 'Y') => {
    const value = parseInt(e.target.value, 10);

    if (identifier === 'X') {
      setRangeValueX(value);
    } else if (identifier === 'Y') {
      setRangeValueY(value);
    }
  }

  const handlePositions = (e: string, setPosition: React.Dispatch<React.SetStateAction<string[]>>) => {
    setPosition((prevPositions) => [...prevPositions, e]);
  }

  return(
    <div className='MainCotainer'>
      <div className='background'></div>
      <TitleBoard
        rangeValueX={rangeValueX}
        rangeValueY={rangeValueY}
        onRangeChange={handleRangeChange}
      />
      <Board
        width={rangeValueX * 4 || 1}
        height={rangeValueY * 4 || 1}
      />
      <ComandLine
        width={rangeValueX * 4 || 1}
        height={rangeValueY * 4 || 1}
        addRover={(value:string) => handlePositions(value,setNumberPositionR)}
        addRouteRover={(value:string) => handlePositions(value,setRouteRovers)}
        numberRobers={numberPositionR}
      />
      <RoversPositions
        width={rangeValueX * 4 || 1}
        height={rangeValueY * 4 || 1}
        numberRovers={numberPositionR}
        routeRovers={routeRovers}
      /> ({numberPositionR.length > 0})
    </div>
  )
}

export default Body
