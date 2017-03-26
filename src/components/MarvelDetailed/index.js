/**
 * Created by martinwheeler on 26/3/17.
 */
import React, { Component } from "react";
import Avatar from "material-ui/Avatar";
import Divider from "material-ui/Divider";
import { Tabs, Tab } from "material-ui/Tabs";
import Paper from 'material-ui/Paper';

const styles = {
  root: {
    margin: '20px auto'
  },
  container: {
    width: '85vw',
    margin: '0 auto'
  },
  headerWrapper: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column'
  },
  title: {
    large: {
      fontFamily: 'Oswald, Arial, sans-serif',
      margin: '10px 0',
      fontWeight: '500',
    },
    small: {
      fontFamily: 'Oswald, Arial, sans-serif',
      margin: '10px 0',
      fontWeight: '300',
    }
  },
  inkBar: {
    backgroundColor: 'deepskyblue',
    width: '100px'
  },
  tab: {
    backgroundColor: 'transparent',
    color: '#666',
    width: '100px'
  },
  tabsWrapper: {
    marginTop: '20px',
    width: '300px',
  },
  tabWrapper: {
    backgroundColor: 'transparent',
    color: '#785443',
    display: 'flex',
    justifyContent: 'center'
  },
  contentContainer: {
    width: '1200px',
    position: 'absolute',
    left: '50%',
    transform: 'translateX(-50%)',
    padding: '20px'
  },
  divider: {
    width: '100vw'
  },
  listItem: {
    padding: 20
  }
};

export default class MarvelDetailed extends Component {

  constructor(props) {
    super(props);
  }

  componentWillReceiveProps(newProps) {
    console.log('props', newProps)


  }

  renderTabs = () => {
    const { item, currentView } = this.props;

    switch (currentView) {
      default:
        return '';

      case 'comics':
        return (
          <Tabs style={styles.tabsWrapper} tabItemContainerStyle={styles.tabWrapper}
                inkBarStyle={styles.inkBar} contentContainerStyle={styles.contentContainer} >

            <Tab label="Characters" style={styles.tab} >
              <Paper zDepth={2} >
                {item.characters.items.map((character, key) => (
                  <div key={key} >
                    <div
                      onTouchTap={() => this.props.onItemClick('characters', character.resourceURI)}
                      style={styles.listItem}
                    >
                      {character.name}
                    </div>
                    <Divider/>
                  </div>
                ))}
              </Paper>
            </Tab>

            <Tab label="Creators" style={styles.tab} >
              <Paper zDepth={2} >
                {item.creators.items.map((creator, key) => (
                  <div key={key} >
                    <div onTouchTap={this.props.onItemClick} style={styles.listItem} >
                      {creator.name}
                    </div>
                    <Divider/>
                  </div>
                ))}
              </Paper>
            </Tab>

            <Tab label="Stories" style={styles.tab} >
              <Paper zDepth={2} >
                {item.stories.items.map((story, key) => (
                  <div key={key} >
                    <div onTouchTap={this.props.onItemClick} style={styles.listItem} >
                      {story.name}
                    </div>
                    <Divider/>
                  </div>
                ))}
              </Paper>
            </Tab>
          </Tabs>
        );

      case 'characters':
        return (
          <Tabs style={styles.tabsWrapper} tabItemContainerStyle={styles.tabWrapper}
                inkBarStyle={styles.inkBar} contentContainerStyle={styles.contentContainer} >

            <Tab label="Comics" style={styles.tab} >
              <Paper zDepth={2} >
                {item.comics.items.map((comic, key) => (
                  <div key={key} >
                    <div onTouchTap={() => this.props.onItemClick('comics', comic.resourceURI)}
                         style={styles.listItem} >
                      {comic.name}
                    </div>
                    <Divider/>
                  </div>
                ))}
              </Paper>
            </Tab>

            <Tab label="Series" style={styles.tab} >
              <Paper zDepth={2} >
                {item.series.items.map((standAlone, key) => (
                  <div key={key} >
                    <div onTouchTap={this.props.onItemClick} style={styles.listItem} >
                      {standAlone.name}
                    </div>
                    <Divider/>
                  </div>
                ))}
              </Paper>
            </Tab>

            <Tab label="Stories" style={styles.tab} >
              <Paper zDepth={2} >
                {item.stories.items.map((story, key) => (
                  <div key={key} >
                    <div onTouchTap={this.props.onItemClick} style={styles.listItem} >
                      {story.name}
                    </div>
                    <Divider/>
                  </div>
                ))}
              </Paper>
            </Tab>
          </Tabs>
        );
    }

  };

  render() {
    const { item } = this.props;

    return (
      <div style={styles.root} >
        { item &&
        <div>
          <div style={styles.headerWrapper} >
            <Avatar
              size={120}
              src={`
              ${item.thumbnail.path}/portrait_fantastic.${item.thumbnail.extension}
            `}
            />
            <h2 style={styles.title.large} >{item.name || item.title}</h2>
            <h4 style={styles.title.small} >Last modified {item.modified}</h4>

            {this.renderTabs()}

            <Divider style={styles.divider} />
          </div>
        </div>

        }
      </div>

    )
  }

}