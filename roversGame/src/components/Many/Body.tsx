import React, { useState } from 'react'
import { Logic } from '../Principal/Logic';

import './Body.css'

function verifyFormatSize(inputString:string): boolean {
  const regex = /^\d+\s\d+$/;

  if (regex.test(inputString)) {
    return true
  }
  return false
}

const BodyMany: React.FC = () => {
  const [lines, setLines] = useState<string[]>([])
  const [currentLine, setCurrentLine] = useState('')
  const [roverPosition, setRoverPosition] = useState('')
  const [roverDirections, setRoverDirections] = useState('')
  const [results, setResult] = useState<string[]>([])

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCurrentLine(event.target.value)
    if(lines.length>2 && lines.length%2 === 1) {
      setRoverPosition(lines[lines.length-2])
      setRoverDirections(lines[lines.length-1])
    }
    else {
      setRoverPosition('')
      setRoverDirections('')
    }

    if(verifyFormatSize(lines[0]) && roverPosition !=='' && roverDirections !==''){
      const pivot = lines[0].split(" ")
      const realSize = `${parseInt(pivot[0]) + 1} ${parseInt(pivot[1]) + 1}`
      if (currentLine === ""){
        setResult((previous) => [...previous,Logic(roverPosition,roverDirections,realSize)])
      }
    }
    else if(lines.length>2 && lines.length%2 === 1 && roverPosition !=='' && roverDirections !==''){
      alert('The data is not in the correct format, the page is going to reload maybe')
      window.location.reload();
    }
  };

  const handleEnterKey = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter') {
      setLines((prevLines) => [...prevLines, currentLine]);
      setCurrentLine('');
    }
  };

  return (
    <div>
      <textarea
        value={currentLine}
        onChange={handleInputChange}
        onKeyDown={handleEnterKey}
        rows={5}
        cols={40}
      />
      <div>
        <h3>Líneas ingresadas:</h3>
        <ul>
          {lines.map((line, index) => (
            <li key={index}>{line}</li>
          ))}
        </ul>
      </div><br/>
      <div className='ContainerResults'>
        <h2>Results</h2>
        <ul>
          {results.map((result, index) => (
            <li key={index}>{result}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default BodyMany;
