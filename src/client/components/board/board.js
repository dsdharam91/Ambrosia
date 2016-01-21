/**
 * @flow
 */

import React from 'react';
import Relay from 'react-relay';
import {Link} from 'react-router';
import classnames from 'classnames';

/// make a board component to go through card and dashboard order
class Board extends React.Component {
  constructor (props, context) {
    super(props, context);
    this.state = {
      active: this.props.location.pathname
    }
  }
  componentWillReceiveProps (newProps) {
    if (!newProps.user.user.userID) {
      console.log('ChiefIndex:componentWillReceiveProps', newProps.user.user.userID);
      this.context.router.pushState({
        previousPath: this.props.location.pathname
      }, '/register');
    }
  }
  componentWillMount () {
    console.log('board:componentWillMount', this.props);
    if (this.props.user.user.userID !== this.props.restaurant.restaurant.userID) {
      console.log('ChiefIndex:ComponentWillMount', this.props.user.user.userID);
      this.props.history.pushState({}, '/');
    }
  }
  _select = (e) => {
    for (var i in this.refs) {
      console.log(this.refs[i].getDOMNode());
      this.refs[i].getDOMNode().className = 'item';
    }
    e.target.className = 'item selected';
  }

  render () {
    console.log(this.props);
    return (
      <div className='chief-index'>
        <nav className='nav-list'>
          <ul className='center'>
            <li><Link to= {'/card/edit/'+this.props.id} className ={classnames('item', {
              selected: (this.props.location.pathname.search('card') !== -1)
            })} ref='card' onClick={this._select}>Card</Link></li>
            <li><Link to= {'/timeline/'+this.props.id} className={classnames('item', {
              selected: (this.props.location.pathname.search('timeline') !== -1)
            })} ref='board' onClick={this._select}>Orders</Link></li>
            <li><Link to= {'/settings/'+this.props.id} className={classnames('item', {
              selected: (this.props.location.pathname.search('settings') !== -1)
            })} ref='settings' onClick={this._select}>Settings</Link></li>
          </ul>
        </nav>
        {this.props.children}
      </div>
    );
  }
}

export default Relay.createContainer(Board, {
  fragments: {
    restaurant: () => Relay.QL `
      fragment on Root {
        restaurant {
          id,
          userID
        }
      }
    `,
    user: () => Relay.QL `
    fragment on Root {
      user {
        userID
      }
    }`
  }
});
