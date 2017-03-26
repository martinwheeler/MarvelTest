import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import MenuItem from 'material-ui/MenuItem';
import { indigo500 } from 'material-ui/styles/colors';
import { connect } from 'react-redux';
import Drawer from 'material-ui/Drawer';
import ListingContainer from './containers/ListingContainer';
import SingleObjectContainer from './containers/SingleObjectContainer';
import { browserHistory } from 'react-router';

const styles = {
  body: {
    margin: 20
  }
};

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  handlePageChange = (page) => {
    this.setState({ currentPage: page, open: false });

    browserHistory.push(`/${page.toLowerCase()}`);
  };

  render() {
    const appBarStyles = {
      backgroundColor: indigo500
    };

    return (
      <MuiThemeProvider>
        <div>
          <Drawer
            open={this.state.open}
            docked={false}
            onRequestChange={(open) => this.setState({ open })}
          >
            <MenuItem
              onTouchTap={(e) => this.handlePageChange(e.target.textContent)}
            >
              Characters
            </MenuItem>
            <MenuItem
              onTouchTap={(e) => this.handlePageChange(e.target.textContent)}
            >
              Comics
            </MenuItem>
            <MenuItem
              onTouchTap={(e) => this.handlePageChange(e.target.textContent)}
              disabled={true}
            >
              Creators
            </MenuItem>
            <MenuItem
              onTouchTap={(e) => this.handlePageChange(e.target.textContent)}
              disabled={true}
            >
              Events
            </MenuItem>
            <MenuItem
              onTouchTap={(e) => this.handlePageChange(e.target.textContent)}
              disabled={true}
            >
              Series
            </MenuItem>
            <MenuItem
              onTouchTap={(e) => this.handlePageChange(e.target.textContent)}
              disabled={true}
            >
              Stories
            </MenuItem>
          </Drawer>
          <AppBar
            title="Marvel"
            onLeftIconButtonTouchTap={() => this.setState({ open: !this.state.open })}
            style={appBarStyles}
          />
          {this.renderContent()}
        </div>
      </MuiThemeProvider>
    )
  }

  renderContent = () => {
    const { params } = this.props;

    if (params.type && params.typeId) {
      return <SingleObjectContainer currentView={params.type} viewId={params.typeId} />
    }

    if (params.type && !params.typeId) {
      return <ListingContainer currentView={params.type} />
    }

    return <div style={styles.body} >Please chose an option from the menu.</div>
  }

}

const mapStateToProps = (state, ownProps) => {
  return {}
};

export default connect()(App);