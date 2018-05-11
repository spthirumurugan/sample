import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addViews, addDataSets, generateId, updateDataSet } from '../../../myreport/actions/note_action';
import Button from '../../../ui_components/buttons/button';
import Table from './table';
import { views } from '../tableJson';

const data = [
  {
    type: 'dataset',
    data: {
      force: { data: 4, type: 'inputBox' },
      height: { data: 6, type: 'text' },
      observation: { data: 2, type: 'text' }
    }
  },
  {
    type: 'dataset',
    data: {
      force: { data: 4, type: 'inputBox' },
      height: { data: 6, type: 'text' },
      observation: { data: 2, type: 'text' }
    }
  },
  {
    type: 'dataset',
    data: {
      force: { data: 1, type: 'inputBox' },
      height: { data: 2, type: 'text' },
      observation: { data: 3, type: 'text' }
    }
  }
];
const updateData = {
  id: '',
  data: {
    force: { data: 5, type: 'text' },
    height: { data: 6, type: 'text' },
    observation: { data: 9, type: 'text' }
  }
};

export class ExampleTable extends Component {
// const ExampleTable = ({ config, viewsAdd, dataSetsAdd }) => {
  componentWillMount() {
    this.props.generateRunId();
    this.props.viewsAdd(views);
  }

  render() {
    updateData.id = this.props.datasetId;
    return (
      <div className="col-md-12">
        <h3>Example Table</h3>
        <Table type="hammer" />
        <Table type="hammer1" />
        <Button
          type={'solid'}
          onClick={() => { this.props.dataSetsUpdate(updateData); }}
        >
          {'UPDATE DATASET'}
        </Button>
        <Button
          type={'solid'}
          onClick={() => { this.props.dataSetsAdd(data); }}
        >
          {'ADD DATASET'}
        </Button>
      </div>
    );
  }
}

ExampleTable.propTypes = {
  dataSetsAdd: React.PropTypes.func,
  generateRunId: React.PropTypes.func,
  dataSetsUpdate: React.PropTypes.func,
  datasetId: React.PropTypes.node,
  viewsAdd: React.PropTypes.func
};

function mapStateToProps(state) {
  const id = state.note.dataSetIds[0];
  return {
    datasetId: id
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    viewsAdd: addViews,
    dataSetsAdd: addDataSets,
    generateRunId: generateId,
    dataSetsUpdate: updateDataSet
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ExampleTable);
