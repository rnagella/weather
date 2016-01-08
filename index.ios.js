// API key - 7eaac056c1406731054889307f6b66cc
// import some code we need
var React = require('react-native');
var {
  StyleSheet,
  AppRegistry,
  View,
  Text,
  MapView
} = React;


var Api = require('./src/api');
// create a react component
var Weather = React.createClass({
  getInitialState: function () {
    return {
      pin: {
        latitude: 0,
        longitude: 0
      },
      city: '',
      temperature: '',
      description: ''
    };
  },
  render: function () {
    return <View style={styles.container}>
      <MapView
        annotations={[this.state.pin]} 
        onRegionChangeComplete={this.onRegionChangeComplete}
        style={styles.map}>
      </MapView>
      <View style={styles.textWrapper}>
        <Text style={styles.text}>
          {this.state.city}
        </Text>
        <Text style={styles.text}>
          {this.state.temperature}
        </Text>
        <Text style={styles.text}>
          {this.state.description}
        </Text>
      </View>
    </View>
  },
  onRegionChangeComplete: function (region) {
    console.log(region);

    this.setState({
      pin: {
        latitude: region.latitude,
        longitude: region.longitude
      }
    });

    Api(region.latitude, region.longitude)
      .then((data) => {
        console.log(data);
        this.setState(data);
      });
  }
});

// create styles for our components
var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: '#F5FCFF'
  },
  map: {
    flex: 2,
    marginTop: 30
  },
  textWrapper: {
    flex : 1,
    alignItems: 'center'
  },
  text: {
    fontSize: 30
  }
});

// show the react component on the screen
//one per application
AppRegistry.registerComponent('weather', () => Weather);
