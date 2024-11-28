import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import { useRef, useEffect, useState } from 'react';
import Player from 'video.js/dist/types/player';
import './player.css'
import { usePageDataOnce } from './hook'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/stores';
import TabsTitle from '@/components/tabs-title'
import VideoButton from '@/components/video-button'
import { VideoType } from '@/types/data';
import cx from 'classnames'
import UnlockModal from './components/unlock-modal';
import { updateTabId, gotoVideo, updateClickStatus, updateNextCount } from './store'
import { useNavigate } from 'react-router-dom';
import PlayerNav from './components/player-nav'
import PlayerSelect from './components/player-select'
import useWindowSize from '@/hooks/useWindowSize'

type ClickType = (evt: React.MouseEvent<HTMLElement>, value:number) => void
type ClickButtonType = (item: VideoType) => void

export default function PlayerPage() {
  usePageDataOnce()
  const { 
    playlet, video, playerCount, videos, tabId, videoId, visible, nextCount
  } = useSelector((state:RootState) => state.player)
  const { isMobile } = useWindowSize({isClient: true})
  const [open, setOpen] = useState(isMobile ? false: true)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const tabVideos = videos[tabId]?.videos || []
  const videoRef = useRef(null);
  const playerRef = useRef(null as (Player|null));
  const videoLink = video.link || ''
  const options = {
    autoplay: true,
    muted: false,
    controls: true,
    responsive: true,
    fluid: true,
    preload: 'auto',
    playsinline: true,
    sources: [{
      src: videoLink,
      type: videoLink.slice(-4) === 'm3u8' ? 'application/x-mpegURL': 'video/mp4'
    }]
  }
  const tabOptions = videos.map(x => ({label: x.label, value: x.label}))
  const handleClick:ClickType = (evt, v) => {
    dispatch(updateTabId(v))
  }
  const onClickButton:ClickButtonType = (item) => {
    dispatch(updateClickStatus(true))
    dispatch(gotoVideo(item.id))
  }
  const toNextVideo = () => {
    const index = videos[tabId].videos.findIndex(x => x.id === videoId)
    const total = videos[tabId].videos.length - 1
    if (index === total && videos.length > tabId + 1) {
      const nextTabId = tabId + 1
      const nextVideoId = videos[nextTabId].videos[0].id
      dispatch(updateTabId(nextTabId))
      dispatch(gotoVideo(nextVideoId))
    } else if (index < total) {
      dispatch(gotoVideo(videos[tabId].videos[index+1].id))
    }
  }
  const toPrevVideo = () => {
    const index = videos[tabId].videos.findIndex(x => x.id === videoId)
    if (index === 0 && tabId > 0) {
      const prevTabId = tabId - 1
      const prevVideos = videos[prevTabId].videos
      const prevVideoId = prevVideos[prevVideos.length - 1].id
      dispatch(updateTabId(prevTabId))
      dispatch(gotoVideo(prevVideoId))
    } else if (index > 0) {
      dispatch(gotoVideo(videos[tabId].videos[index - 1].id))
    }
  }
  const handleBack = () => {
    navigate(-1)
  }
  const toggleSidebar = () => setOpen(!open)
  const openMenu = () => setOpen(true)
  const closeMenu = () => setOpen(false)
  const onReady = () => {}
  const handleEnded = () => {
    dispatch(updateClickStatus(false))
    dispatch(updateNextCount())
  }
  useEffect(() => {
    if (nextCount > 0) {
      toNextVideo()
    }
  }, [nextCount])
  useEffect(() => {
    if (playerCount < 1) {
      return
    }
    // Make sure Video.js player is only initialized once
    if (!playerRef.current) {
      // The Video.js player needs to be _inside_ the component el for React 18 Strict Mode. 
      const videoElement = document.createElement("video-js");

      videoElement.classList.add('vjs-big-play-centered');
      (videoRef.current! as HTMLElement).appendChild(videoElement);

      playerRef.current = videojs(videoElement, options, () => {
        videojs.log('player is ready');
        onReady && onReady();
      });
      playerRef.current.on('ended', handleEnded)

    // You could update an existing player in the `else` block here
    // on prop change, for example:
    } else {
      const player = playerRef.current;
      player.autoplay(options.autoplay);
      player.src(options.sources);
      if (isMobile) {
        setOpen(false)
      }
    }
  }, [playerCount]);
  useEffect(() => {
    if (isMobile && playerRef.current) {
      if (open) {
        playerRef.current.pause()
      } else {
        playerRef.current.play()
      }
    }
  }, [open])
  return (
    <div className="page-player-3">
      <div className="page-player-4">
        <div className="page-player-5">
          <div className="page-player-6">
            <div className="page-player-7" onClick={handleBack}>
              <i className="page-player-8"></i>
            </div>
            <PlayerNav />
            <div className="page-player-9">
              <div className="page-player-10"></div>
            </div>
            <div id="videoPlayer" className="page-player-11">
              <div className="page-player-12">
                {playlet.title}
              </div>
              <div id='video-box' className='page-player-13'>
                <div id='fire-video' className='page-player-14' ref={videoRef}></div>
              </div>
              <div className="page-player-239">
                <div className="page-player-240" onClick={toPrevVideo}>
                  <i className="page-player-241"></i>
                </div>
                <div className="page-player-242" onClick={toNextVideo}>
                  <i className="page-player-243"></i>
                </div>
              </div>
            </div>
            <PlayerSelect total={playlet.episodes} onClick={openMenu} />
          </div>
          <div className={cx("page-player-244", open ? 'open': 'closed')}>
            <div className={cx("page-player-245", {close: !open})} onClick={toggleSidebar}>
              <i className={cx("page-player-246", {close: !open})}></i>
            </div>
            <div className="page-player-247">
              <span  className="page-player-248 flex justify-between">
                <span>{playlet.title}</span>
                <span className='text-white ml-1 md:hidden' onClick={closeMenu}>×</span>
              </span>
              <span  className="page-player-254">{playlet.intro}</span>
              <div className="page-player-256">
              <div>
                <TabsTitle options={tabOptions} value={tabId} onClick={handleClick} />
                <div className='flex flex-wrap'>
                  {tabVideos.map((item) => (
                    <VideoButton key={item.id} size='small'
                      playing={item.id === videoId}
                      data={item} handleClick={onClickButton} />
                  ))}
                </div>
              </div>
              </div>
            </div>
          </div>
          <div className="page-player-280">
            <div className="page-player-281">
              <div
                role="dialog"
                className="page-player-282"
              ></div>
            </div>
          </div>
          <div className="page-player-283">
            <div className="page-player-284">
              <div
                role="dialog"
                className="page-player-285"
              ></div>
            </div>
          </div>
        </div>
      </div>
      <UnlockModal visible={visible} />
    </div>
  )
}