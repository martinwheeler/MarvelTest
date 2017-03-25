/**
 * Created by martinwheeler on 25/3/17.
 */
import React, { Component } from 'react';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import Paper from 'material-ui/Paper';
import FlatButton from 'material-ui/FlatButton';

const style = {
  paper: {},
  card: {
    cursor: 'pointer',
    margin: 20,
    width: 216
  }
};

export default class Character extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    const { character } = this.props;

    return (
      <Card style={style.card}>
        <Paper zDepth={2} >
          <CardMedia onTouchTap={() => character.view(character.id)}>
            <img src={`
              ${character.thumbnail.path}/portrait_incredible.${character.thumbnail.extension}
            `} />
          </CardMedia>
          <CardTitle title={character.name} subtitle={''} onTouchTap={() => character.view(character.id)} />
          <CardText onTouchTap={() => character.view(character.id)}>
            {character.description}
          </CardText>
          <CardActions>
            <FlatButton label="Read More" onTouchTap={() => console.log('this')} />
          </CardActions>
        </Paper>
      </Card>
    )
  }

}