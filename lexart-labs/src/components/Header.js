import React from "react";
import '../style/Header.css'

class Header extends React.Component {
  exitAccount = () => {
    localStorage.removeItem('tokenLexart');
    window.location.assign('http://localhost:3000/')
  }

  render() {
    return (
      <header>
        <div className="header-main">
          <h1>{ '</> Lexart Labs' }</h1>
          <p>Processo Seletivo</p>
        </div>
        <div>
          <button type="button" className="exit-button" onClick={ this.exitAccount }>
            Sair
          </button>
        </div>
      </header>
    )
  }
}

export default Header
