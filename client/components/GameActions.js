import React from 'react';

export default (props) => {

  const actions = props.actions.map(action => {
    let typeClass = "action-icon ";
    switch (action.type) {
      case 'goal':
        typeClass += "icon-soccer-ball";
        break;
      case 'attempt':
        typeClass += "icon-fast-fw";
        break;
      case 'warning':
        typeClass += "icon-blank yellow";
        break;
      case 'expulsion':
        typeClass += "icon-blank red";
        break;
      case 'substitution':
        typeClass += "icon-exchange";
        break;
    }
    return (
      <li key={action.id} className="column">
        <i className={typeClass}/>
        <span> {action.minute + "'"} - </span>
        <span>{action.comment}</span>
      </li>
    )
  });

  return (
    <ul className="game-actions-list">
      {actions}
    </ul>
  )

}