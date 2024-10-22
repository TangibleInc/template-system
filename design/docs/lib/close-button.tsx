export default function Example({
  prefix = 't-' // or ''
}) {
  return <>
    <button type="button" className={`${prefix}btn-close`} aria-label="Close"></button>
  </>
}