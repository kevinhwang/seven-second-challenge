import {State, useState} from '@hookstate/core'
import '@hookstate/devtools'
import {createMuiTheme, CssBaseline, ThemeProvider} from '@material-ui/core'
import React from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Snowfall from 'react-snowfall'
import {AppState, Challenge, localStoragePersistence} from '../state'
import HeaderBar from './HeaderBar'
import Game from './Game'
import Edit from './Edit'
import Home from './Home'
import Settings from './Settings'


const theme = createMuiTheme({
  palette: {
    type: 'dark'
  }
})

const defaultChallenges: (string | Challenge)[] = [
  'What is the pythagorean theorem?',
  'Name 4 past US presidents',
  'Pretend you’re reviewing a BBC tutorial on how to make egg fried rice',
  'Name the number right before 1 trillion',
  'Name 3 primary colors',
  'Use the made-up word “beninging” in a sentence',
  'Name 3 things you find in an airport',
  'You’re writing a song about numbers. What are the lyrics?',
  'Name 4 colleges @ UCSD',
  'Name a famous, rotund rabbit',
  'Name 4 elements on the periodic table',
  'Say three words that rhyme',
  'What’s the hottest star in our solar system?',
  'Name 3 pokemon',
  'What is (19 + 19) × 2?',
  'Create a new dance move',
  'Name 4 different chess pieces',
  {
    challenge: 'Spell your full first name backwards',
    rules: {
      showName: false
    }
  },
  'Name 4 things that are orange',
  'Name 3 Chinese dishes',
  'Invent a new word and define it',
  'Name 3 types of doctors',
  'Name 3 red fruits',
  'Name 3 objects you find in a kitchen',
  'Pretend you’re on a roller coaster are mortally afraid of heights',
  'Name 3 foods that end with “y”',
  'Describe a chicken without using words',
  'Name 3 muscles in the human body',
  'Pretend you’re a talking tree being cut down'
]

export default function App() {
  const appState: State<AppState> = useState<AppState>({
    settings: {
      challengeDurationMs: 7000,
      teams: [
        {
          name: '🎄 Team Christmas Tree',
          members: ['Jeremiah Lin', 'Eric Jiang', 'Brian Lin', 'Nathan Ng'],
          color: '#00695f'
        },
        {
          name: '☃️ Team Snowman',
          members: ['Andrew Chan', 'Woen Lee', 'Moyang Wang', 'Kirk S', 'Paulos Liu'],
          color: '#fafafa'
        },
        {
          name: '🌶 Team Candy Cane',
          members: ['Young Hsu', 'Andrew Jabasa', 'Steven Lee'],
          color: '#ab003c'
        }
      ],
      snowing: true
    },
    gameData: {
      challenges: defaultChallenges.map((value: string | Challenge): Challenge => typeof value === 'string' ? {challenge: value} : value)
    }
  })
    .attach(localStoragePersistence)

  return <ThemeProvider theme={theme}>
    {
      appState.settings.snowing.get() ? <Snowfall /> : undefined
    }
    <CssBaseline>
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <HeaderBar title={`${appState.settings.challengeDurationMs.get() / 1000} Second Challenge`} />
        <Switch>
          <Route exact path='/'>
            <Home teams={appState.settings.teams.get()} />
          </Route>
          <Route path='/edit'>
            <Edit appStateRef={appState} />
          </Route>
          <Route path='/settings'>
            <Settings appStateRef={appState} />
          </Route>
          <Route path='/play'>
            <Game appState={appState.get()} />
          </Route>
        </Switch>
      </BrowserRouter>
    </CssBaseline>
  </ThemeProvider>
}
