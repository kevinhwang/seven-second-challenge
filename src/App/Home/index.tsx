import React from 'react'
import {Team} from '../../state'
import {Grid, List, ListItem, ListItemIcon, ListItemText, ListSubheader, Typography} from '@material-ui/core'
import RadioButtonUncheckedOutlinedIcon from '@material-ui/icons/RadioButtonUncheckedOutlined'

export interface HomeProps {
  readonly teams: Team[]
}

export default function Home({teams}: HomeProps) {
  return <Grid container direction='column' alignContent='center' spacing={4}>
    <Grid item>
      <Typography variant='h2'>Teams</Typography>
    </Grid>
    <Grid item>
      <Grid container spacing={4} justify='center'>
        {
          teams.map(
            ({name, members, color}, i) => <Grid item key={`team-${i}`}>
              <List subheader={
                <ListSubheader>
                  {name}
                </ListSubheader>
              }>
                {
                  members.map(
                    (memberName, j) => <ListItem key={`team-${i}-member-${j}`} button>
                      <ListItemIcon>
                        <RadioButtonUncheckedOutlinedIcon htmlColor={color} />
                      </ListItemIcon>
                      <ListItemText primary={memberName} />
                    </ListItem>
                  )
                }
              </List>
            </Grid>
          )
        }
      </Grid>
    </Grid>
  </Grid>
}
