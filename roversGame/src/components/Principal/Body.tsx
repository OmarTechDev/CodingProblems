import { useState, ChangeEvent, useEffect} from 'react'
import TitleBoard from './Title'
import Board from './Board'
import { Logic } from './Logic'
import { ComandLine } from './CommandLine'
import { RoversPositions } from './RoversMovement'
import { ResultProps } from "./Interfaces"

import './Body.css'

const GraphicalResult: React.FC<ResultProps> = ({numberRovers, commands, result}) => {
  const name = `Ax-00${numberRovers.length}`
  return(
    <div className="cardR text-bg-success mb-3" style={{ maxWidth: '18rem' }}>
      <div className="card-header">Graphical Solution</div>
      <div className="card-body">
        <h5 className="card-title">Rovers '{name}'</h5>
        <p className="card-text">
          Initial Position: {numberRovers[0]} <br/>
          Commands: {commands[0]} <br/>
          Final Position (Graphical): [ '{result}' ]
        </p>
      </div>
    </div>
  )
}

const LogicResult: React.FC<ResultProps> = ({numberRovers, commands, result}) => {
  const name = `Ax-00${numberRovers.length}`
  return(
    <div className="cardL text-bg-success mb-3" style={{ maxWidth: '18rem' }}>
      <div className="card-header">Real Solution</div>
      <div className="card-body">
        <h5 className="card-title">Rovers '{name}'</h5>
        <p className="card-text">
          Initial Position: {numberRovers[0]} <br/>
          Commands: {commands[0]} <br/>
          Final Position (Graphical): [ '{result}' ]
        </p>
      </div>
    </div>
  )
}

function Body() {
  const [rangeValueX, setRangeValueX] = useState(0)
  const [rangeValueY, setRangeValueY] = useState(0)
  const [numberPositionR, setNumberPositionR] = useState<string[]>([])
  const [routeRovers, setRouteRovers] = useState<string[]>([])
  const [arrivedRovers, setArrivedRovers] = useState('')
  const [logicResult, setLogicResult] = useState('')

  const size = `${rangeValueX * 4 || 1} ${rangeValueY * 4 || 1}`

  useEffect(() => {
    setLogicResult(Logic(numberPositionR[0]||"",routeRovers[0]||"",size||""))
  }, [routeRovers])

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

  const handleResults = (e:string) => {
    setArrivedRovers(e)
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
        addComplete={(value:string) => handleResults(value)}
      />
      <GraphicalResult
        numberRovers={numberPositionR}
        commands={routeRovers}
        result={arrivedRovers}
      />
      <LogicResult
        numberRovers={numberPositionR}
        commands={routeRovers}
        result={logicResult}
      />
    </div>
  )
}

export default Body
