import React from 'react';
import './App.css';
import { CardList } from './components/card-list/card-list.component.js';
import SearchBox from './components/search-box/search-box.component.js';

import axios from 'axios';

class App extends React.Component {
  constructor(){
    super();
    this.state = {
      monsters: [],
      searchField: ''
    };

  }

  componentDidMount(){
    axios.get('https://jsonplaceholder.typicode.com/users')
      .then(res => {
        console.log(res.data)
        let users = res.data;
        this.setState({ monsters: users })
      })
  }

  handleChange = (e) => {
    this.setState({ searchField: e.target.value })
  }

  render(){
    
    const { monsters, searchField } = this.state;
    const filteredMonsters = monsters.filter(monster => {
      return monster.name.toLowerCase().includes(searchField.toLowerCase())
    })
    
    return (
      <div className="App"> 
        <h1>Monsters Rolodex</h1>
        <SearchBox placeholder='search monsters' 
                   handleChange={this.handleChange}
        />
        <CardList monsters={filteredMonsters}/>
        
      </div>
    );
  }
}

export default App;
