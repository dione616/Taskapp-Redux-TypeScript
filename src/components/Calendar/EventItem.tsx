import React, { useState, useRef, useEffect } from "react"
import "./Calendar.css"
import { UserEvent, deleteUserEvent, updateUserEvent } from "../../redux/user-events"
import { useDispatch } from "react-redux"

interface Props {
  event: UserEvent
}

const EventItem: React.FC<Props> = ({ event }) => {
  const [editable, setEditable] = useState(false)
  const [title, setTitle] = useState(event.title)
  const [image, setImage] = useState(event.image)

  const dispatch = useDispatch()
  const handleDeleteClick = () => {
    dispatch(deleteUserEvent(event.id))
  }
  const handleTitleClick = () => {
    setEditable(true)
  }
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value)
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImage(e.target.value)
  }

  const handleBlur = () => {
    if (title !== event.title || image !== event.image || !image?.length) {
      dispatch(updateUserEvent({ ...event, title, image }))
    }
    setEditable(false)
  }
  const inputRef = useRef<HTMLInputElement>(null)
  const inputImageRef = useRef<HTMLInputElement>(null)
  useEffect(() => {
    if (editable) {
      inputRef.current?.focus()
    }
    return () => {}
  }, [editable])
  const dateStart = new Date(event.dateStart).toLocaleTimeString()
  const dateEnd = new Date(event.dateEnd).toLocaleTimeString()

  const sectionStyle = {
    backgroundImage: "url(" + event.image + ")",
  }

  return (
    <div className="calendar-event" key={event.id} style={sectionStyle}>
      <div className="calendar-event-info">
        <div className="calendar-event-time">
          {dateStart}-{dateEnd}
        </div>
        <div className="calendar-event-title">
          {editable ? (
            <input onChange={handleChange} onBlur={handleBlur} type="text" value={title} ref={inputRef}></input>
          ) : (
            <span onClick={handleTitleClick}>{event.title}</span>
          )}
        </div>
      </div>
      <button onClick={handleDeleteClick} className="calendar-event-delete-button">
        &times;
      </button>
      <div className="calendar-event-image">
        <input
          onChange={handleImageChange}
          placeholder="ImageURL"
          onBlur={handleBlur}
          type="text"
          ref={inputImageRef}
        ></input>
      </div>
    </div>
  )
}

export default EventItem
