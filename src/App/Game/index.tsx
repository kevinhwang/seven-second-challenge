import React, {useCallback, useEffect, useState} from 'react'
import {AppState, Team} from '../../state'
import {
  createStyles,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  makeStyles,
  MenuItem,
  TextField,
  Theme,
  Typography,
  useTheme
} from '@material-ui/core'
import RadioButtonUncheckedOutlinedIcon from '@material-ui/icons/RadioButtonUncheckedOutlined'
import StarIcon from '@material-ui/icons/Star'
import Slide from './Slide'
import range from 'lodash/range'
import {invertIfLowContrast} from './colors/color-utils'

export interface GameProps {
  readonly appState: AppState
}

const useStyles = makeStyles(
  (theme: Theme) => createStyles({
    teamMembersListRoot: {
      backgroundColor: theme.palette.background.paper
    }
  })
)

interface PlayerInfo {
  readonly name: string
  readonly team: string
  readonly teamColor: string
}

function* orderPlayers(teams: Team[], start: number = 0, limit?: number): Generator<PlayerInfo> {
  const numTeams: number = teams.length
  const positions: number[] = new Array(numTeams).fill(Math.floor(start / numTeams))
  range(start % numTeams).forEach(i => ++positions[i])

  let i = start

  for (; limit === undefined || i - start < limit; ++i) {
    const team: Team = teams[i % numTeams]
    const pos: number = positions[i % numTeams]++ % team.members.length

    yield {
      name: team.members[pos],
      team: team.name,
      teamColor: team.color
    }
  }

  return i - start
}

enum SlideMode {
  PRE, STARTED
}

export default function Game({appState: {gameData: {challenges}, settings: {teams, challengeDurationMs}}}: GameProps) {
  const [index, setIndex] = useState<number>(0)
  const [slideMode, setSlideMode] = useState<SlideMode>(SlideMode.PRE)

  const handleKeyPress = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') {
        setSlideMode(SlideMode.PRE)

        if (index > 0) {
          setIndex(index - 1)
        }
      } else if (event.key === 'ArrowRight') {
        if (slideMode === SlideMode.PRE) {
          setSlideMode(SlideMode.STARTED)
        } else if (index < challenges.length - 1) {
          setSlideMode(SlideMode.PRE)
          setIndex(index + 1)
        }
      }
    },
    [index, setIndex, slideMode, setSlideMode, challenges.length])

  useEffect(
    () => {
      document.addEventListener('keydown', handleKeyPress)

      return () => document.removeEventListener('keydown', handleKeyPress)
    },
    [index, slideMode, handleKeyPress]
  )

  const totalPlayers: number = teams.reduce((sum, t) => sum + t.members.length, 0)

  const [currentPlayer, ...rest] = orderPlayers(teams, index, Math.min(totalPlayers, challenges.length - index))
  const teamColor = currentPlayer.teamColor

  const {challenge, rules = {showName: true}} = challenges[index]


  const theme = useTheme()

  const styles = useStyles()

  return <div>
    <Grid container justify='center'>
      <Grid item>
        <TextField
          select
          label="#"
          onChange={event => setIndex(event.target.value as unknown as number)}
          value={index}>
          {
            challenges.map(
              (_, i) => (
                <MenuItem key={`slide-choice-${i}`} value={i}>
                  {i + 1}
                </MenuItem>
              )
            )
          }
        </TextField>
      </Grid>
    </Grid>
    <div>
      {
        slideMode === SlideMode.PRE ? <Grid container justify='center'>
            <Grid item xs={8} className={styles.teamMembersListRoot}>
              <List subheader={
                <ListSubheader>
                  Next Up
                </ListSubheader>
              }>
                <ListItem button onClick={() => setSlideMode(SlideMode.STARTED)}>
                  <ListItemIcon>
                    <StarIcon htmlColor={currentPlayer.teamColor} />
                  </ListItemIcon>
                  <ListItemText primary={currentPlayer.name} />
                </ListItem>
              </List>
              <Divider />
              <List subheader={
                <ListSubheader>
                  Coming Up
                </ListSubheader>
              }>
                {
                  rest.slice(0, 3 * teams.length).map(({name, teamColor}: PlayerInfo, i) => <ListItem
                      key={`nextup-${i}`} button
                      onClick={() => setIndex(index + i + 1)}>
                      <ListItemIcon>
                        <RadioButtonUncheckedOutlinedIcon htmlColor={teamColor} />
                      </ListItemIcon>
                      <ListItemText primary={name} />
                    </ListItem>
                  )
                }
              </List>
            </Grid>
          </Grid>
          : <div>
            <Typography variant='h1' align='center' style={{
              backgroundColor: teamColor,
              color: invertIfLowContrast(theme.palette.text.primary, teamColor)
            }}>
              {rules.showName ? currentPlayer.name : '·'}
            </Typography>
            <Slide timerMs={challengeDurationMs}>
              {challenge}
            </Slide>
          </div>
      }
    </div>
  </div>
}
