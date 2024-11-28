import './navbar.css'
export default function Navbar() {
  return (
    <div height="100%" className="navbar-1 w-[200px] bg-[#eeeeee]">
      <div className="navbar-9">
        <div tabIndex="0" className="navbar-10">
          <button aria-label="Hide navigation" className="navbar-11">
            <span color="body" size="3" className="navbar-12"
              ><svg viewBox="0 0 24 24" fill="none" className="navbar-13">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M5 4a1 1 0 00-1 1v14a1 1 0 001 1h3V4H5zm4-2H5a3 3 0 00-3 3v14a3 3 0 003 3h14a3 3 0 003-3V5a3 3 0 00-3-3H9zm1 2v16h9a1 1 0 001-1V5a1 1 0 00-1-1h-9zm6.707 10.707a1 1 0 000-1.414L15.414 12l1.293-1.293a1 1 0 00-1.414-1.414l-2 2a1 1 0 000 1.414l2 2a1 1 0 001.414 0z"
                  fill="currentColor"
                  className="navbar-14"
                ></path></svg
            ></span>
          </button>
        </div>
      </div>
      <div className="navbar-15">
        <div className="navbar-16">
          <div className="navbar-17">
            <div tabIndex="-1" className="navbar-18">
              <button id="workspaceDropdownHeader" className="navbar-19">
                <div className="navbar-20">
                  <div height="6" className="navbar-21">
                    <span size="4" className="navbar-22">J</span>
                  </div>
                </div>
                <div className="navbar-23">
                  <div width="100%" className="navbar-24">
                    <span className="navbar-25"
                      ><span fontWeight="bold" className="navbar-26"
                        >Jinling's Workspace</span
                      ><span color="bodyDimmed" fontWeight="book" className="navbar-27"
                        >1 member</span
                      ></span
                    ><span color="body" size="3" className="navbar-28"
                      ><svg viewBox="0 0 24 24" fill="none" className="navbar-29">
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M6.29289 9.29289C6.68342 8.90237 7.31658 8.90237 7.70711 9.29289L12 13.5858L16.2929 9.29289C16.6834 8.90237 17.3166 8.90237 17.7071 9.29289C18.0976 9.68342 18.0976 10.3166 17.7071 10.7071L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L6.29289 10.7071C5.90237 10.3166 5.90237 9.68342 6.29289 9.29289Z"
                          fill="currentColor"
                          className="navbar-30"
                        ></path></svg
                    ></span>
                  </div>
                </div>
              </button>
            </div>
            <div tabIndex="-1" className="navbar-31">
              <button id="navigationInviteTeammatesButton" className="navbar-32">
                <span className="navbar-33"
                  ><span className="navbar-34"
                    ><span color="currentColor" size="3" className="navbar-35"
                      ><svg viewBox="0 0 24 24" fill="none" className="navbar-36">
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M8.546 14.818a1 1 0 011-1h3.272a4.273 4.273 0 014.273 4.273v1.636a1 1 0 11-2 0v-1.636a2.273 2.273 0 00-2.273-2.273H9.546a1 1 0 01-1-1zM9.545 6a2.273 2.273 0 100 4.545 2.273 2.273 0 000-4.545zM5.273 8.273a4.273 4.273 0 118.545 0 4.273 4.273 0 01-8.545 0zM17.577 14.675a1 1 0 011.219-.719A4.273 4.273 0 0122 18.09v1.637a1 1 0 11-2 0v-1.636a2.272 2.272 0 00-1.704-2.198 1 1 0 01-.719-1.218zM14.304 4.858a1 1 0 011.217-.72 4.273 4.273 0 010 8.278 1 1 0 11-.496-1.937 2.273 2.273 0 000-4.404 1 1 0 01-.721-1.217zM5.454 20.727a1 1 0 01-1-1v-4.909a1 1 0 112 0v4.91a1 1 0 01-1 1z"
                          fill="currentColor"
                          className="navbar-37"
                        ></path>
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M8.91 17.273a1 1 0 01-1 1H3a1 1 0 110-2h4.91a1 1 0 011 1z"
                          fill="currentColor"
                          className="navbar-38"
                        ></path></svg></span
                  ></span>
                  <div className="navbar-39"></div>
                  <div className="navbar-40">
                    <span color="currentColor" fontWeight="bold" className="navbar-41"
                      >Invite teammates</span
                    >
                  </div></span
                >
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="navbar-42">
        <div className="navbar-43">
          <div id="intercom-destination-menu" className="navbar-44">
            <div tabIndex="-1" className="navbar-45">
              <a href="/home" className="navbar-46"
                ><div className="navbar-47">
                  <span className="navbar-48"
                    ><span color="currentColor" size="3" className="navbar-49"
                      ><svg viewBox="0 0 24 24" fill="none" className="navbar-50">
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M12.614 2.21a1 1 0 00-1.228 0l-8 6.223a1 1 0 00-.386.79V19a2.778 2.778 0 002.778 2.778h12.444A2.778 2.778 0 0021 19V9.222a1 1 0 00-.386-.79l-8-6.221zM5 19V9.711l7-5.444 7 5.444V19a.778.778 0 01-.778.778H15.6v-7.869c0-.502-.448-.909-1-.909H9.2c-.552 0-1 .407-1 .91v7.868H5.778A.778.778 0 015 19zm5.2.778h3.4v-6.96h-3.4v6.96z"
                          fill="currentColor"
                          className="navbar-51"
                        ></path></svg
                    ></span>
                    <div className="navbar-52"></div>
                    <span className="navbar-53"
                      ><span fontWeight="book" className="navbar-54">Home</span></span
                    ></span
                  >
                </div></a
              >
            </div>
            <div tabIndex="-1" className="navbar-55">
              <a aria-current="page" href="/looms" className="navbar-56"
                ><div className="navbar-57">
                  <span className="navbar-58"
                    ><span color="currentColor" size="3" className="navbar-59"
                      ><svg viewBox="0 0 24 24" fill="none" className="navbar-60">
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M5.79 5.658A2.663 2.663 0 018.448 3h9.95a2.663 2.663 0 012.658 2.658v9.95a2.663 2.663 0 01-2.658 2.658h-9.95a2.663 2.663 0 01-2.658-2.658v-9.95zM8.448 5a.663.663 0 00-.658.658v9.95c0 .36.298.658.658.658h9.95c.36 0 .658-.298.658-.658v-9.95A.663.663 0 0018.398 5h-9.95z"
                          fill="currentColor"
                          className="navbar-61"
                        ></path>
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M3 5.842a1 1 0 011 1v9.21a4 4 0 004 4h9.21a1 1 0 110 2H8a6 6 0 01-6-6v-9.21a1 1 0 011-1z"
                          fill="currentColor"
                          className="navbar-62"
                        ></path>
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M11.08 6.895a1 1 0 011.046.094l3.79 2.843a1 1 0 010 1.6l-3.79 2.842a1 1 0 01-1.6-.8V7.789a1 1 0 01.553-.894zm1.446 2.894v1.685l1.123-.842-1.123-.843z"
                          fill="currentColor"
                          className="navbar-63"
                        ></path></svg
                    ></span>
                    <div className="navbar-64"></div>
                    <span className="navbar-65"
                      ><span fontWeight="book" className="navbar-66"
                        >My Library</span
                      ></span
                    ></span
                  >
                </div></a
              >
            </div>
            <div tabIndex="-1" className="navbar-67">
              <a href="/notifications" className="navbar-68"
                ><div className="navbar-69">
                  <span className="navbar-70"
                    ><span color="currentColor" size="3" className="navbar-71"
                      ><svg viewBox="0 0 24 24" fill="none" className="navbar-72">
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M7.575 3.875A6.401 6.401 0 0118.502 8.4c0 3.003.643 4.86 1.229 5.935.294.54.58.892.776 1.099a2.618 2.618 0 00.263.243v.001a1 1 0 01-.567 1.823H4a1 1 0 01-.568-1.823h.001l.043-.034c.045-.038.122-.106.22-.21.196-.207.482-.56.776-1.1.586-1.074 1.228-2.93 1.228-5.934 0-1.698.675-3.326 1.875-4.526zM6.11 15.502h11.983a8.219 8.219 0 01-.118-.209c-.765-1.4-1.473-3.594-1.473-6.892a4.401 4.401 0 00-8.801 0c0 3.298-.709 5.491-1.473 6.892a8.57 8.57 0 01-.118.21zM10.042 19.238a1 1 0 011.367.363.8.8 0 001.385 0 1 1 0 011.73 1.004 2.8 2.8 0 01-4.845 0 1 1 0 01.363-1.367z"
                          fill="currentColor"
                          className="navbar-73"
                        ></path></svg
                    ></span>
                    <div className="navbar-74"></div>
                    <span className="navbar-75"
                      ><span fontWeight="book" className="navbar-76"
                        >Notifications</span
                      ></span
                    ></span
                  >
                </div></a
              >
            </div>
            <div tabIndex="-1" className="navbar-77">
              <a href="/watch-later" className="navbar-78"
                ><div className="navbar-79">
                  <span className="navbar-80"
                    ><span color="currentColor" size="3" className="navbar-81"
                      ><svg viewBox="0 0 24 24" fill="none" className="navbar-82">
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M7 4C6.73478 4 6.48043 4.10536 6.29289 4.29289C6.10536 4.48043 6 4.73478 6 5V19.0568L11.4188 15.1863C11.7665 14.9379 12.2335 14.9379 12.5812 15.1863L18 19.0568V5C18 4.73478 17.8946 4.48043 17.7071 4.29289C17.5196 4.10536 17.2652 4 17 4H7ZM4.87868 2.87868C5.44129 2.31607 6.20435 2 7 2H17C17.7956 2 18.5587 2.31607 19.1213 2.87868C19.6839 3.44129 20 4.20435 20 5V21C20 21.3746 19.7907 21.7178 19.4576 21.8892C19.1245 22.0606 18.7236 22.0315 18.4188 21.8137L12 17.2289L5.58124 21.8137C5.27642 22.0315 4.87549 22.0606 4.54242 21.8892C4.20935 21.7178 4 21.3746 4 21V5C4 4.20435 4.31607 3.44129 4.87868 2.87868Z"
                          fill="currentColor"
                          className="navbar-83"
                        ></path></svg
                    ></span>
                    <div className="navbar-84"></div>
                    <span className="navbar-85"
                      ><span fontWeight="book" className="navbar-86"
                        >Watch Later</span
                      ></span
                    ></span
                  >
                </div></a
              >
            </div>
            <div tabIndex="-1" className="navbar-87">
              <a href="/history" className="navbar-88"
                ><div className="navbar-89">
                  <span className="navbar-90"
                    ><span color="currentColor" size="3" className="navbar-91"
                      ><svg viewBox="0 0 24 24" fill="none" className="navbar-92">
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M12 5a7 7 0 100 14 7 7 0 000-14zm-9 7a9 9 0 1118 0 9 9 0 01-18 0z"
                          fill="currentColor"
                          className="navbar-93"
                        ></path>
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M12 6.2a1 1 0 011 1v4.182l2.647 1.324a1 1 0 01-.894 1.788l-3.2-1.6A1 1 0 0111 12V7.2a1 1 0 011-1z"
                          fill="currentColor"
                          className="navbar-94"
                        ></path></svg
                    ></span>
                    <div className="navbar-95"></div>
                    <span className="navbar-96"
                      ><span fontWeight="book" className="navbar-97"
                        >History</span
                      ></span
                    ></span
                  >
                </div></a
              >
            </div>
          </div>
          <div className="navbar-98">
            <button
              aria-expanded="false"
              aria-controls="settings-panel"
              className="navbar-99"
            >
              <span className="navbar-100"
                ><span color="currentColor" size="3" className="navbar-101"
                  ><svg viewBox="0 0 24 24" fill="none" className="navbar-102">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M12 10.545a1.455 1.455 0 100 2.91 1.455 1.455 0 000-2.91zM8.546 12a3.455 3.455 0 116.909 0 3.455 3.455 0 01-6.91 0z"
                      fill="currentColor"
                      className="navbar-103"
                    ></path>
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M12 4a.636.636 0 00-.636.636v.143A2.35 2.35 0 019.939 6.93a1 1 0 01-.245.07 2.35 2.35 0 01-2.402-.544l-.008-.008-.05-.05a.64.64 0 00-.9 0V6.4a.636.636 0 000 .9l.056.058a2.35 2.35 0 01.483 2.563 2.35 2.35 0 01-2.14 1.509h-.097a.636.636 0 100 1.273h.143a2.35 2.35 0 012.149 1.42 2.35 2.35 0 01-.472 2.586l-.008.008-.05.05a.64.64 0 00-.138.694.637.637 0 001.04.207l.057-.057a2.35 2.35 0 012.563-.483 2.35 2.35 0 011.509 2.14v.097a.636.636 0 101.273 0V19.22a2.351 2.351 0 011.42-2.149 2.349 2.349 0 012.586.472l.008.008.05.05a.64.64 0 00.694.138.636.636 0 00.206-.138V17.6a.637.637 0 000-.9l-.056-.058a2.35 2.35 0 01-.473-2.587 2.35 2.35 0 012.149-1.42h.078a.636.636 0 000-1.272H19.22a2.35 2.35 0 01-2.151-1.425 1 1 0 01-.07-.245 2.35 2.35 0 01.544-2.402l.008-.008.05-.05a.64.64 0 00.138-.694.637.637 0 00-.138-.206H17.6a.636.636 0 00-.9 0l-.058.056a2.35 2.35 0 01-2.587.472 2.35 2.35 0 01-1.42-2.148v-.078A.637.637 0 0012 4zm6.055 10.454l.914.404a.35.35 0 00.068.384l.043.043a2.637 2.637 0 010 3.73l-.706-.706.707.706a2.635 2.635 0 01-3.73 0l-.044-.044a.35.35 0 00-.383-.067l-.01.004a.35.35 0 00-.212.32v.136a2.636 2.636 0 11-5.273 0v-.059a.35.35 0 00-.229-.312 1.024 1.024 0 01-.058-.024.35.35 0 00-.384.068l-.043.043a2.64 2.64 0 01-2.875.573 2.637 2.637 0 01-.855-4.302l.044-.044a.35.35 0 00.067-.383l-.004-.01a.35.35 0 00-.32-.212h-.136a2.636 2.636 0 110-5.273h.058a.35.35 0 00.313-.229c.007-.02.015-.039.024-.058a.35.35 0 00-.068-.384l-.043-.043a2.636 2.636 0 113.73-3.73l.043.044a.35.35 0 00.383.067 1 1 0 01.159-.055.35.35 0 00.129-.268v-.137a2.636 2.636 0 015.272 0v.071a.35.35 0 00.213.32l.01.004a.35.35 0 00.383-.068l.043-.043a2.64 2.64 0 013.73-.001 2.635 2.635 0 010 3.73l-.044.044a.35.35 0 00-.067.383c.023.052.04.105.055.159a.349.349 0 00.268.129h.137a2.636 2.636 0 010 5.272h-.071a.35.35 0 00-.32.213l-.918-.395z"
                      fill="currentColor"
                      className="navbar-104"
                    ></path></svg
                ></span>
                <div className="navbar-105"></div>
                <span className="navbar-106"
                  ><span fontWeight="book" className="navbar-107">Settings</span></span
                >
                <div className="navbar-108"></div
              ></span>
            </button>
            <div id="settings-panel" hidden="" className="navbar-109">
              <a href="/settings/account" className="navbar-110"
                ><div className="navbar-111">
                  <div className="navbar-112"></div>
                  <div className="navbar-113"></div>
                  <span fontWeight="bold" className="navbar-114">Personal</span>
                </div></a
              ><a href="/settings/workspace" className="navbar-115"
                ><div className="navbar-116">
                  <div className="navbar-117"></div>
                  <div className="navbar-118"></div>
                  <span fontWeight="bold" className="navbar-119">Workspace</span>
                </div></a
              >
            </div>
          </div>
          <div className="navbar-120"><div className="navbar-121"></div></div>
          <div className="navbar-122">
            <div className="navbar-123">
              <div className="navbar-124">
                <span color="bodyDimmed" fontWeight="bold" className="navbar-125"
                  >Spaces</span
                >
              </div>
              <div className="navbar-126">
                <div tabIndex="-1" className="navbar-127">
                  <button aria-label="Create a Space" className="navbar-128">
                    <span color="body" size="2.25" className="navbar-129"
                      ><svg viewBox="0 0 24 24" fill="none" className="navbar-130">
                        <path
                          d="M18 13h-5v5c0 .55-.45 1-1 1s-1-.45-1-1v-5H6c-.55 0-1-.45-1-1s.45-1 1-1h5V6c0-.55.45-1 1-1s1 .45 1 1v5h5c.55 0 1 .45 1 1s-.45 1-1 1z"
                          fill="currentColor"
                          className="navbar-131"
                        ></path></svg
                    ></span>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div tabIndex="-1" className="navbar-132">
            <a href="/spaces/browse" className="navbar-133"
              ><div className="navbar-134">
                <span className="navbar-135"
                  ><span color="currentColor" size="3" className="navbar-136"
                    ><div className="navbar-137">
                      <div className="navbar-138">
                        <svg viewBox="0 0 24 24" fill="none" className="navbar-139">
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M11.111 5a6.111 6.111 0 100 12.222 6.111 6.111 0 000-12.222zM3 11.111a8.111 8.111 0 1116.222 0 8.111 8.111 0 01-16.222 0z"
                            fill="currentColor"
                            className="navbar-140"
                          ></path>
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M15.426 15.426a1 1 0 011.414 0l3.867 3.867a1 1 0 11-1.414 1.414l-3.867-3.867a1 1 0 010-1.414z"
                            fill="currentColor"
                            className="navbar-141"
                          ></path>
                        </svg>
                      </div></div
                  ></span>
                  <div className="navbar-142"></div>
                  <span className="navbar-143"
                    ><span fontWeight="book" className="navbar-144"
                      >Browse Spaces</span
                    ></span
                  ></span
                >
              </div></a
            >
          </div>
          <article className="navbar-145">
            <div className="navbar-146">
              <div tabIndex="-1" className="navbar-147">
                <div tabIndex="-1" className="navbar-148">
                  <a
                    href="/spaces/All-Jinlings-Workspace-26195752"
                    className="navbar-149"
                    ><div className="navbar-150">
                      <span className="navbar-151"
                        ><span color="currentColor" size="3" className="navbar-152"
                          ><div width="24px" height="24px" className="navbar-153">
                            <div className="navbar-154">
                              <span
                                color="blueDark"
                                fontWeight="bold"
                                className="navbar-155"
                                >A</span
                              >
                            </div>
                          </div></span
                        >
                        <div className="navbar-156"></div>
                        <span className="navbar-157"
                          ><span fontWeight="book" className="navbar-158"
                            >All Jinling's Workspace</span
                          ></span
                        >
                        <div width="18px" height="18px" className="navbar-159">
                          <div className="navbar-160">
                            <svg viewBox="0 0 24 24" fill="none" className="navbar-161">
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M12 5a7 7 0 100 14 7 7 0 000-14zm-9 7a9 9 0 1118 0 9 9 0 01-18 0z"
                                fill="currentColor"
                                className="navbar-162"
                              ></path>
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M13 11v5.2h-2V11h2zM10.5 8.8A1.5 1.5 0 0112 7.3h.01a1.5 1.5 0 010 3H12a1.5 1.5 0 01-1.5-1.5z"
                                fill="currentColor"
                                className="navbar-163"
                              ></path>
                            </svg>
                          </div></div
                      ></span></div
                  ></a>
                </div>
              </div>
            </div>
          </article>
          <div className="navbar-164"><div className="navbar-165"></div></div>
        </div>
      </div>
      <div className="navbar-166">
        <div className="navbar-167">
          <button className="navbar-168">
            <span className="navbar-169"
              ><span className="navbar-170"
                ><svg viewBox="0 0 31 30" fill="none" className="navbar-171">
                  <path
                    d="M30.01 13.43h-9.142l7.917-4.57-1.57-2.72-7.918 4.57 4.57-7.915-2.72-1.57-4.571 7.913V0h-3.142v9.139L8.863 1.225l-2.721 1.57 4.57 7.913L2.796 6.14 1.225 8.86l7.917 4.57H0v3.141h9.141l-7.916 4.57 1.57 2.72 7.918-4.57-4.571 7.915 2.72 1.57 4.572-7.914V30h3.142v-9.334l4.655 8.06 2.551-1.472-4.656-8.062 8.087 4.668 1.571-2.72-7.916-4.57h9.141v-3.14h.001zm-15.005 5.84a4.271 4.271 0 11-.001-8.542 4.271 4.271 0 01.001 8.542z"
                    fill="currentColor"
                    className="navbar-172"
                  ></path></svg
              ></span>
              <div className="navbar-173"></div>
              <span className="navbar-174"
                ><span fontWeight="bold" className="navbar-175"
                  >Record a video</span
                ></span
              ></span
            >
          </button>
        </div>
      </div>
    </div>
  )
}