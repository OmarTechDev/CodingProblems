import { useState } from "react"
import { ComandLineProps } from "./Interfaces"

import rover from '../../assets/roversFunctional.jpg'

function verifyFormatInitial(inputString:string): boolean {
  const regex = /^\d+\s\d+\s[NSWE]$/;

  if (regex.test(inputString)) {
    return true
  }
  return false
}

function commandFormat(cadena: string): boolean {
  const regex = /^[LMR]+$/

  return regex.test(cadena);
}

export const ComandLine: React.FC<ComandLineProps> = ({ width, height, addRover, addRouteRover, numberRobers }) => {
  const name = `Ax-00${numberRobers.length+1}`

  const [initialPosition, setInitialPosition] = useState('');
  const [commandLineInput, setCommandLineInput] = useState('');
  //const [pivot, setPivot] = useState(false)
  const positions = initialPosition.split(' ')
  let realWidth = 1000
  let realHeight = 1000
  if(width === 1) {
    realWidth = 0
  } else { realWidth= width}
  if(height === 1) {
    realHeight = 0
  } else {realHeight = height}

  const handleSubmit = () => {

    if(verifyFormatInitial(initialPosition) &&
      commandFormat(commandLineInput) &&
      (parseInt(positions[0]) <= realWidth) &&
      (parseInt(positions[1]) <= realHeight))
      {

        addRover(initialPosition)
        addRouteRover(commandLineInput)
        setInitialPosition('')
        setCommandLineInput('')
    }
    else{
      alert('The coordInates in the Command Line are not in the allowed Format or your cordindates are out of range')
      setInitialPosition('')
      setCommandLineInput('')
    }
  }

  return(
    <div className="cardA text-bg-dark mb-3">
      <div className="row g-0">
        <div className="col-md-4">
          <img src={rover} className="img-fluid rounded-start" alt="roverRepresent"/>
        </div>
        <div className="col-md-8">
          <div className="card-bodyA">
            <h5 className="card-title">Rovers '{name}' Command Line</h5><br/>
            <div className="mb-3">
              <label htmlFor="formGroupExampleInput" className="form-label">Initial Position:</label>
              <input
                type="text"
                className="form-control"
                id="formGroupExampleInput"
                value={initialPosition}
                onChange={(e) => setInitialPosition(e.target.value)}
                placeholder={`Example: 5 5 N  ||  Max ${width - 1} , ${height - 1}`}
              /><br/>
              <label htmlFor="formGroupExampleInput" className="form-label">Command Line Input:</label>
              <input
                type="text"
                className="form-control"
                id="formGroupExampleInput"
                value={commandLineInput}
                placeholder={`Example: LMLMLMLMRRM`}
                onChange={(e) => setCommandLineInput(e.target.value)}
              /><br/>
              <button className="btn btn-primary" onClick={handleSubmit}>Send</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
