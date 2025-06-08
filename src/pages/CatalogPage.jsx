import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  loadCampers,
  setPage,
  resetCampers,
  setFilters,
} from '../features/campersSlice'
import {
  setLocation,
  setForm,
  toggleEquipment,
} from '../features/filtersSlice'
import { Link } from 'react-router-dom'
import './CatalogPage.css'

const CatalogPage = () => {
  const dispatch = useDispatch()

  const campers = useSelector(state => state.campers)
  const filtersSlice = useSelector(state => state.filters)

  const location = filtersSlice?.location || ''
  const form = filtersSlice?.form || ''
  const equipment = filtersSlice?.equipment || {}

  const filters = {
    location,
    form,
    ...equipment,
  }

  const page = campers.page || 1
  const list = campers.list || []
  const status = campers.status
  const error = campers.error

  useEffect(() => {
    if (status === 'idle') {
      dispatch(loadCampers({ page: 1, filters }))
    }
  }, [dispatch, status])

  const handleLocationChange = (e) => dispatch(setLocation(e.target.value))
  const handleFormChange = (e) => dispatch(setForm(e.target.value))
  const handleEquipmentToggle = (key) => dispatch(toggleEquipment(key))

  const handleApplyFilters = () => {
    dispatch(resetCampers())
    dispatch(setPage(1))
    dispatch(setFilters(filters))
    dispatch(loadCampers({ page: 1, filters }))
  }

  const handleLoadMore = () => {
    const nextPage = page + 1
    dispatch(setPage(nextPage))
    dispatch(loadCampers({ page: nextPage, filters }))
  }

  if (status === 'loading' && list.length === 0)
    return <div style={{ padding: 16 }}>Loading…</div>
  if (status === 'failed') return <div style={{ padding: 16 }}>Error: {error}</div>

  return (
    <div className="catalog">
      {/* Filters */}
      <div style={{ marginBottom: 24 }}>
        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={handleLocationChange}
          style={{ marginRight: 8 }}
        />

        <select value={form} onChange={handleFormChange} style={{ marginRight: 8 }}>
          <option value="">All types</option>
          <option value="alcove">Alcove</option>
          <option value="fullyIntegrated">Fully Integrated</option>
          <option value="panelTruck">Panel Truck</option>
        </select>

        {['AC', 'kitchen', 'bathroom', 'TV'].map((item) => (
          <label key={item} style={{ marginRight: 8 }}>
            <input
              type="checkbox"
              checked={equipment[item] || false}
              onChange={() => handleEquipmentToggle(item)}
            />{' '}
            {item}
          </label>
        ))}

        <button onClick={handleApplyFilters} style={{ marginLeft: 8 }}>
          Apply Filters
        </button>
      </div>

      {/* Campers */}
      {list.length === 0 ? (
        <p>No campers found</p>
      ) : (
        <>
          {list.map((camper) => (
            <div key={camper.id} className="card">
              <img
                src={camper.gallery?.[0]?.thumb}
                alt={camper.name}
                className="card-img"
              />
              <div className="card-body">
                <div>
                  <h2 className="card-title">{camper.name}</h2>
                  <p className="card-price">
                    €{parseFloat(camper.price).toFixed(2).replace('.', ',')}
                  </p>
                  <p className="card-desc">
                    {camper.description?.slice(0, 80)}...
                  </p>
                </div>
                <Link
                  to={`/catalog/${camper.id}`}
                  target="_blank"
                  className="card-btn"
                >
                  Show more
                </Link>
              </div>
            </div>
          ))}

          <div style={{ marginTop: 24 }}>
            <button onClick={handleLoadMore}>Load More</button>
          </div>
        </>
      )}
    </div>
  )
}

export default CatalogPage
