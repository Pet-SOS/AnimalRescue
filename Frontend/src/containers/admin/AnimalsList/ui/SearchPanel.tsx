import React, { Component } from 'react';

export default class  SearchPanel extends Component<{onSearchChange: (searchStr: string) => void}> {

    state = {
        searchStr: ''
    }

    onSearchChange = ( e: any ) => {
        const searchStr = e.target.value;
        this.setState({searchStr});
        this.props.onSearchChange(searchStr);
    };


    render() {
        return (
            <form className="search-animals" action="#">
                <input type="text" 
                        placeholder="Пошук" 
                        value={this.state.searchStr}
                        onChange = {this.onSearchChange} />
                <button type="submit" className="icon-search">Summit</button>
            </form>
        );
    }
}