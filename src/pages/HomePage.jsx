import React from 'react'
import { useNavigate } from 'react-router-dom'
import banner from '../assets/home-banner.jpg'

const HomePage = () => {
  const navigate = useNavigate()
  return (
    <div style={{
      backgroundImage: `url(${banner})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      height: 'calc(100vh - 60px)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'flex-start',
      padding: '0 16px'
    }}>
      <h1 style={{ color: '#fff', fontSize: '48px', margin: 0 }}>Campers of your dreams</h1>
      <p style={{ color: '#fff', fontSize: '18px' }}>You can find everything you want in our catalog</p>
      <button onClick={() => navigate('/catalog')} style={{
        marginTop: '16px',
        background: '#e76f51',
        color: '#fff',
        border: 'none',
        padding: '12px 24px',
        borderRadius: '24px',
        cursor: 'pointer'
      }}>
        View Now
      </button>
    </div>
  )
}

export default HomePage
