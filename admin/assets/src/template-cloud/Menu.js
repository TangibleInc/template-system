const Menu = ({ tabs, activeTab, setActiveTab }) => {
  return (
    <h2 className="nav-tab-wrapper">
      {Object.entries(tabs).map(([key, value]) => (
        <a
          key={activeTab}
          className={'nav-tab ' + (key === activeTab ? 'nav-tab-active' : '')}
          href="#"
          onClick={() => setActiveTab(key)}
        >
          {value}
        </a>
      ))}
    </h2>
  )
}

export default Menu
