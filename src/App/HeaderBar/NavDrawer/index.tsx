import React, {ReactNode} from 'react'
import {Divider, List, ListItem, ListItemIcon, ListItemText, SwipeableDrawer} from '@material-ui/core'
import EditIcon from '@material-ui/icons/Edit'
import GitHubIcon from '@material-ui/icons/GitHub'
import HomeIcon from '@material-ui/icons/Home'
import PlayIcon from '@material-ui/icons/PlayArrow'
import SettingsIcon from '@material-ui/icons/Settings'
import TimerIcon from '@material-ui/icons/Timer'
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles'
import {Link} from 'react-router-dom'

export interface NavDrawerProps {
  readonly title?: ReactNode
  readonly open: boolean
  readonly onOpen: React.ReactEventHandler
  readonly onClose: React.ReactEventHandler
}

const useStyles = makeStyles(
  (theme: Theme) => createStyles({
    drawer: {
      width: 250
    },
    drawerHeader: theme.mixins.toolbar
  })
)

export default function NavDrawer({title = '', open, onOpen, onClose}: NavDrawerProps) {
  const classes = useStyles()
  return <SwipeableDrawer open={open} onOpen={onOpen} onClose={onClose}>
    <div className={classes.drawer} role='presentation'>
      <div className={classes.drawerHeader}>
        <List>
          <ListItem>
            <ListItemIcon>
              <TimerIcon />
            </ListItemIcon>
            <ListItemText primary={title} />
          </ListItem>
        </List>
      </div>
      <Divider />
      <List component='nav' onClick={onClose}>
        <ListItem button component={Link} to='/'>
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary='Home' />
        </ListItem>
        <ListItem button component={Link} to='/edit'>
          <ListItemIcon>
            <EditIcon />
          </ListItemIcon>
          <ListItemText primary='Edit' />
        </ListItem>
        <ListItem button component={Link} to='/play'>
          <ListItemIcon>
            <PlayIcon />
          </ListItemIcon>
          <ListItemText primary='Play' />
        </ListItem>
        <ListItem button component={Link} to='/settings'>
          <ListItemIcon>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText primary='Settings' />
        </ListItem>
      </List>
      <Divider />
      <List component='nav' onClick={onClose}>
        <ListItem button component='a' href='https://github.com/kevinhwang/seven-second-challenge'>
          <ListItemIcon>
            <GitHubIcon />
          </ListItemIcon>
          <ListItemText primary='GitHub' />
        </ListItem>
      </List>
    </div>
  </SwipeableDrawer>
}
