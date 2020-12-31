import React from 'react';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  searchContainer: {
    padding: 10,
    width: 420,
    '& form': {
      width: '100%',
    },
    '& input': {
      padding: 10,
      width: '100%',
    },
  },
});

const Search = ({ setSearchInput }) => {
  const classes = useStyles();

  return (
    <div className={classes.searchContainer}>
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
};

export default Search;
