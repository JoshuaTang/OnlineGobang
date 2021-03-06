import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Row, Col, Panel} from 'react-bootstrap';
import SingleBoard from './SingleBoard';
import MultiBoard from './MultiBoard';
import WinAlert from './WinAlert';

class BoardPanel extends Component {
  render() {
    let boardElem;
    if (this.props.mode === 'single') {
      boardElem = <SingleBoard/>;
    } else if (this.props.mode === 'multiple') {
      boardElem = <MultiBoard/>;
    } else {
      boardElem = <div/>;
    }

    return (
      <Row>
        <Col sm={12} md={12}>
          <WinAlert/>
        </Col>
        <Col sm={12} md={12}>
          <Panel header="Board" bsStyle="primary">
            {boardElem}
          </Panel>
        </Col>
      </Row>
    );

  }
}

function mapStateToProps(state) {
  return {
    mode: state.mode
  };
}

export default connect(mapStateToProps)(BoardPanel);