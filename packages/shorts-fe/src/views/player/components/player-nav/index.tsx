import './player-nav.css'
import { RootState } from '@/stores';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function PlayerNav() {
  const { 
    playlet, video
  } = useSelector((state:RootState) => state.player)
  const navigate = useNavigate()
  const onBack = () => navigate(-1)
  return (
    <div className="player-nav-1">
      <span className="player-nav-2" onClick={onBack}></span>
      <span className="player-nav-3">{playlet.title} ({video.num}/{playlet.episodes})</span>
    </div>
  )
}