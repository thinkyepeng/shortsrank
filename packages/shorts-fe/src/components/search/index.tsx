import { FC } from "react"
import './search.css'

const Search: FC = () => {
  return (
    <header className="box-border sticky search-1">
      <div className="box-border search-2">
        <ul className="p-0 box-border items-center flex justify-items-center search-3">
          <li className="box-border search-4">
            <div className="box-border search-5">
              <div className="box-border block align-middle search-6">
                <button
                  aria-label="Toggle library navigation"
                  className="m-0 box-border appearance-none cursor-pointer p-0 relative inline-flex justify-center items-center align-middle search-7"
                >
                  <span
                    color="body"
                    className="box-border block search-8"
                    ><svg
                      viewBox="0 0 24 24"
                      fill="none"
                      className="box-border block search-9"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M3 12.333a1 1 0 011-1h16a1 1 0 110 2H4a1 1 0 01-1-1zM3 7a1 1 0 011-1h16a1 1 0 110 2H4a1 1 0 01-1-1zM3 17.667a1 1 0 011-1h16a1 1 0 010 2H4a1 1 0 01-1-1z"
                        fill="currentColor"
                        className="box-border search-10"
                      ></path></svg></span>
                </button>
              </div>
            </div>
          </li>
          <li className="box-border w-full search-11">
            <div
              className="box-border block align-middle search-12"
            >
              <div
                id="intercom-destination-search-bar"
                className="box-border search-13"
              >
                <div className="box-border relative w-full search-14">
                  <div
                    className="box-border absolute pointer-events-none h-full flex items-center justify-center search-15"
                  >
                    <span
                      color="var(--lns-color-body)"
                      className="box-border block search-16"
                      ><span
                        color="grey6"
                        className="box-border block search-17"
                        ><svg
                          viewBox="0 0 24 24"
                          fill="none"
                          className="box-border block search-18"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M11.111 5a6.111 6.111 0 100 12.222 6.111 6.111 0 000-12.222zM3 11.111a8.111 8.111 0 1116.222 0 8.111 8.111 0 01-16.222 0z"
                            fill="currentColor"
                            className="box-border search-19"
                          ></path>
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M15.426 15.426a1 1 0 011.414 0l3.867 3.867a1 1 0 11-1.414 1.414l-3.867-3.867a1 1 0 010-1.414z"
                            fill="currentColor"
                            className="box-border search-20"
                          ></path></svg></span></span>
                  </div>
                  <input
                    type="text"
                    placeholder="Search for people, tags, folders, Spaces, and Looms"
                    className="box-border appearance-none w-full cursor-pointer search-21"
                  />
                </div>
              </div>
            </div>
          </li>
          <li className="box-border flex items-center search-22"></li>
          <li className="box-border search-23">
            <button
              type="button"
              id="persistentUpgradeButton"
              className="m-0 box-border appearance-none items-center justify-center align-middle whitespace-nowrap font-bold inline-flex cursor-pointer search-24"
            >
              <span className="box-border search-25"
                ><span
                  color="currentColor"
                  className="box-border block search-26"
                  ><svg
                    viewBox="4.000374794006348 0 16.399250030517578 24"
                    fill="none"
                    className="box-border block search-27"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M13.398 3.083a1 1 0 01.594 1.041l-.66 5.276H19.4a1 1 0 01.768 1.64l-8 9.6a1 1 0 01-1.76-.764l.66-5.276H5a1 1 0 01-.768-1.64l8-9.6a1 1 0 011.166-.277z"
                      fill="currentColor"
                      className="box-border search-28"
                    ></path></svg></span></span><span className="box-border search-29">Upgrade</span>
            </button>
          </li>
        </ul>
      </div>
      <div id="profileBubble" className="box-border flex absolute search-30">
        <div className="box-border search-31"></div>
        <div className="box-border search-32">
          <div
            className="box-border flex items-center flex-nowrap search-33"
          >
            <div className="box-border search-34">
              <ul className="box-border flex items-center search-35">
                <li className="box-border flex search-36">
                  <div
                    id="intercom-destination-avatar"
                    className="box-border relative search-37"
                  >
                    <div
                      className="box-border inline-block align-middle search-38"
                    >
                      <button
                        className="box-border cursor-pointer flex relative search-39"
                      >
                        <span
                          className="box-border overflow-hidden flex items-center justify-center font-bold relative search-40"
                          >J</span>
                      </button>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div
            className="box-border items-end flex flex-col-reverse fixed search-41"
          >
            <div className="box-border block align-middle search-42">
              <div className="box-border search-43">
                <button
                  className="box-border cursor-pointer flex items-center justify-center search-44"
                >
                  <span
                    color="body"
                    className="box-border block font-normal search-45"
                    >?</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Search