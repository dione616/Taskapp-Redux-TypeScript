import React, { useRef, useState, useEffect } from "react"
import "./Recorder.css"
import { useDispatch, useSelector } from "react-redux"
import { start, selectDateStart, stop } from "../../redux/recorder"
import { RootState } from "../../redux/store"
import cx from "classnames"
import { addZero } from "../../lib/utils"
import { createUserEvent } from "../../redux/user-events"

const Recorder = () => {
  const dispatch = useDispatch()
  const dateStart = useSelector(selectDateStart)
  const started = dateStart !== ""
  const [, setCount] = useState<number>(0)

  let interval = useRef<number>(0)

  const handleClick = () => {
    if (started) {
      window.clearInterval(interval.current)
      dispatch(createUserEvent())
      dispatch(stop())
    } else {
      dispatch(start())
      interval.current = window.setInterval(() => {
        setCount((count) => count + 1)
      }, 1000)
    }
  }

  useEffect(() => {
    return () => {
      window.clearInterval(interval.current)
    }
  }, [])

  let seconds = started ? Math.floor((Date.now() - new Date(dateStart).getTime()) / 1000) : 0
  let hours = seconds ? Math.floor(seconds / 60 / 60) : 0
  seconds -= hours * 60 * 60 //back to original seconds
  let minutes = seconds ? Math.floor(seconds / 60) : 0
  seconds -= minutes * 60 //back to original seconds

  return (
    <div className={cx("recorder", { "recorder-started": started })}>
      <button onClick={handleClick} className="recorder-record">
        <span></span>
      </button>
      <div className="recorder-counter">
        {addZero(hours)}:{addZero(minutes)}:{addZero(seconds)}
      </div>
    </div>
  )
}

export default Recorder
