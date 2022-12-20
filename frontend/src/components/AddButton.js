import React from 'react'
import { MdNoteAdd  } from "react-icons/md"
import { Link } from 'react-router-dom'

const AddButton = () => {
  return (
    <Link to='/note/new' className='floating-button'>
        <MdNoteAdd />
    </Link>
  )
}

export default AddButton
