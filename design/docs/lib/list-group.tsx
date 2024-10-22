export default function Example({
  prefix = 't-' // or ''
}) {
  return (
    <>
      <ul className={`${prefix}list-group`}>
        <li className={`${prefix}list-group-item`}>An item</li>
        <li className={`${prefix}list-group-item`}>A second item</li>
        <li className={`${prefix}list-group-item`}>A third item</li>
        <li className={`${prefix}list-group-item`}>A fourth item</li>
        <li className={`${prefix}list-group-item`}>And a fifth one</li>
      </ul>
    </>
  )
}
