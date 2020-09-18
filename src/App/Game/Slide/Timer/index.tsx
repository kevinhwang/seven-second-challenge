import {Box, CircularProgress, Typography} from '@material-ui/core'
import React, {useEffect, useState} from 'react'

export interface TimerProps {
  readonly msMax: number
  readonly onMsLeftChange?: {(secondsLeft: number): void}
}

export default function Timer({msMax, onMsLeftChange}: TimerProps) {
  const [msLeft, setMsLeft] = useState(msMax)

  useEffect(() => {
    if (msLeft <= 0) {
      return
    }
    const timer = setInterval(() => {
      const newMsLeft: number = Math.max(msLeft - 100, 0)
      setMsLeft(newMsLeft)
      onMsLeftChange && onMsLeftChange(newMsLeft)

      if (newMsLeft <= 0) {
        clearInterval(timer)
      }
    }, 100)
    return () => {
      clearInterval(timer)
    }
  }, [msLeft, onMsLeftChange])

  return <Box position='relative' display='inline-flex'>
    <CircularProgress size='15rem' variant='static' value={msLeft / msMax * 100} />
    <Box
      top={0}
      left={0}
      bottom={0}
      right={0}
      position='absolute'
      display='grid'
      alignItems='center'
      justifyContent='center'>
      <Typography variant='h1' component='div' color='textSecondary'>
        {msLeft / 1000}
      </Typography>
    </Box>
  </Box>
}
