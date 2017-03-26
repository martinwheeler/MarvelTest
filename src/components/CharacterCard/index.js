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
  },
  title: {
    fontFamily: 'Oswald',
    fontWeight: '500'
  },
  body: {
    fontFamily: 'Oswald',
    fontWeight: '300'
  },
  image: {
    width: 216,
    height: 324
  }
};

export default class CharacterCard extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    const { character } = this.props;

    return (
      <Card style={style.card}>
        <Paper zDepth={2} >
          <CardMedia style={style.image} onTouchTap={() => character.view(character.id)}>
            <img src={`
              ${character.thumbnail.path}/portrait_incredible.${character.thumbnail.extension}
            `} />
          </CardMedia>
          <CardTitle
            style={style.title}
            title={character.name}
            subtitle={''}
            onTouchTap={() => character.view(character.id)}
          />
          <CardText
            style={style.body}
            onTouchTap={() => character.view(character.id)}
          >
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