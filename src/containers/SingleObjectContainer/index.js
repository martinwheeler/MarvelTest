/**
 * Created by martin on 25/03/2017.
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import NotificationSystem from 'react-notification-system';

import { attemptFetchCharacterById } from '../../actions/characters';
import { attemptFetchComicById } from '../../actions/comics';
import MarvelDetailed from '../../components/MarvelDetailed';

class SingleObjectContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      item: undefined,
    };
  }

  componentWillMount() {
    switch (this.props.currentView) {
      case 'characters':
      default:
        return this.props.attemptFetchCharacterById({ id: this.props.viewId });
      case 'comics':
        return this.props.attemptFetchComicById({ id: this.props.viewId });
    }
  }

  componentDidUpdate(prevProps) {
    const {
      data,
      attemptingFetch,
      fetchSuccess,
      fetchFail,
      currentView
    } = this.props;

    if (prevProps.currentView !== currentView) {
      // TODO: Update the component with the new data as we have changed the type
    }

    if (prevProps.attemptingFetch[ currentView ] && !attemptingFetch[ currentView ]) {
      if (fetchSuccess[currentView]) {
        this.setState({ item: data[ currentView ].results[ 0 ] });
      }
      if (fetchFail[currentView]) {
        this.notifications.addNotification({
          message: 'Sorry there seems to be a problem with your request!',
          title: 'Error',
          level: 'error',
          autoDismiss: '5',
        });
      }
    }
  }

  render() {
    return (
      <div>
        <MarvelDetailed
          currentView={this.props.currentView}
          item={this.state.item}
          onItemClick={this.handleClick}
        />
        <NotificationSystem ref={notifications => this.notifications = notifications} />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    data: {
      characters: state.characters.dataById,
      comics: state.comics.dataById,
    },
    attemptingFetch: {
      characters: state.characters.attemptingFetchById,
      comics: state.comics.attemptingFetchById,
    },
    fetchSuccess: {
      characters: state.characters.fetchSuccessById,
      comics: state.comics.fetchSuccessById,
    },
    fetchFail: {
      characters: state.characters.fetchFailById,
      comics: state.comics.fetchFailById,
    },
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    push: payload => dispatch(push(payload)),
    attemptFetchCharacterById: payload => dispatch(attemptFetchCharacterById(payload)),
    attemptFetchComicById: payload => dispatch(attemptFetchComicById(payload)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SingleObjectContainer);
