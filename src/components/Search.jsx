import React from 'react';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({});

const Search = ({ setSearchInput }) => (
  <div>
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSearchInput(e.target.search.value);
      }}
    >
      <input name="search" type="text" placeholder="City, State: Los Angeles, CA" />
    </form>
  </div>
);

export default Search;
