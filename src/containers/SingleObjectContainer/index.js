/**
 * Created by martin on 25/03/2017.
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { attemptFetchCharacterById } from '../../actions/characters';
import CharacterDetailed from '../../components/CharacterDetailed';
import Notifications from 'react-notification-system-redux';

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
      character: undefined
    }
  }

  componentWillMount() {
    this.props.attemptFetchCharacterById({id: this.props.viewId});
  }


  handleClick = () => {
    this.context.store.dispatch(
      Notifications.success(notificationOpts)
    );
  };

  componentDidUpdate(prevProps) {

    const {
      data,
      attemptingFetch,
      fetchSuccess,
      fetchFail
    } = this.props;

    if (prevProps.attemptingFetch && !attemptingFetch) {
      if (fetchSuccess) {
        this.setState({character: data.results[0]});
      }
      if (fetchFail) {

      }
    }

  }

  render() {
    return  <CharacterDetailed character={this.state.character} onItemClick={this.handleClick}/>
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
    attemptFetchCharacterById: (payload) => dispatch(attemptFetchCharacterById(payload))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(SingleObjectContainer);