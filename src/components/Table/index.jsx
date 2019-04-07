import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';

import WrappedVirtualizedTable from './WrappedVirtualizedTable';

import * as actions from 'redux/actions';
import './index.scss';

class ReactVirtualizedTable extends PureComponent {

  loadMoreRows = ({ startIndex, stopIndex }) => {
    const { getRepositories, repositories } = this.props;
    const numberToLoad = stopIndex - repositories.items.length + 1;
    if (numberToLoad > 0) {
      getRepositories({ page: repositories.nextPage });
    }

  }

  rowRenderer = ({ index, isScrolling, key, style, rowData }) => {
    if (rowData) {
      return (
        <div
          className="Row"
          key={key}
          style={{
            ...style,
          }}
        >
          <div 
            className="Row_cell"
            style={{flex: '0 1 100px'}}
          >
            {rowData.id}
          </div>
          <div
            className="Row_cell"
            style={{flex: '1 1 200px'}}
          >
            {rowData.name}
          </div>
          <div
            className="Row_cell" 
            style={{flex: '1 1 200px'}}
          >
            {rowData.html_url}
          </div>
          <div
            className="Row_cell" 
            style={{flex: '1 1 300px'}}
          >
            {rowData.description}
          </div>
          <div
            className="Row_cell" 
            style={{flex: '0 1 120px'}}
          >
            {rowData.open_issues}
          </div>
          <div 
            className="Row_cell" 
            style={{flex: '0 1 120px'}}
          >
            {rowData.stargazers_count}
          </div>
        </div>);
    } else {
      return (<div className="Row_loading"
        key={key}
        style={{
          ...style,
        }}> Loading... </div>)
    }
  }

  render() {
    const { items } = this.props.repositories;
    return (
      <Paper style={{ height: 400, width: '100%' }}>
        <WrappedVirtualizedTable
          rowCount={5000}
          rowGetter={({ index }) => items[index]}
          loadMoreRows={this.loadMoreRows}
          itemsRep={items}
          rowRenderer={this.rowRenderer}
          columns={[
            {
              width: 100,
              label: 'ID',
              dataKey: 'id',
              numeric: true,
            },
            {
              width: 200,
              flexGrow: 1,
              label: 'Name',
              dataKey: 'name',
            },
            {
              width: 200,
              label: 'Url',
              flexGrow: 1,
              dataKey: 'html_url',
            },
            {
              width: 300,
              label: 'Description',
              flexGrow: 1,
              dataKey: 'description',
            },
            {
              width: 120,
              label: 'Open Issues',
              dataKey: 'open_issues',
              numeric: true,
            },
            {
              width: 120,
              label: 'Stars',
              dataKey: 'stargazers_count',
              numeric: true,
            },
          ]}
        />
      </Paper>
    );
  }
}

const stateToProps = (state) => ({
  repositories: state.home.repositories
});

const dispatchToProps = (dispatch) => ({
  getRepositories: (request) => dispatch(actions.getRepositories(request))
});

ReactVirtualizedTable.propTypes = {
  repositories:  PropTypes.shape({
      items:PropTypes.arrayOf(
        PropTypes.shape({
          name: PropTypes.string.isRequired,
          html_url: PropTypes.string.isRequired,
          id: PropTypes.number.isRequired,
          description: PropTypes.string.isRequired,
          open_issues: PropTypes.number.isRequired,
          stargazers_count: PropTypes.number.isRequired,
        }),
      ).isRequired,
      nextPage: PropTypes.string,
      lastPage: PropTypes.string
  }).isRequired,
  getRepositories: PropTypes.func.isRequired
}

export default connect(stateToProps, dispatchToProps)(ReactVirtualizedTable);