const Paginator = ({ catalogState, setPage }) => {

  const { loading, total, page, next, prev, last } = catalogState

  return (<>
    {last > 1 &&
    <div className="tangible-blocks__paginator">
      <div className="tablenav bottom">
        <div className="tablenav-pages">

          <span className="displaying-num">{total} items</span>

          <span className="pagination-links">

            <a onClick={() => setPage(1)} className={"first-page button" + (2 >= page ? " disabled": "") }><span className="screen-reader-text">First page</span><span
              aria-hidden="true">«</span></a>

            <a onClick={() => setPage(prev)} className={"prev-page button" + (prev >= page ? " disabled": "")}><span className="screen-reader-text">Previous page</span><span
              aria-hidden="true">‹</span></a>

            <span className="screen-reader-text">Current Page</span>
            <span id="table-paging" className="paging-input">
              <span className="tablenav-paging-text">{page} of <span className="total-pages">{last}</span></span>
            </span>

            <a onClick={() => setPage(next)} className={"next-page button" + (next <= page ? " disabled": "")}><span
              className="screen-reader-text">Next page</span><span aria-hidden="true">›</span></a>

            <a onClick={() => setPage(last)} className={"last-page button" + (last <= page + 1 ? " disabled": "") }><span
              className="screen-reader-text">Last page</span><span aria-hidden="true">»</span></a>

          </span>

        </div>
      </div>
      <br className="clear"/>
    </div>
    }</>)

}

export default Paginator
