import { Component } from "react";
import PropTypes from 'prop-types';
import css from './Searchbar.module.css';

class SearchBar extends Component {
    state = {
        searchQuery: '',
    }

    handleChange = (e) => {
        this.setState({ searchQuery: e.currentTarget.value })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        if (this.state.searchQuery.trim() === '') {
            console.error('please enter a value to search!');
            return
        }
        this.props.onSubmit(this.state.searchQuery)
        this.reset()
    }
        reset = () => {
            this.setState({ searchQuery: '' })
        }

    render(){
        const { searchQuery } = this.state
        return(
            <header className={css.Searchbar}>
                <form className={css.SearchForm} onSubmit={this.handleSubmit}>
                    <button type="submit" className={css.SearchFormButton}>
                    <span className={css.SearchFormButtonLabel}>Search</span>
                    </button>
                    <input
                    className={css.SearchFormInput}
                    onChange={this.handleChange}
                    value={searchQuery}
                    type="text"
                    // autocomplete="off"
                    // autofocus
                    placeholder="Search images and photos"
                    />
                </form>
            </header>
        )
    }
}
SearchBar.propTypes = {
    onSubmit: PropTypes.func,
}
export default SearchBar