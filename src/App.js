import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import { indigo500 } from 'material-ui/styles/colors';
import { connect } from 'react-redux';
import Drawer from 'material-ui/Drawer';
import ListingContainer from './containers/ListingContainer';
import SingleObjectContainer from './containers/SingleObjectContainer';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
    this.currentComponent = undefined;
  }

  handlePageChange = (page) => {
    this.setState({ currentPage: page, open: false });
  };

  getCurrentComponent = () => {
    const { params } = this.props;

    switch (params.type) {
      case 'character':

        break;

      case '':
        break;
    }

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
            >
              Creators
            </MenuItem>
            <MenuItem
              onTouchTap={(e) => this.handlePageChange(e.target.textContent)}
            >
              Events
            </MenuItem>
            <MenuItem
              onTouchTap={(e) => this.handlePageChange(e.target.textContent)}
            >
              Series
            </MenuItem>
            <MenuItem
              onTouchTap={(e) => this.handlePageChange(e.target.textContent)}
            >
              Stories
            </MenuItem>
          </Drawer>
          <AppBar
            title="Marvel"
            onLeftIconButtonTouchTap={() => this.setState({ open: !this.state.open })}
            iconElementRight={
              <IconMenu
                iconButtonElement={
                  <IconButton><MoreVertIcon /></IconButton>
                }
                targetOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
              >
                <MenuItem primaryText="Refresh" />
                <MenuItem primaryText="Help" />
                <MenuItem primaryText="Sign out" />
              </IconMenu>
            }
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
      return <SingleObjectContainer currentView={params.type} viewId={params.typeId}/>
    }

    return (
      <ListingContainer/>
    )
  }

}

const mapStateToProps = (state, ownProps) => {
  return {

  }
};

export default connect()(App);