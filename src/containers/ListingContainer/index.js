/**
 * Created by martinwheeler on 24/3/17.
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Masonry from 'react-masonry-component';
import Waypoint from 'react-waypoint';
import { push } from 'react-router-redux';
import RefreshIndicator from 'material-ui/RefreshIndicator';
import Measure from 'react-measure';
import NotificationSystem from 'react-notification-system';
import { attemptFetchCharacters } from '../../actions/characters';
import { attemptFetchComics } from '../../actions/comics';
import MarvelCard from '../../components/MarvelCard';

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
      items: [],
      loading: "loading",
      width: 0
    };
    this.amountToOffset = 0;
  }

  componentWillMount() {
    switch (this.props.currentView) {
      case 'characters':
      default:
        return this.props.attemptFetchCharacters({ limit: amountToLoad });
      case 'comics':
        return this.props.attemptFetchComics({ limit: amountToLoad });
    }
  }

  componentDidUpdate(prevProps, prevState) {

    const { items } = this.state;

    const {
      data,
      attemptingFetch,
      fetchSuccess,
      fetchFail,
      currentView
    } = this.props;

    // reset the view as we have changed what type of items to fetch
    if (prevProps.currentView !== currentView) {
      this.setState({ items: [] });
      this.amountToOffset = 0;
      this.loadMore();
    }

    // updating loading spinners state depending on current fetch status
    if (prevProps.attemptingFetch[ currentView ] && !attemptingFetch[ currentView ]) {
      this.setState({ loading: 'ready' });
      console.log('read')
    } else if (!prevProps.attemptingFetch[ currentView ] && attemptingFetch[ currentView ]) {
      this.setState({ loading: 'loading' });
      console.log('load')
    }

    // success fetch
    if (prevProps.attemptingFetch[ currentView ] && !attemptingFetch[ currentView ] &&
      fetchSuccess[ currentView ]) {
      this.amountToOffset += data[ this.props.currentView ].results.length;
      this.setState({ items: [ ...items, ...data[ this.props.currentView ].results ] });
    }

    // fail fetch
    if (prevProps.attemptingFetch[ currentView ] && !attemptingFetch[ currentView ] &&
      fetchFail[ currentView ]) {
      this.notifications.addNotification({
        message: 'Sorry there seems to be a problem with your request!',
        title: 'Error',
        level: 'error',
        autoDismiss: '5',
      });
    }

  }

  loadMore = () => {
    switch (this.props.currentView) {
      case 'characters':
      default:
        return this.props.attemptFetchCharacters({
          limit: amountToLoad,
          offset: this.amountToOffset
        });
      case 'comics':
        return this.props.attemptFetchComics({ limit: amountToLoad, offset: this.amountToOffset });
    }
  };

  navigateToId = (id) => {
    this.props.push(`/${this.props.currentView}/${id}`);
  };

  /*
   * Render everything in a masonry style layout.
   */
  render() {
    const { items, loading } = this.state;
    const self = this;

    let cardAmount = parseInt(this.state.width / 256);

    const dynamicWidth = {
      width: 'calc( 256px * ' + cardAmount + ' )',
      margin: '0 auto'
    };

    return (
      <div style={styles.root} >
        <Measure onMeasure={({ width }) => this.setState({ width: width })} >
          <div></div>
        </Measure>

        <Masonry
          updateOnEachImageLoad={true}
          style={dynamicWidth}
        >
          {items.map((item, key) => (
            <MarvelCard key={key} item={{ ...item, view: self.navigateToId }} />
          ))}
        </Masonry>

        <Waypoint topOffset="60%" onEnter={() => this.loadMore()} />

        <div style={styles.loading} >
          <RefreshIndicator
            size={50}
            left={0}
            top={0}
            loadingColor="#FF9800"
            status={loading}
            style={styles.refresh}
          />
        </div>
        <NotificationSystem ref={notifications => this.notifications = notifications} />
      </div>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    data: {
      characters: state.characters.data,
      comics: state.comics.data
    },
    attemptingFetch: {
      characters: state.characters.attemptingFetch,
      comics: state.comics.attemptingFetch
    },
    fetchSuccess: {
      characters: state.characters.fetchSuccess,
      comics: state.comics.fetchSuccess
    },
    fetchFail: {
      characters: state.characters.fetchFail,
      comics: state.comics.fetchFail
    }
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    push: payload => dispatch(push(payload)),
    attemptFetchCharacters: payload => dispatch(attemptFetchCharacters(payload)),
    attemptFetchComics: payload => dispatch(attemptFetchComics(payload)),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(ListingContainer);