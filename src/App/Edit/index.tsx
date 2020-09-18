import {chunk, shuffle} from 'lodash'
import React, {ChangeEvent} from 'react'
import {ChromePicker, ColorResult} from 'react-color'

import {Button, Grid, TextField, Typography} from '@material-ui/core'
import {State, useState} from '@hookstate/core'
import StopIcon from '@material-ui/icons/Stop'
import {AppState} from '../../state'

export interface EditProps {
  readonly appStateRef: State<AppState>
}

export default function Edit({appStateRef}: EditProps) {
  const teamsState = useState(appStateRef.settings.teams)
  const gameDataState = useState(appStateRef.gameData)

  return <Grid container direction='column' alignContent='center' spacing={4}>
    <Grid item>
      <Typography variant='h2'>Teams</Typography>
    </Grid>
    <Grid item>
      <Grid container spacing={4} justify='center'>
        {
          teamsState.map(
            (teamState, i) => {
              const {name, members, color} = teamState.get()

              return <Grid item key={`team-${i}`}>
                <Grid container direction='column' spacing={1}>
                  <Grid item>
                    <Grid container spacing={1} alignItems='flex-end'>
                      <Grid item>
                        <StopIcon style={{color}} />
                      </Grid>
                      <Grid item>
                        <TextField
                          label='Team Name'
                          value={name}
                          onChange={
                            (event: ChangeEvent<HTMLTextAreaElement>) => teamState.set(team => ({
                              ...team,
                              name: event.currentTarget.value
                            }))
                          } />
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item>
                    <TextField
                      label='Players'
                      multiline
                      fullWidth
                      variant='outlined'
                      value={members.join('\n')}
                      onChange={
                        (event: ChangeEvent<HTMLTextAreaElement>) => {
                          const newMembers: string[] = event.currentTarget.value.split('\n')
                          teamState.members.set(_ => newMembers)
                        }
                      }
                    />
                  </Grid>
                  <Grid item>
                    <ChromePicker
                      color={color}
                      onChange={
                        ({hex}: ColorResult) => teamState.set(team => ({...team, color: hex}))
                      } />
                  </Grid>
                  <Grid item>
                    <Button
                      variant='outlined'
                      onClick={
                        () => teamsState.set(teams => teams.filter((_, j) => j !== i))
                      }>
                      Delete
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            }
          )
        }
        <Grid item>
          <Button
            variant='outlined'
            onClick={
              () => teamsState.set(teams => [...teams, {name: 'New Team', members: [], color: '#fff'}])
            }>
            Add
          </Button>
        </Grid>
      </Grid>
    </Grid>
    <Grid item>
      <Typography variant='h2'>Players</Typography>
    </Grid>
    <Grid item>
      <Grid container direction='column' spacing={1}>
        <Grid item>
          <TextField
            label='Players'
            multiline
            fullWidth
            variant='outlined'
            value={teamsState.get().flatMap(({members}) => members).join('\n')}
            onChange={
              (event: ChangeEvent<HTMLTextAreaElement>) => {
                const newMembers: string[] = event.currentTarget.value.split('\n')
                const newTeams: string[][] = chunk(newMembers, Math.ceil(newMembers.length / teamsState.length))

                teamsState.forEach(
                  (teamState, i) => {
                    teamState.members.set(newTeams[i] ?? [])
                  }
                )
              }
            }
          />
        </Grid>
        <Grid item>
          <Button
            variant='outlined'
            onClick={
              () => {
                const teamMembers: string[] = teamsState.get()
                  .flatMap(t => t.members)
                const newTeams: string[][] = chunk(shuffle(teamMembers), Math.ceil(teamMembers.length / teamsState.get().length))
                teamsState.forEach(
                  (teamState, i) => {
                    teamState.members.set(newTeams[i] ?? [])
                  }
                )
              }
            }>
            Shuffle
          </Button>
        </Grid>
      </Grid>
    </Grid>
    <Grid item>
      <Grid container direction='column' spacing={1}>
        <Grid item>
          <Typography variant='h2'>Challenges</Typography>
        </Grid>
        <Grid item>
          <TextField
            label='Challenges'
            multiline
            fullWidth
            variant='outlined'
            value={gameDataState.challenges.get().map(({challenge}) => challenge).join('\n')}
            onChange={
              (event: ChangeEvent<HTMLTextAreaElement>) => gameDataState.challenges.set(() => event.currentTarget.value.split('\n').map(challenge => ({challenge})))
            }
          />
        </Grid>
      </Grid>
    </Grid>
  </Grid>
}
