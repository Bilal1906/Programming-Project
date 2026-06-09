'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function FirstTimePage() {
  const [code, setCode] = useState('')
  const [nieuwWachtwoord, setNieuwWachtwoord] = useState('')
  const [bevestigWachtwoord, setBevestigWachtwoord] = useState('')
  const router = useRouter()

  const handleBevestigen = async (e) => {
  e.preventDefault()
  if (nieuwWachtwoord !== bevestigWachtwoord) {
    alert('Wachtwoorden komen niet overeen!')
    return
  }
  router.push('/login')
}

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f0f2f5',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <div style={{
        backgroundColor: 'white',
        padding: '2.5rem',
        borderRadius: '12px',
        width: '100%',
        maxWidth: '420px',
        boxShadow: '0 2px 12px rgba(0,0,0,0.08)'
      }}>

        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.5rem' }}>
          <svg width="36" height="36" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
            <rect width="120" height="120" rx="20" fill="#1a2340"/>
            <path d="M50 45 A30 30 0 1 0 50 75" fill="none" stroke="white" strokeWidth="9" strokeLinecap="round"/>
            <polyline points="65,68 75,80 95,55" fill="none" stroke="#4ade80" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span style={{ fontWeight: '600', fontSize: '1.1rem' }}>Competent</span>
        </div>

        <h1 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '0.25rem' }}>
          Wachtwoord instellen
        </h1>
        <p style={{ color: '#666', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
          Stel uw wachtwoord in om toegang te krijgen
        </p>

        <form onSubmit={handleBevestigen}>

          {/* Code */}
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.9rem' }}>
              Ontvangen code
            </label>
            <input
              type="text"
              placeholder="Code uit uw uitnodigingsmail"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              style={{
                width: '100%',
                padding: '0.65rem 0.9rem',
                border: '1px solid #ddd',
                borderRadius: '6px',
                fontSize: '0.95rem',
                boxSizing: 'border-box'
              }}
            />
          </div>

          {/* Nieuw wachtwoord */}
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.9rem' }}>
              Nieuw wachtwoord
            </label>
            <input
              type="password"
              placeholder="Kies een wachtwoord"
              value={nieuwWachtwoord}
              onChange={(e) => setNieuwWachtwoord(e.target.value)}
              style={{
                width: '100%',
                padding: '0.65rem 0.9rem',
                border: '1px solid #ddd',
                borderRadius: '6px',
                fontSize: '0.95rem',
                boxSizing: 'border-box'
              }}
            />
          </div>

          {/* Bevestig wachtwoord */}
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.9rem' }}>
              Bevestig wachtwoord
            </label>
            <input
              type="password"
              placeholder="Herhaal uw wachtwoord"
              value={bevestigWachtwoord}
              onChange={(e) => setBevestigWachtwoord(e.target.value)}
              style={{
                width: '100%',
                padding: '0.65rem 0.9rem',
                border: '1px solid #ddd',
                borderRadius: '6px',
                fontSize: '0.95rem',
                boxSizing: 'border-box'
              }}
            />
          </div>

          {/* Knop */}
          <button
            type="submit"
            style={{
              width: '100%',
              padding: '0.75rem',
              backgroundColor: '#1a56db',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: 'pointer'
            }}
          >
            Bevestigen →
          </button>

        </form>
      </div>
    </div>
  )
}