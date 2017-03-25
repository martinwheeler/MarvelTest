/**
 * Created by martinwheeler on 24/3/17.
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { GridList, GridTile } from 'material-ui/GridList';

import TextField from 'material-ui/TextField';

import { attemptFetchCharacters, attemptFetchCharacterById } from '../../actions/characters';

import Character from '../../components/Character';

const styles = {
  root: {
    padding: 20,
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  gridList: {

  },
  listings: {
    maxWidth: '50vw'
  },
};

class ListingContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      colSize: 4,
      characters: []
    };
  }

  componentWillMount() {
    this.props.attemptFetchCharacters({ limit: 50 });
  }

  componentDidUpdate(prevProps, prevState) {

    const {
      data,
      attemptingFetch,
      fetchSuccess,
      fetchFail
    } = this.props;

    if (prevProps.attemptingFetch && !attemptingFetch && fetchSuccess) {
      console.log(data, 'success');
      this.setState({ characters: data.results });
    }

    if (prevProps.attemptingFetch && !attemptingFetch && fetchFail) {
      console.log(data, 'fail')
    }

  }

  navigateToId = (id) => {
    this.props.attemptFetchCharacterById({id: id});
  };

  render() {
    const { characters } = this.state;
    const self = this;

    return (
      <div style={styles.root} >
        <GridList
          cols={12}
          cellHeight="auto"
        >
          <GridTile
            cols={12}
            rows={1}
          >
            <TextField
              hintText="3-D Man"
              floatingLabelText="Search"
            />
          </GridTile>

          <GridTile
            cols={12}
            rows={1}
            style={styles.listings}
          >
            <GridList
              cols={12}
              style={styles.gridList}
              cellHeight="auto"
            >
              {characters.map((character, key) => (
                <GridTile key={key} cols={this.state.colSize} >
                  <Character character={{...character, view: self.navigateToId}} />
                </GridTile>
              ))}
            </GridList>
          </GridTile>
        </GridList>
      </div>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    data: state.characters.data,
    attemptingFetch: state.characters.attemptingFetch,
    fetchSuccess: state.characters.fetchSuccess,
    fetchFail: state.characters.fetchFail
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    attemptFetchCharacters: (payload) => dispatch(attemptFetchCharacters(payload)),
    attemptFetchCharacterById: (payload) => dispatch(attemptFetchCharacterById(payload)),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(ListingContainer);