/**
 * Created by martin on 25/03/2017.
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { attemptFetchCharacterById } from '../../actions/characters';
import { attemptFetchComicById } from '../../actions/comics';
import MarvelDetailed from '../../components/MarvelDetailed';
import { push } from 'react-router-redux';
import NotificationSystem from 'react-notification-system';

const notificationOpts = {
  // uid: 'once-please', // you can specify your own uid if required
  title: 'Hey, it\'s good to see you!',
  message: 'Now you can see how easy it is to use notifications in React!',
  position: 'tr',
  autoDismiss: 0,
  action: {
    label: 'Click me!!',
    callback: () => alert('clicked!')
  }
};

class SingleObjectContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      item: undefined
    }
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

  handleClick = (type, id) => {
    this.notifications.addNotification({
      message: `${type}, ${id}`,
      title: 'Coming soon!',
      level: 'info',
      autoDismiss: '5'
    });



    if (type && id) {
      id = id.split('/').pop();

      switch (type) {
        case 'characters':
        default:
          this.props.attemptFetchCharacterById({ id: id });
          break;
        case 'comics':
          this.props.attemptFetchComicById({ id: id });
          break;
      }
    }
  };

  componentDidUpdate(prevProps) {
    console.log('updated');

    const {
      data,
      attemptingFetch,
      fetchSuccess,
      fetchFail,
      currentView
    } = this.props;

    if (prevProps.currentView !== currentView) {
      console.log('update the item now!')
    }

    if (prevProps.attemptingFetch[ currentView ] && !attemptingFetch[ currentView ]) {
      if (fetchSuccess[currentView]) {
        this.setState({ item: data[ currentView ].results[ 0 ] });
      }
      if (fetchFail[currentView]) {
        console.log('fail')
      }
    }

  }

  render() {
    return (
      <div>
        <MarvelDetailed
          currentView={this.props.currentView}
          item={this.state.item}
          onItemClick={this.handleClick} />
        <NotificationSystem ref={(notifications) => this.notifications = notifications} />
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
    push: (payload) => dispatch(push(payload)),
    attemptFetchCharacterById: (payload) => dispatch(attemptFetchCharacterById(payload)),
    attemptFetchComicById: (payload) => dispatch(attemptFetchComicById(payload))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(SingleObjectContainer);