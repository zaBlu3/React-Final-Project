import React from 'react';

function SearchBar({label}) {
    return (
        <form action="/movies" className='searchBar' method="get">
        <label className="form-label ml-3" htmlFor="searchBar">
            <span >{label} : </span>
            </label>
        <input className='searchBar'
        autoComplete='off'
            type="text"
            id="searchBar"
            placeholder="click find to reset LIST"
            name="s" 
        />
        
        <button className='btn btn-light' type="submit">Find</button>

        
    </form>

    

    );
}

export default SearchBar;