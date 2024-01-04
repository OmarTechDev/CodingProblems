import {ChangeEvent} from 'react'

export interface RoversProps {
  width: number;
  height: number;
  numberRovers: string[]
  routeRovers: string[]
}

export interface ComandLineProps {
  width: number;
  height: number;
  addRover: (e: string) => void;
  addRouteRover: (e: string) => void;
  numberRobers: string[]
}

export interface BoardProps {
  width: number;
  height: number;
}

export interface TitleBoardProps {
  rangeValueX: number;
  rangeValueY: number;
  onRangeChange: (e: ChangeEvent<HTMLInputElement>, identifier: 'X' | 'Y') => void;
}
