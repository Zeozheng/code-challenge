import React from 'react';
import './styles.css';

const Tab = (props) => {
  const [visibleTab, setVisibleTab] = React.useState(props.tab[0].id);

  const listTitles = props.tab.map((item) => (
    <li onClick={() => setVisibleTab(item.id)} className={visibleTab === item.id ? 'tab-title tab-title--active' : 'tab-title'}>
      {item.tabTitle}
    </li>
  ));
  const listContent = props.tab.map((item) => <p style={visibleTab === item.id ? {} : { display: 'none' }}>{item.tabContent}</p>);

  return (
    <div className='tabs'>
      <ul className='tabs-titles'>{listTitles}</ul>
      <div className='tab-content'>{listContent}</div>
    </div>
  );
};

export default Tab;
