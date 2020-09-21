import React, {Component} from 'react';
import apiKey from './config';
import axios from 'axios';
import {
  BrowserRouter,
  Route,
  Redirect,
  Switch 
} from 'react-router-dom'

// Components
import Header from './Header';
import Gallery from './Gallery';
import NotFound from './NotFound';

class App extends Component {

  state= {
    loading: true,
    query: '',
    searchImages: [],
    catsPhotos: [],
    dogsPhotos: [],
    computersPhotos: []
  };

  componentDidMount() {
    this.getPhotos('cats', 'catsPhotos');
    this.getPhotos('dogs', 'dogsPhotos');
    this.getPhotos('computers', 'computersPhotos');
    this.performSearch();
}

// Get the photos for beaches, mountains, and lakes
getPhotos = (tag, photos) => {
    axios.get(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${tag}&sort=relevance&per_page=24&format=json&nojsoncallback=1`)
    .then(response => {
        this.setState({
            [photos]: response.data.photos.photo

        });
    })
    .catch(error => {
        console.log(error);
    });
}


  //Search photos
  performSearch=(query='cats')=>{
    
    if(query){
    axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&per_page=24&format=json&nojsoncallback=1`)
      .then(response => {
        this.setState({
          searchImages: response.data.photos.photo,
          loading: false
        })
      })
      .catch(error => {
        console.log('Error fetching and parsing data', error);
      });
    }

  }

  render(){
   
    return(
      <BrowserRouter>

        <div className="container">
        <Header onSearch={this.performSearch} />

        <Switch>
            <Route 
              exact 
              path="/" 
              render={ () => <Redirect to="/cats" /> } 
            />

            <Route
              exact
              path="/cats"
              render ={ ()=> 
                (this.state.loading)
                  ? <p>Loading...</p>
                  : <Gallery data={this.state.catsPhotos} title={this.state.cats}/>
              }
            />

            <Route
              exact
              path="/dogs"
              render ={ ()=> 
                (this.state.loading)
                  ? <p>Loading...</p>
                  : <Gallery data={this.state.dogsPhotos} title={this.state.dogs}/>
              }
            />

            <Route
              exact
              path="/computers"
              render ={ ()=> 
                (this.state.loading)
                  ? <p>Loading...</p>
                  : <Gallery data={this.state.computersPhotos} title={this.state.computers}/>
              }
            />

            {/* Route for search queries */}
            <Route 
            path={`/search/${this.state.query}`}
            render={ () =>
                    (this.state.loading) 
                    ? <p>Loading...</p>
                    : <Gallery data={this.state.searchImages} title={this.state.query} />
            } />

            {/* Route for 404 error */}
            <Route component={NotFound} />

        </Switch>

        </div>
        
      </BrowserRouter>
    );
  }
}


export default App;
