import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { fetchCamperById, postBooking } from '../api/campersApi.js'

export default function CamperDetailPage() {
  const { id } = useParams()
  const [camper, setCamper] = useState(null)
  const [tab, setTab] = useState('features')
  const [form, setForm] = useState({ name: '', email: '', date: '', comment: '' })

  useEffect(() => {
    fetchCamperById(id).then(setCamper)
  }, [id])

  if (!camper) return <div>Loading details…</div>

  const submit = e => {
    e.preventDefault()
    postBooking(id, form).then(() => {
      alert('Booked!')
      setForm({ name: '', email: '', date: '', comment: '' })
    })
  }

  const features = [
    'transmission', 'engine', 'AC', 'bathroom',
    'kitchen', 'TV', 'radio', 'refrigerator',
    'microwave', 'gas', 'water'
  ]

  return (
    <div style={{ padding: 24 }}>
      <h1>{camper.name}</h1>
      <div style={{ display: 'flex', gap: 16, marginBottom: 16 }}>
        {camper.gallery.map((g,i) => (
          <img key={i} src={g.original} alt="" style={{ width: 150, borderRadius: 8 }} />
        ))}
      </div>

      <nav style={{ marginBottom: 16 }}>
        {['features','reviews'].map(x => (
          <button
            key={x}
            onClick={() => setTab(x)}
            style={{
              marginRight: 8,
              padding: '8px 16px',
              background: tab === x ? '#e76f51' : '#f0f0f0',
              color: tab === x ? '#fff' : '#000',
              border: 'none',
              borderRadius: 4,
              cursor: 'pointer'
            }}
          >
            {x.charAt(0).toUpperCase() + x.slice(1)}
          </button>
        ))}
      </nav>

      {tab === 'features' && (
        <div style={{ display: 'flex', gap: 24 }}>
          <div style={{ flex: 1 }}>
            <p>{camper.description}</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 16 }}>
              {features.map(f =>
                camper[f] ? (
                  <span key={f} style={{ padding: '4px 8px', background: '#f0f0f0', borderRadius: 4 }}>
                    {f}
                  </span>
                ) : null
              )}
            </div>
            <dl style={{ background: '#fafafa', padding: 16, borderRadius: 8 }}>
              <dt>Form</dt><dd>{camper.form}</dd>
              <dt>Length</dt><dd>{camper.length}</dd>
              <dt>Width</dt><dd>{camper.width}</dd>
              <dt>Height</dt><dd>{camper.height}</dd>
              <dt>Tank</dt><dd>{camper.tank}</dd>
              <dt>Consumption</dt><dd>{camper.consumption}</dd>
            </dl>
          </div>
          <form onSubmit={submit} style={{ flex:1, display:'flex', flexDirection:'column', gap:8 }}>
            <input
              required placeholder="Name*" value={form.name}
              onChange={e=>setForm({...form,name:e.target.value})}
            />
            <input
              required placeholder="Email*" value={form.email}
              onChange={e=>setForm({...form,email:e.target.value})}
            />
            <input
              required type="date" value={form.date}
              onChange={e=>setForm({...form,date:e.target.value})}
            />
            <textarea
              placeholder="Comment" value={form.comment}
              onChange={e=>setForm({...form,comment:e.target.value})}
            />
            <button type="submit" style={{ marginTop:16 }}>Send</button>
          </form>
        </div>
      )}

      {tab === 'reviews' && (
        <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
          {camper.reviews.map((r,i) => (
            <div key={i} style={{ background:'#fafafa', padding:16, borderRadius:8 }}>
              <strong>{r.reviewer_name}</strong> ⭐ {r.reviewer_rating}
              <p>{r.comment}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
