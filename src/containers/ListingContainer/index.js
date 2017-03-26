/**
 * Created by martinwheeler on 24/3/17.
 */
import React, {Component} from "react";
import {connect} from "react-redux";
import {GridList, GridTile} from "material-ui/GridList";
import Masonry from "react-masonry-component";
import Waypoint from "react-waypoint";
import TextField from "material-ui/TextField";
import {attemptFetchCharacters, attemptFetchCharacterById} from "../../actions/characters";
import CharacterCard from "../../components/CharacterCard";
import {browserHistory} from 'react-router';
import RefreshIndicator from 'material-ui/RefreshIndicator';

const styles = {
  root: {
    padding: 20,
  },
  gridList: {},
  gridItem: {},
  listings: {},
  loading: {
    display: 'flex',
    justifyContent: 'center'
  },
  refresh: {
    display: 'inline-block',
    position: 'relative',
    margin: '100px 0'
  }
};

const amountToLoad = 20;

class ListingContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      colSize: 4,
      characters: [],
      loading: "loading"
    };
    this.amountToOffset = 0;
  }

  componentWillMount() {
    this.props.attemptFetchCharacters({limit: amountToLoad});
  }

  componentDidUpdate(prevProps, prevState) {

    const {characters} = this.state;

    const {
      data,
      attemptingFetch,
      fetchSuccess,
      fetchFail
    } = this.props;

    if (prevProps.attemptingFetch && !attemptingFetch) {
      this.setState({loading: 'ready'});
    } else if (!prevProps.attemptingFetch && attemptingFetch) {
      this.setState({loading: 'loading'});
    }

    if (prevProps.attemptingFetch && !attemptingFetch && fetchSuccess) {
      this.amountToOffset += data.results.length;
      this.setState({characters: [...characters, ...data.results]});
    }

    if (prevProps.attemptingFetch && !attemptingFetch && fetchFail) {
      console.log(data, 'fail')
    }

  }

  loadMore = () => {
    this.props.attemptFetchCharacters({limit: amountToLoad, offset: this.amountToOffset});
  };

  navigateToId = (id) => {
    browserHistory.push(`/character/${id}`);
    // this.props.attemptFetchCharacterById({id: id});
  };

  render() {
    const {characters, loading} = this.state;
    const self = this;

    return (
      <div style={styles.root}>
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
            <Masonry
              updateOnEachImageLoad={true}
            >
              {characters.map((character, key) => (
                <CharacterCard key={key} character={{...character, view: self.navigateToId}}/>
              ))}
            </Masonry>
            <Waypoint topOffset="60%" onEnter={() => this.loadMore()}/>
            <div style={styles.loading}>
              <RefreshIndicator
                size={50}
                left={0}
                top={0}
                loadingColor="#FF9800"
                status={loading}
                style={styles.refresh}
              />
            </div>
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