import React, {ReactNode, useState} from 'react'
import {AppBar, createStyles, IconButton, makeStyles, Theme, Toolbar, Typography} from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import NavDrawer from './NavDrawer'

export interface HeaderBarProps {
  readonly title?: ReactNode
  readonly children?: ReactNode
}

const useStyles = makeStyles(
  (theme: Theme) => createStyles({
    drawer: {
      width: 250
    },
    drawerHeader: theme.mixins.toolbar,
    title: {
      display: 'none',
      [theme.breakpoints.up('sm')]: {
        display: 'block'
      }
    }
  })
)

export default function HeaderBar({title, children}: HeaderBarProps) {
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false)
  const classes = useStyles()

  return <AppBar position='sticky'>
    <NavDrawer title={title} open={drawerOpen} onOpen={() => setDrawerOpen(true)} onClose={() => setDrawerOpen(false)} />
    <Toolbar>
      <IconButton
        onClick={() => setDrawerOpen(true)}
        edge='start'
        color='inherit'
        aria-label='open drawer'>
        <MenuIcon />
      </IconButton>
      <Typography variant='h6' className={classes.title} noWrap>
        {title}
      </Typography>
      {children}
    </Toolbar>
  </AppBar>
}
