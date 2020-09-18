import {Persistence} from '@hookstate/persistence'
import {ReactNode} from 'react'

export interface Team {
  readonly name: string
  readonly members: string[]
  readonly color: string
}

export interface GameSettings {
  readonly challengeDurationMs: number
  readonly teams: Team[]
  readonly snowing: boolean
}

export interface ChallengeRules {
  readonly showName: boolean
}

export interface Challenge {
  readonly challenge: ReactNode
  readonly rules?: ChallengeRules
}

export interface GameData {
  readonly challenges: Challenge[]
}

export interface AppState {
  readonly settings: GameSettings
  readonly gameData: GameData
}

export const localStoragePersistence = Persistence('a8dee0a0-d412-45f5-b431-eb1ae6bd9ebc')


