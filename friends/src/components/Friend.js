import React from 'react';
import {
    Card,
    CardActionArea,
    Typography,
    CardContent,
    CardActions,
    Button,
    makeStyles
} from '@material-ui/core'

const useStyles = makeStyles({
    root: {
      maxWidth: "100%",
      "& span.MuiTypography-subtitle1": {
        marginLeft: 10,
        color: "rgba(0, 0, 0, 0.5)"
      }
    },
  });

function Friend(props) {
    const classes = useStyles();
    return (
        <Card className={classes.root}>
            <CardActionArea>
                <CardContent>
                <Typography gutterBottom variant="h6" component="h2">
                    {props.friend.name}
                    <Typography gutterBottom variant="subtitle1" component="span">
                        ( Age {props.friend.age} )
                    </Typography>
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                    {props.friend.email}
                </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button size="small" color="primary" onClick={() => { props.openAddDialog(props.friend)}}>
                    Update Info
                </Button>
                <Button size="small" color="primary" onClick={() => {props.deleteFriend(props.friend.id)}}>
                    Delete Friend
                </Button>
            </CardActions>
        </Card>
    )
    
}

export default Friend