import React from 'react'
export default function Example({
  prefix = 't-' // or ''
}) {
  return (
    <>
      

{/* <link href="dropdowns.css" rel="stylesheet"> */}

    
<svg xmlns="http://www.w3.org/2000/svg" className={`${prefix}d-none`}>
  <symbol id="film" viewBox="0 0 16 16">
    <path d="M0 1a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V1zm4 0v6h8V1H4zm8 8H4v6h8V9zM1 1v2h2V1H1zm2 3H1v2h2V4zM1 7v2h2V7H1zm2 3H1v2h2v-2zm-2 3v2h2v-2H1zM15 1h-2v2h2V1zm-2 3v2h2V4h-2zm2 3h-2v2h2V7zm-2 3v2h2v-2h-2zm2 3h-2v2h2v-2z"/>
  </symbol>

  <symbol id="joystick" viewBox="0 0 16 16">
    <path d="M10 2a2 2 0 0 1-1.5 1.937v5.087c.863.083 1.5.377 1.5.726 0 .414-.895.75-2 .75s-2-.336-2-.75c0-.35.637-.643 1.5-.726V3.937A2 2 0 1 1 10 2z"/>
    <path d="M0 9.665v1.717a1 1 0 0 0 .553.894l6.553 3.277a2 2 0 0 0 1.788 0l6.553-3.277a1 1 0 0 0 .553-.894V9.665c0-.1-.06-.19-.152-.23L9.5 6.715v.993l5.227 2.178a.125.125 0 0 1 .001.23l-5.94 2.546a2 2 0 0 1-1.576 0l-5.94-2.546a.125.125 0 0 1 .001-.23L6.5 7.708l-.013-.988L.152 9.435a.25.25 0 0 0-.152.23z"/>
  </symbol>

  <symbol id="music-note-beamed" viewBox="0 0 16 16">
    <path d="M6 13c0 1.105-1.12 2-2.5 2S1 14.105 1 13c0-1.104 1.12-2 2.5-2s2.5.896 2.5 2zm9-2c0 1.105-1.12 2-2.5 2s-2.5-.895-2.5-2 1.12-2 2.5-2 2.5.895 2.5 2z"/>
    <path fill-rule="evenodd" d="M14 11V2h1v9h-1zM6 3v10H5V3h1z"/>
    <path d="M5 2.905a1 1 0 0 1 .9-.995l8-.8a1 1 0 0 1 1.1.995V3L5 4V2.905z"/>
  </symbol>

  <symbol id="files" viewBox="0 0 16 16">
    <path d="M13 0H6a2 2 0 0 0-2 2 2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2 2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm0 13V4a2 2 0 0 0-2-2H5a1 1 0 0 1 1-1h7a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1zM3 4a1 1 0 0 1 1-1h7a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4z"/>
  </symbol>

  <symbol id="image-fill" viewBox="0 0 16 16">
    <path d="M.002 3a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-12a2 2 0 0 1-2-2V3zm1 9v1a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V9.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12zm5-6.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0z"/>
  </symbol>

  <symbol id="trash" viewBox="0 0 16 16">
    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
    <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
  </symbol>

  <symbol id="question-circle" viewBox="0 0 16 16">
    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
    <path d="M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286zm1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94z"/>
  </symbol>

  <symbol id="arrow-left-short" viewBox="0 0 16 16">
    <path fill-rule="evenodd" d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5z"/>
  </symbol>

  <symbol id="arrow-right-short" viewBox="0 0 16 16">
    <path fill-rule="evenodd" d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8z"/>
  </symbol>
</svg>

<div className={`${prefix}d-flex ${prefix}flex-column ${prefix}flex-md-row ${prefix}p-4 ${prefix}gap-4 ${prefix}py-md-5 ${prefix}align-items-center ${prefix}justify-content-center`}>
  <ul className={`${prefix}dropdown-menu ${prefix}position-static ${prefix}d-grid ${prefix}gap-1 ${prefix}p-2 ${prefix}rounded-3 ${prefix}mx-0 ${prefix}shadow ${prefix}w-220px`} data-theme="light">
    <li><a className={`${prefix}dropdown-item ${prefix}rounded-2 ${prefix}active`} href="#">Action</a></li>
    <li><a className={`${prefix}dropdown-item ${prefix}rounded-2`} href="#">Another action</a></li>
    <li><a className={`${prefix}dropdown-item ${prefix}rounded-2`} href="#">Something else here</a></li>
    <li><hr className={`${prefix}dropdown-divider`}/></li>
    <li><a className={`${prefix}dropdown-item ${prefix}rounded-2`} href="#">Separated link</a></li>
  </ul>
  <ul className={`${prefix}dropdown-menu ${prefix}position-static ${prefix}d-grid ${prefix}gap-1 ${prefix}p-2 ${prefix}rounded-3 ${prefix}mx-0 ${prefix}border-0 ${prefix}shadow ${prefix}w-220px`} data-theme="dark">
    <li><a className={`${prefix}dropdown-item ${prefix}rounded-2 ${prefix}active`} href="#">Action</a></li>
    <li><a className={`${prefix}dropdown-item ${prefix}rounded-2`} href="#">Another action</a></li>
    <li><a className={`${prefix}dropdown-item ${prefix}rounded-2`} href="#">Something else here</a></li>
    <li><hr className={`${prefix}dropdown-divider`}/></li>
    <li><a className={`${prefix}dropdown-item ${prefix}rounded-2`} href="#">Separated link</a></li>
  </ul>
</div>

<div className={`${prefix}b-example-divider`}></div>

<div className={`${prefix}d-flex ${prefix}flex-column ${prefix}flex-md-row ${prefix}p-4 ${prefix}gap-4 ${prefix}py-md-5 ${prefix}align-items-center ${prefix}justify-content-center`}>
  <div className={`${prefix}dropdown-menu ${prefix}d-block ${prefix}position-static ${prefix}pt-0 ${prefix}mx-0 ${prefix}rounded-3 ${prefix}shadow ${prefix}overflow-hidden ${prefix}w-280px`} data-theme="light">
    <form className={`${prefix}p-2 ${prefix}mb-2 ${prefix}bg-body-tertiary ${prefix}border-bottom`}>
      <input type="search" className={`${prefix}form-control`} autoComplete="false" placeholder="Type to filter..."/>
    </form>
    <ul className={`${prefix}list-unstyled ${prefix}mb-0`}>
      <li><a className={`${prefix}dropdown-item ${prefix}d-flex ${prefix}align-items-center ${prefix}gap-2 ${prefix}py-2`} href="#">
        <span className={`${prefix}d-inline-block ${prefix}bg-success ${prefix}rounded-circle ${prefix}p-1`}></span>
        Action
      </a></li>
      <li><a className={`${prefix}dropdown-item ${prefix}d-flex ${prefix}align-items-center ${prefix}gap-2 ${prefix}py-2`} href="#">
        <span className={`${prefix}d-inline-block ${prefix}bg-primary ${prefix}rounded-circle ${prefix}p-1`}></span>
        Another action
      </a></li>
      <li><a className={`${prefix}dropdown-item ${prefix}d-flex ${prefix}align-items-center ${prefix}gap-2 ${prefix}py-2`} href="#">
        <span className={`${prefix}d-inline-block ${prefix}bg-danger ${prefix}rounded-circle ${prefix}p-1`}></span>
        Something else here
      </a></li>
      <li><a className={`${prefix}dropdown-item ${prefix}d-flex ${prefix}align-items-center ${prefix}gap-2 ${prefix}py-2`} href="#">
        <span className={`${prefix}d-inline-block ${prefix}bg-info ${prefix}rounded-circle ${prefix}p-1`}></span>
        Separated link
      </a></li>
    </ul>
  </div>

  <div className={`${prefix}dropdown-menu ${prefix}d-block ${prefix}position-static ${prefix}border-0 ${prefix}pt-0 ${prefix}mx-0 ${prefix}rounded-3 ${prefix}shadow ${prefix}overflow-hidden ${prefix}w-280px`} data-theme="dark">
    <form className={`${prefix}p-2 ${prefix}mb-2 ${prefix}bg-dark ${prefix}border-bottom ${prefix}border-dark`}>
      <input type="search" className={`${prefix}form-control ${prefix}bg-dark`} autoComplete="false" placeholder="Type to filter..."/>
    </form>
    <ul className={`${prefix}list-unstyled ${prefix}mb-0`}>
      <li><a className={`${prefix}dropdown-item ${prefix}d-flex ${prefix}align-items-center ${prefix}gap-2 ${prefix}py-2`} href="#">
        <span className={`${prefix}d-inline-block ${prefix}bg-success ${prefix}rounded-circle ${prefix}p-1`}></span>
        Action
      </a></li>
      <li><a className={`${prefix}dropdown-item ${prefix}d-flex ${prefix}align-items-center ${prefix}gap-2 ${prefix}py-2`} href="#">
        <span className={`${prefix}d-inline-block ${prefix}bg-primary ${prefix}rounded-circle ${prefix}p-1`}></span>
        Another action
      </a></li>
      <li><a className={`${prefix}dropdown-item ${prefix}d-flex ${prefix}align-items-center ${prefix}gap-2 ${prefix}py-2`} href="#">
        <span className={`${prefix}d-inline-block ${prefix}bg-danger ${prefix}rounded-circle ${prefix}p-1`}></span>
        Something else here
      </a></li>
      <li><a className={`${prefix}dropdown-item ${prefix}d-flex ${prefix}align-items-center ${prefix}gap-2 ${prefix}py-2`} href="#">
        <span className={`${prefix}d-inline-block ${prefix}bg-info ${prefix}rounded-circle ${prefix}p-1`}></span>
        Separated link
      </a></li>
    </ul>
  </div>
</div>

<div className={`${prefix}b-example-divider`}></div>

<div className={`${prefix}d-flex ${prefix}flex-column ${prefix}flex-md-row ${prefix}p-4 ${prefix}gap-4 ${prefix}py-md-5 ${prefix}align-items-center ${prefix}justify-content-center`}>
  <ul className={`${prefix}dropdown-menu ${prefix}d-block ${prefix}position-static ${prefix}mx-0 ${prefix}shadow ${prefix}w-220px`} data-theme="light">
    <li>
      <a className={`${prefix}dropdown-item ${prefix}d-flex ${prefix}gap-2 ${prefix}align-items-center`} href="#">
        <svg className={`${prefix}bi`} width="16" height="16"><use xlinkHref="#files"/></svg>
        Documents
      </a>
    </li>
    <li>
      <a className={`${prefix}dropdown-item ${prefix}d-flex ${prefix}gap-2 ${prefix}align-items-center`} href="#">
        <svg className={`${prefix}bi`} width="16" height="16"><use xlinkHref="#image-fill"/></svg>
        Photos
      </a>
    </li>
    <li>
      <a className={`${prefix}dropdown-item ${prefix}d-flex ${prefix}gap-2 ${prefix}align-items-center`} href="#">
        <svg className={`${prefix}bi`} width="16" height="16"><use xlinkHref="#film"/></svg>
        Movies
      </a>
    </li>
    <li>
      <a className={`${prefix}dropdown-item ${prefix}d-flex ${prefix}gap-2 ${prefix}align-items-center`} href="#">
        <svg className={`${prefix}bi`} width="16" height="16"><use xlinkHref="#music-note-beamed"/></svg>
        Music
      </a>
    </li>
    <li>
      <a className={`${prefix}dropdown-item ${prefix}d-flex ${prefix}gap-2 ${prefix}align-items-center`} href="#">
        <svg className={`${prefix}bi`} width="16" height="16"><use xlinkHref="#joystick"/></svg>
        Games
      </a>
    </li>
    <li><hr className={`${prefix}dropdown-divider`}/></li>
    <li>
      <a className={`${prefix}dropdown-item ${prefix}dropdown-item-danger ${prefix}d-flex ${prefix}gap-2 ${prefix}align-items-center`} href="#">
        <svg className={`${prefix}bi`} width="16" height="16"><use xlinkHref="#trash"/></svg>
        Trash
      </a>
    </li>
  </ul>
  <ul className={`${prefix}dropdown-menu ${prefix}d-block ${prefix}position-static ${prefix}mx-0 ${prefix}border-0 ${prefix}shadow ${prefix}w-220px`} data-theme="dark">
    <li>
      <a className={`${prefix}dropdown-item ${prefix}d-flex ${prefix}gap-2 ${prefix}align-items-center`} href="#">
        <svg className={`${prefix}bi`} width="16" height="16"><use xlinkHref="#files"/></svg>
        Documents
      </a>
    </li>
    <li>
      <a className={`${prefix}dropdown-item ${prefix}d-flex ${prefix}gap-2 ${prefix}align-items-center`} href="#">
        <svg className={`${prefix}bi`} width="16" height="16"><use xlinkHref="#image-fill"/></svg>
        Photos
      </a>
    </li>
    <li>
      <a className={`${prefix}dropdown-item ${prefix}d-flex ${prefix}gap-2 ${prefix}align-items-center`} href="#">
        <svg className={`${prefix}bi`} width="16" height="16"><use xlinkHref="#film"/></svg>
        Movies
      </a>
    </li>
    <li>
      <a className={`${prefix}dropdown-item ${prefix}d-flex ${prefix}gap-2 ${prefix}align-items-center`} href="#">
        <svg className={`${prefix}bi`} width="16" height="16"><use xlinkHref="#music-note-beamed"/></svg>
        Music
      </a>
    </li>
    <li>
      <a className={`${prefix}dropdown-item ${prefix}d-flex ${prefix}gap-2 ${prefix}align-items-center`} href="#">
        <svg className={`${prefix}bi`} width="16" height="16"><use xlinkHref="#joystick"/></svg>
        Games
      </a>
    </li>
    <li><hr className={`${prefix}dropdown-divider`}/></li>
    <li>
      <a className={`${prefix}dropdown-item ${prefix}d-flex ${prefix}gap-2 ${prefix}align-items-center`} href="#">
        <svg className={`${prefix}bi`} width="16" height="16"><use xlinkHref="#trash"/></svg>
        Trash
      </a>
    </li>
  </ul>
</div>

<div className={`${prefix}b-example-divider`}></div>

<div className={`${prefix}d-flex ${prefix}flex-column ${prefix}flex-md-row ${prefix}p-4 ${prefix}gap-4 ${prefix}py-md-5 ${prefix}align-items-center ${prefix}justify-content-center`}>
  <div className={`${prefix}dropdown-menu ${prefix}d-block ${prefix}position-static ${prefix}p-2 ${prefix}mx-0 ${prefix}shadow ${prefix}rounded-3 ${prefix}w-340px`} data-theme="light">
    <div className={`${prefix}d-grid ${prefix}gap-1`}>
      <div className={`${prefix}cal`}>
        <div className={`${prefix}cal-month`}>
          <button className={`${prefix}btn ${prefix}cal-btn`} type="button">
            <svg className={`${prefix}bi`} width="16" height="16"><use xlinkHref="#arrow-left-short"/></svg>
          </button>
          <strong className={`${prefix}cal-month-name`}>June</strong>
          <select className={`${prefix}form-select ${prefix}cal-month-name ${prefix}d-none`}>
            <option value="January">January</option>
            <option value="February">February</option>
            <option value="March">March</option>
            <option value="April">April</option>
            <option value="May">May</option>
            <option selected value="June">June</option>
            <option value="July">July</option>
            <option value="August">August</option>
            <option value="September">September</option>
            <option value="October">October</option>
            <option value="November">November</option>
            <option value="December">December</option>
          </select>
          <button className={`${prefix}btn ${prefix}cal-btn`} type="button">
            <svg className={`${prefix}bi`} width="16" height="16"><use xlinkHref="#arrow-right-short"/></svg>
          </button>
        </div>
        <div className={`${prefix}cal-weekdays ${prefix}text-body-secondary`}>
          <div className={`${prefix}cal-weekday`}>Sun</div>
          <div className={`${prefix}cal-weekday`}>Mon</div>
          <div className={`${prefix}cal-weekday`}>Tue</div>
          <div className={`${prefix}cal-weekday`}>Wed</div>
          <div className={`${prefix}cal-weekday`}>Thu</div>
          <div className={`${prefix}cal-weekday`}>Fri</div>
          <div className={`${prefix}cal-weekday`}>Sat</div>
        </div>
        <div className={`${prefix}cal-days`}>
          <button className={`${prefix}btn ${prefix}cal-btn`} disabled type="button">30</button>
          <button className={`${prefix}btn ${prefix}cal-btn`} disabled type="button">31</button>

          <button className={`${prefix}btn ${prefix}cal-btn`} type="button">1</button>
          <button className={`${prefix}btn ${prefix}cal-btn`} type="button">2</button>
          <button className={`${prefix}btn ${prefix}cal-btn`} type="button">3</button>
          <button className={`${prefix}btn ${prefix}cal-btn`} type="button">4</button>
          <button className={`${prefix}btn ${prefix}cal-btn`} type="button">5</button>
          <button className={`${prefix}btn ${prefix}cal-btn`} type="button">6</button>
          <button className={`${prefix}btn ${prefix}cal-btn`} type="button">7</button>

          <button className={`${prefix}btn ${prefix}cal-btn`} type="button">8</button>
          <button className={`${prefix}btn ${prefix}cal-btn`} type="button">9</button>
          <button className={`${prefix}btn ${prefix}cal-btn`} type="button">10</button>
          <button className={`${prefix}btn ${prefix}cal-btn`} type="button">11</button>
          <button className={`${prefix}btn ${prefix}cal-btn`} type="button">12</button>
          <button className={`${prefix}btn ${prefix}cal-btn`} type="button">13</button>
          <button className={`${prefix}btn ${prefix}cal-btn`} type="button">14</button>

          <button className={`${prefix}btn ${prefix}cal-btn`} type="button">15</button>
          <button className={`${prefix}btn ${prefix}cal-btn`} type="button">16</button>
          <button className={`${prefix}btn ${prefix}cal-btn`} type="button">17</button>
          <button className={`${prefix}btn ${prefix}cal-btn`} type="button">18</button>
          <button className={`${prefix}btn ${prefix}cal-btn`} type="button">19</button>
          <button className={`${prefix}btn ${prefix}cal-btn`} type="button">20</button>
          <button className={`${prefix}btn ${prefix}cal-btn`} type="button">21</button>

          <button className={`${prefix}btn ${prefix}cal-btn`} type="button">22</button>
          <button className={`${prefix}btn ${prefix}cal-btn`} type="button">23</button>
          <button className={`${prefix}btn ${prefix}cal-btn`} type="button">24</button>
          <button className={`${prefix}btn ${prefix}cal-btn`} type="button">25</button>
          <button className={`${prefix}btn ${prefix}cal-btn`} type="button">26</button>
          <button className={`${prefix}btn ${prefix}cal-btn`} type="button">27</button>
          <button className={`${prefix}btn ${prefix}cal-btn`} type="button">28</button>

          <button className={`${prefix}btn ${prefix}cal-btn`} type="button">29</button>
          <button className={`${prefix}btn ${prefix}cal-btn`} type="button">30</button>
          <button className={`${prefix}btn ${prefix}cal-btn`} type="button">31</button>
        </div>
      </div>
    </div>
  </div>

  <div className={`${prefix}dropdown-menu ${prefix}d-block ${prefix}position-static ${prefix}p-2 ${prefix}mx-0 ${prefix}shadow ${prefix}rounded-3 ${prefix}w-340px`} data-theme="dark">
    <div className={`${prefix}d-grid ${prefix}gap-1`}>
      <div className={`${prefix}cal`}>
        <div className={`${prefix}cal-month`}>
          <button className={`${prefix}btn ${prefix}cal-btn`} type="button">
            <svg className={`${prefix}bi`} width="16" height="16"><use xlinkHref="#arrow-left-short"/></svg>
          </button>
          <strong className={`${prefix}cal-month-name`}>June</strong>
          <select className={`${prefix}form-select ${prefix}cal-month-name ${prefix}d-none`}>
            <option value="January">January</option>
            <option value="February">February</option>
            <option value="March">March</option>
            <option value="April">April</option>
            <option value="May">May</option>
            <option selected value="June">June</option>
            <option value="July">July</option>
            <option value="August">August</option>
            <option value="September">September</option>
            <option value="October">October</option>
            <option value="November">November</option>
            <option value="December">December</option>
          </select>
          <button className={`${prefix}btn ${prefix}cal-btn`} type="button">
            <svg className={`${prefix}bi`} width="16" height="16"><use xlinkHref="#arrow-right-short"/></svg>
          </button>
        </div>
        <div className={`${prefix}cal-weekdays ${prefix}text-body-secondary`}>
          <div className={`${prefix}cal-weekday`}>Sun</div>
          <div className={`${prefix}cal-weekday`}>Mon</div>
          <div className={`${prefix}cal-weekday`}>Tue</div>
          <div className={`${prefix}cal-weekday`}>Wed</div>
          <div className={`${prefix}cal-weekday`}>Thu</div>
          <div className={`${prefix}cal-weekday`}>Fri</div>
          <div className={`${prefix}cal-weekday`}>Sat</div>
        </div>
        <div className={`${prefix}cal-days`}>
          <button className={`${prefix}btn ${prefix}cal-btn`} disabled type="button">30</button>
          <button className={`${prefix}btn ${prefix}cal-btn`} disabled type="button">31</button>

          <button className={`${prefix}btn ${prefix}cal-btn`} type="button">1</button>
          <button className={`${prefix}btn ${prefix}cal-btn`} type="button">2</button>
          <button className={`${prefix}btn ${prefix}cal-btn`} type="button">3</button>
          <button className={`${prefix}btn ${prefix}cal-btn`} type="button">4</button>
          <button className={`${prefix}btn ${prefix}cal-btn`} type="button">5</button>
          <button className={`${prefix}btn ${prefix}cal-btn`} type="button">6</button>
          <button className={`${prefix}btn ${prefix}cal-btn`} type="button">7</button>

          <button className={`${prefix}btn ${prefix}cal-btn`} type="button">8</button>
          <button className={`${prefix}btn ${prefix}cal-btn`} type="button">9</button>
          <button className={`${prefix}btn ${prefix}cal-btn`} type="button">10</button>
          <button className={`${prefix}btn ${prefix}cal-btn`} type="button">11</button>
          <button className={`${prefix}btn ${prefix}cal-btn`} type="button">12</button>
          <button className={`${prefix}btn ${prefix}cal-btn`} type="button">13</button>
          <button className={`${prefix}btn ${prefix}cal-btn`} type="button">14</button>

          <button className={`${prefix}btn ${prefix}cal-btn`} type="button">15</button>
          <button className={`${prefix}btn ${prefix}cal-btn`} type="button">16</button>
          <button className={`${prefix}btn ${prefix}cal-btn`} type="button">17</button>
          <button className={`${prefix}btn ${prefix}cal-btn`} type="button">18</button>
          <button className={`${prefix}btn ${prefix}cal-btn`} type="button">19</button>
          <button className={`${prefix}btn ${prefix}cal-btn`} type="button">20</button>
          <button className={`${prefix}btn ${prefix}cal-btn`} type="button">21</button>

          <button className={`${prefix}btn ${prefix}cal-btn`} type="button">22</button>
          <button className={`${prefix}btn ${prefix}cal-btn`} type="button">23</button>
          <button className={`${prefix}btn ${prefix}cal-btn`} type="button">24</button>
          <button className={`${prefix}btn ${prefix}cal-btn`} type="button">25</button>
          <button className={`${prefix}btn ${prefix}cal-btn`} type="button">26</button>
          <button className={`${prefix}btn ${prefix}cal-btn`} type="button">27</button>
          <button className={`${prefix}btn ${prefix}cal-btn`} type="button">28</button>

          <button className={`${prefix}btn ${prefix}cal-btn`} type="button">29</button>
          <button className={`${prefix}btn ${prefix}cal-btn`} type="button">30</button>
          <button className={`${prefix}btn ${prefix}cal-btn`} type="button">31</button>
        </div>
      </div>
    </div>
  </div>
</div>

<div className={`${prefix}b-example-divider`}></div>

<div className={`${prefix}d-flex ${prefix}flex-column ${prefix}flex-md-row ${prefix}p-4 ${prefix}gap-4 ${prefix}py-md-5 ${prefix}align-items-center ${prefix}justify-content-center`}>
  <div className={`${prefix}dropdown-menu ${prefix}position-static ${prefix}d-flex ${prefix}flex-column ${prefix}flex-lg-row ${prefix}align-items-stretch ${prefix}justify-content-start ${prefix}p-3 ${prefix}rounded-3 ${prefix}shadow-lg`} data-theme="light">
    <nav className={`${prefix}col-lg-8`}>
      <ul className={`${prefix}list-unstyled ${prefix}d-flex ${prefix}flex-column ${prefix}gap-2`}>
        <li>
          <a href="#" className={`${prefix}btn ${prefix}btn-hover-light ${prefix}rounded-2 ${prefix}d-flex ${prefix}align-items-start ${prefix}gap-2 ${prefix}py-2 ${prefix}px-3 ${prefix}lh-sm ${prefix}text-start`}>
            <svg className={`${prefix}bi`} width="24" height="24"><use xlinkHref="#image-fill"/></svg>
            <div>
              <strong className={`${prefix}d-block`}>Main product</strong>
              <small>Take a tour through the product</small>
            </div>
          </a>
        </li>
        <li>
          <a href="#" className={`${prefix}btn ${prefix}btn-hover-light ${prefix}rounded-2 ${prefix}d-flex ${prefix}align-items-start ${prefix}gap-2 ${prefix}py-2 ${prefix}px-3 ${prefix}lh-sm ${prefix}text-start`}>
            <svg className={`${prefix}bi`} width="24" height="24"><use xlinkHref="#music-note-beamed"/></svg>
            <div>
              <strong className={`${prefix}d-block`}>Another product</strong>
              <small>Explore this other product we offer</small>
            </div>
          </a>
        </li>
        <li>
          <a href="#" className={`${prefix}btn ${prefix}btn-hover-light ${prefix}rounded-2 ${prefix}d-flex ${prefix}align-items-start ${prefix}gap-2 ${prefix}py-2 ${prefix}px-3 ${prefix}lh-sm ${prefix}text-start`}>
            <svg className={`${prefix}bi`} width="24" height="24"><use xlinkHref="#question-circle"/></svg>
            <div>
              <strong className={`${prefix}d-block`}>Support</strong>
              <small>Get help from our support crew</small>
            </div>
          </a>
        </li>
      </ul>
    </nav>
    <div className={`${prefix}d-none ${prefix}d-lg-block ${prefix}vr ${prefix}mx-4 ${prefix}opacity-10`}>&nbsp;</div>
    <hr className={`${prefix}d-lg-none`}/>
    <div className={`${prefix}col-lg-auto ${prefix}pe-3`}>
      <nav>
        <ul className={`${prefix}d-flex ${prefix}flex-column ${prefix}gap-2 ${prefix}list-unstyled ${prefix}small`}>
          <li><a href="#" className={`${prefix}link-offset-2 ${prefix}link-underline ${prefix}link-underline-opacity-25 ${prefix}link-underline-opacity-75-hover`}>Documentation</a></li>
          <li><a href="#" className={`${prefix}link-offset-2 ${prefix}link-underline ${prefix}link-underline-opacity-25 ${prefix}link-underline-opacity-75-hover`}>Use cases</a></li>
          <li><a href="#" className={`${prefix}link-offset-2 ${prefix}link-underline ${prefix}link-underline-opacity-25 ${prefix}link-underline-opacity-75-hover`}>API status</a></li>
          <li><a href="#" className={`${prefix}link-offset-2 ${prefix}link-underline ${prefix}link-underline-opacity-25 ${prefix}link-underline-opacity-75-hover`}>Partners</a></li>
          <li><a href="#" className={`${prefix}link-offset-2 ${prefix}link-underline ${prefix}link-underline-opacity-25 ${prefix}link-underline-opacity-75-hover`}>Resources</a></li>
        </ul>
      </nav>
    </div>
  </div>

  <div className={`${prefix}dropdown-menu ${prefix}position-static ${prefix}d-flex ${prefix}flex-column ${prefix}flex-lg-row ${prefix}align-items-stretch ${prefix}justify-content-start ${prefix}p-3 ${prefix}rounded-3 ${prefix}shadow-lg`} data-theme="dark">
    <nav className={`${prefix}col-lg-8`}>
      <ul className={`${prefix}list-unstyled ${prefix}d-flex ${prefix}flex-column ${prefix}gap-2`}>
        <li>
          <a href="#" className={`${prefix}btn ${prefix}btn-hover-light ${prefix}rounded-2 ${prefix}d-flex ${prefix}align-items-start ${prefix}gap-2 ${prefix}py-2 ${prefix}px-3 ${prefix}lh-sm ${prefix}text-start`}>
            <svg className={`${prefix}bi`} width="24" height="24"><use xlinkHref="#image-fill"/></svg>
            <div>
              <strong className={`${prefix}d-block`}>Main product</strong>
              <small>Take a tour through the product</small>
            </div>
          </a>
        </li>
        <li>
          <a href="#" className={`${prefix}btn ${prefix}btn-hover-light ${prefix}rounded-2 ${prefix}d-flex ${prefix}align-items-start ${prefix}gap-2 ${prefix}py-2 ${prefix}px-3 ${prefix}lh-sm ${prefix}text-start`}>
            <svg className={`${prefix}bi`} width="24" height="24"><use xlinkHref="#music-note-beamed"/></svg>
            <div>
              <strong className={`${prefix}d-block`}>Another product</strong>
              <small>Explore this other product we offer</small>
            </div>
          </a>
        </li>
        <li>
          <a href="#" className={`${prefix}btn ${prefix}btn-hover-light ${prefix}rounded-2 ${prefix}d-flex ${prefix}align-items-start ${prefix}gap-2 ${prefix}py-2 ${prefix}px-3 ${prefix}lh-sm ${prefix}text-start`}>
            <svg className={`${prefix}bi`} width="24" height="24"><use xlinkHref="#question-circle"/></svg>
            <div>
              <strong className={`${prefix}d-block`}>Support</strong>
              <small>Get help from our support crew</small>
            </div>
          </a>
        </li>
      </ul>
    </nav>
    <div className={`${prefix}d-none ${prefix}d-lg-block ${prefix}vr ${prefix}mx-4 ${prefix}opacity-10`}>&nbsp;</div>
    <hr className={`${prefix}d-lg-none`}/>
    <div className={`${prefix}col-lg-auto ${prefix}pe-3`}>
      <nav>
        <ul className={`${prefix}d-flex ${prefix}flex-column ${prefix}gap-2 ${prefix}list-unstyled ${prefix}small`}>
          <li><a href="#" className={`${prefix}link-offset-2 ${prefix}link-underline ${prefix}link-underline-opacity-25 ${prefix}link-underline-opacity-75-hover`}>Documentation</a></li>
          <li><a href="#" className={`${prefix}link-offset-2 ${prefix}link-underline ${prefix}link-underline-opacity-25 ${prefix}link-underline-opacity-75-hover`}>Use cases</a></li>
          <li><a href="#" className={`${prefix}link-offset-2 ${prefix}link-underline ${prefix}link-underline-opacity-25 ${prefix}link-underline-opacity-75-hover`}>API status</a></li>
          <li><a href="#" className={`${prefix}link-offset-2 ${prefix}link-underline ${prefix}link-underline-opacity-25 ${prefix}link-underline-opacity-75-hover`}>Partners</a></li>
          <li><a href="#" className={`${prefix}link-offset-2 ${prefix}link-underline ${prefix}link-underline-opacity-25 ${prefix}link-underline-opacity-75-hover`}>Resources</a></li>
        </ul>
      </nav>
    </div>
  </div>
</div>


    </>
  )
}
