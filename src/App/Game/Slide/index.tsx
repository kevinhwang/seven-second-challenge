import React, {ReactNode} from 'react'
import {Grid} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles'
import Timer from './Timer'

export interface SlideProps {
  readonly timerMs?: number
  readonly children?: ReactNode
}

const useStyles = makeStyles((theme) => ({
  content: {
    padding: theme.spacing(4),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    fontSize: '8rem'
  }
}))

export default function Slide({timerMs = 10000, children}: SlideProps) {
  const classes = useStyles()

  return <Grid container justify='center' alignItems='center' style={{minHeight: '75vh'}}>
    <Grid item xs={9}>
      <div className={classes.content}>
        {children}
      </div>
    </Grid>
    <Grid item xs={3}>
      <div className={classes.content}>
        <Timer msMax={timerMs} key={Math.random().toString(36)} />
      </div>
    </Grid>
  </Grid>
}
