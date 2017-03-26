/**
 * Created by martinwheeler on 26/3/17.
 */
import React, {Component} from "react";
import Avatar from "material-ui/Avatar";
import Divider from "material-ui/Divider";
import {Tabs, Tab} from "material-ui/Tabs";

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
  }
};

export default class CharacterDetailed extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    const {character} = this.props;

    console.log(character);

    return (
      <div style={styles.root}>
        { character &&
        <div>
          <div style={styles.headerWrapper}>
            <Avatar
              size={120}
              src={`
              ${character.thumbnail.path}/portrait_fantastic.${character.thumbnail.extension}
            `}
            />
            <h2 style={styles.title.large}>{character.name}</h2>
            <h4 style={styles.title.small}>Last modified {character.modified}</h4>

            <Tabs style={styles.tabsWrapper} tabItemContainerStyle={styles.tabWrapper}
                  inkBarStyle={styles.inkBar} contentContainerStyle={styles.contentContainer}>
              <Tab label="Comics" style={styles.tab}>
                {character.comics.items.map((comic) => (
                  <div onTouchTap={this.props.onItemClick}>
                    {comic.name}
                  </div>
                ))}
              </Tab>
              <Tab label="Series" style={styles.tab}>
                {character.series.items.map((serie) => (
                  <div>
                    {serie.name}
                  </div>
                ))}
              </Tab>
              <Tab label="Stories" style={styles.tab}>
                {character.stories.items.map((story) => (
                  <div>
                    {story.name}
                  </div>
                ))}
              </Tab>
            </Tabs>

            <Divider style={styles.divider}/>
          </div>
        </div>

        }
      </div>

    )
  }

}