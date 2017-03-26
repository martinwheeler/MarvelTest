/**
 * Created by martinwheeler on 25/3/17.
 */
import React, { Component } from "react";
import { Card, CardActions, CardMedia, CardTitle, CardText } from "material-ui/Card";
import Paper from "material-ui/Paper";
import FlatButton from "material-ui/FlatButton";

const style = {
  paper: {},
  card: {
    cursor: 'pointer',
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
  },
  wrapper: {
    margin: 20
  }
};

export default class MarvelCard extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    const { item } = this.props;

    return (
      <div style={style.wrapper} >
        <Card style={style.card} >
          <Paper zDepth={2} >
            <CardMedia style={style.image} onTouchTap={() => item.view(item.id)} >
              <img src={`
              ${item.thumbnail.path}/portrait_incredible.${item.thumbnail.extension}
            `} />
            </CardMedia>
            <CardTitle
              style={style.title}
              title={item.name || item.title}
              subtitle={''}
              onTouchTap={() => item.view(item.id)}
            />
            <CardText
              style={style.body}
              onTouchTap={() => item.view(item.id)}
            >
              {item.description}
            </CardText>
            <CardActions>
              <FlatButton label="Read More" onTouchTap={() => console.log('this')} />
            </CardActions>
          </Paper>
        </Card>
      </div>
    )
  }

}