/**
 * Created by martin on 25/03/2017.
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';

class SingleObjectContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    return (
      <div>
        Single Object by ID :D
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {

  }
};

const mapDispatchToProps = (dispatch) => {
  return {

  }
};

export default connect(mapStateToProps, mapDispatchToProps)(SingleObjectContainer);