import React from 'react'

export default function Sidebar() {
  return (
    <div className=' d-flex flex-column w-25 container mt-3 family'>
    <h6 className='H'>Filter by price</h6>
    <div className='family'>
      <Radio.Group onChange={e=>{setRadio(e.target.value)}}>
      {
      Price.map((p) => (
        <div key={p._id} className='family'>
        <Radio value={p.array} >{p.name}</Radio></div>
      ))
    }
      </Radio.Group>
    
    </div>
    <div className='d-flex flex-column family'>
      <h6 className='H'>Filter by categories</h6>
    {
      categories.map((c) => (
        <Checkbox key={c._id} onChange={(e) => handleFilter(e.target.checked , c._id)}>
          {c.name}
        </Checkbox>
      ))
    }
    </div>
    <button type="button" className="btn btn-danger" onClick={()=>{window.location.reload()}}>Reset All</button>
  </div>
  )
}
