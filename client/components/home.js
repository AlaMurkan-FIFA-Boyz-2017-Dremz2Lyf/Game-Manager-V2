import React, { Component } from 'react';

class Home extends Component {

  renderList(list) {
    return (
      list ? list.map((li, index) => <li key={index} className='listItem'>{li}</li>) : <li></li>
    );
  }
  render() {
    const { list } = this.props;
    return (
      <div className="home">Foo
        <h2>Something</h2>
        <ul>
          {this.renderList(list)}
        </ul>
      </div>
    );
  }
}

export default Home;
