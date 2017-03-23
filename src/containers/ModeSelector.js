/**
 * Created by Chunxu on 2017/2/21.
 */

import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Row, Col, Button, Modal} from 'react-bootstrap';
// import { MdGamepad, MdPeople } from 'react-icons/lib/md';
import {selectSinglePlayerMode, selectMultiPlayerMode} from '../actions/index';


class ModeSelector extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: true,
      offline: !navigator.onLine
    };

    this.singleMode = this.singleMode.bind(this);
    this.multiMode = this.multiMode.bind(this);
  }

  close() {
    this.setState({
      showModal: false
    });
  }

  singleMode() {
    this.props.selectSinglePlayerMode();
    this.close();
  }

  multiMode() {
    this.props.selectMultiPlayerMode();
    this.close();
  }

  render() {
    const imgStyle = {
      width: '100%',
      marginTop: '1em',
      marginBottom: '1em'
    };

    // console.log('this state', Offline.check().offline);

    return (
      <Modal show={this.state.showModal} bsSize="small" backdrop="static">
        <Modal.Header>
          <Modal.Title><img src="/img/logo.png" style={imgStyle} alt="Online Gobang"/></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col sm={12} md={12}>
              <Button bsStyle="primary" bsSize="large" onClick={ this.singleMode } block>
                {/*<i className="fa fa-user"/>&nbsp;&nbsp;*/}
                Single-Player
              </Button>
            </Col>
          </Row>
          <br/>
          <Row>
            <Col sm={12} md={12}>
              <Button bsStyle="primary" bsSize="large" onClick={ this.multiMode }
                      block disabled={this.state.offline}>
                {/*<i className="fa fa-users"/>&nbsp;&nbsp;*/}
                Multi-Player
              </Button>
            </Col>
          </Row>
          <br/>
          <br/>
        </Modal.Body>
      </Modal>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    selectSinglePlayerMode,
    selectMultiPlayerMode
  }, dispatch);
}

export default connect(null, mapDispatchToProps)(ModeSelector);
