import React, { useRef } from 'react'

export default function CategoryForm({handleOnSubmit , name , setName}) {

  return (
    <div className='m-3'>
      <form onSubmit={handleOnSubmit}>
  <div className="mb-3">
    {/* <label for="exampleInputEmail1" className="form-label">Enter </label> */}
    <input type="text" className="form-control" id="exampleInputEmail1" placeholder='Enter Category' value={name}  onChange={(e)=>{setName(e.target.value)}}/>
    </div>
    <button type="submit" className="btn btn-primary">Submit</button>
</form>
    </div>
  )
}
