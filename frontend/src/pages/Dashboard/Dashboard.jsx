import React, { useState, useEffect } from 'react'
import './Dashboard.css'
import Navbar from './Navbar/Navbar'
import LoadingScreen from './LoadingScreen/LoadingScreen'
import { useNavigate } from 'react-router-dom'
import { getThisUser } from '../../api/auth'
import Gallery from './Gallery/Gallery'

const Dashboard = () => {
  const navigate = useNavigate()

  const [profileLoading, setProfileLoading] = useState(false)
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')

  const [currentSong, setCurrentSong] = useState(undefined)

  useEffect(() => {
    if (profileLoading) return

    async function fetchData() {
      try {
        setProfileLoading(true)
        const response = await getThisUser()
        console.log('response', response)
        if (!response.email) {
          navigate('/auth')
          return
        }
        console.log(response)
        setUsername(response.username)
        setEmail(response.email)
      } catch (error) {
        console.error('Error fetching user data:', error)
      } finally {
        setProfileLoading(false)
      }
    }

    fetchData()
  }, [navigate]) // Removed profileLoading from dependency array

  return (
    <div id="dashboard">
      {profileLoading && <LoadingScreen />}
      {!profileLoading && (
        <>
          <Navbar
            email={email}
            username={username}
            onSongSelect={setCurrentSong}
          />
          <Gallery song={currentSong} />
        </>
      )}
    </div>
  )
}

export default Dashboard
