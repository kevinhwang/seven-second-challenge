import React, {ChangeEvent} from 'react'

import {Checkbox, FormControlLabel, Grid, TextField, Typography} from '@material-ui/core'
import {State, useState} from '@hookstate/core'
import {AppState} from '../../state'

export interface SettingsProps {
  readonly appStateRef: State<AppState>
}

export default function Settings({appStateRef}: SettingsProps) {
  const settingsState = useState(appStateRef.settings)

  const challengeDurationSec = settingsState.challengeDurationMs.get() / 1000

  return <Grid container direction='column' alignContent='center' spacing={4}>
    <Grid item>
      <Typography variant='h1'>
        Settings
      </Typography>
    </Grid>
    <Grid item>
      <TextField
        label='Seconds'
        variant='outlined'
        value={challengeDurationSec || ''}
        onChange={
          (event: ChangeEvent<HTMLTextAreaElement>) => settingsState.challengeDurationMs.set(parseFloat(event.currentTarget.value) * 1000)
        } />
    </Grid>
    <Grid item>
      <FormControlLabel
        control={
          <Checkbox
            checked={settingsState.snowing.get()}
            onChange={(event: ChangeEvent<HTMLInputElement>) => settingsState.snowing.set(() => event.currentTarget.checked)} />
        }
        label='Snowing ❄️'
      />

    </Grid>
  </Grid>
}
