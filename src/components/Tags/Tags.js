import React from 'react';

import Tag from '../Tag/Tag';

import './css/Tags.css';

const Tags = (props) => {
  const tags = props.tags.filter((v, i, a) => a.indexOf(v) === i).sort();

  return (
      <ul className="tags">{tags.map(tag => <Tag key={tag} tag={tag}/>)}</ul>
  );
};

export default Tags;