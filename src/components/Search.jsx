import React from 'react';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  searchContainer: {
    padding: 10,
    width: 420,
    '& form': {
      border: '1px solid #111',
      alignItems: 'center',
      display: 'flex',
      width: '100%',
      padding: [0, 10],
    },
    '& i': {
      padding: 5,
    },
    '& input': {
      border: 0,
      padding: [10, 0],
      width: '100%',
      '&:focus': {
        outline: 0,
      },
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
        <i className="fas fa-search" />
      </form>
    </div>
  );
};

export default Search;
