import { useEffect, useState } from 'react'
import { useTime } from 'react-timer-hook'
import { Paper } from '@material-ui/core'
import Formatter from '@/helpers/Formatter'

const Timer = () => {
  const {
    hours,
    minutes,
    seconds,
  } = useTime({})
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <Paper
      variant="outlined"
      style={{
        fontSize: '100px',
        paddingTop: '8px',
        textAlign: 'center',
      }}
    >
      {
        mounted && <span>{ Formatter.leftPad(hours, 2, '0') }:{ Formatter.leftPad(minutes, 2, '0') }:{ Formatter.leftPad(seconds, 2, '0') }</span>
      }
    </Paper>
  )
}

export default Timer
