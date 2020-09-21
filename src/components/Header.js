import React from 'react';
import Nav from './Nav';
import SearchForm from './SearchForm';

const Header = props =>(
    <header>
        <SearchForm onSearch={props.onSearch}/>
        <Nav/>
    </header>

);

export default Header;