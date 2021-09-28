import dayjs from '@/plugins/dayjs'
import React from 'react'
import { colors } from '@material-ui/core'

type Column = {
  field: string
  headerName: string
  align?: 'inherit' | 'left' | 'center' | 'right' | 'justify'
  width?: number | string
  getter?: (value: string|number) => React.ReactNode
}

export const generateColumns = (t): Column[] => [
  {
    field: 'date',
    headerName: '日付',
    width: 112,
    getter: date => dayjs(date).format('D日（dd）'),
  },
  {
    field: 'attendanceAt',
    headerName: '開始時刻',
    width: 96,
    getter: date => date && dayjs(date).format('HH:mm'),
  },
  {
    field: 'leavingAt',
    headerName: '終了時刻',
    width: 96,
    getter: date => date && dayjs(date).format('HH:mm'),
  },
  {
    field: 'rest',
    headerName: '休憩',
    width: 80,
    getter: minutes => minutes && minutes + t('minutes'),
  },
  {
    field: 'summary',
    headerName: '作業時間',
    width: 112,
    getter: hours => hours && hours + t('hours'),
  },
  {
    field: 'comment',
    headerName: '作業内容',
    align: 'left',
    getter: (comment: string) => React.createElement(React.Fragment, {
      children: comment?.split(/(\n)/g).map((line, index) =>
        line.match(/(\n)/g) ? React.createElement('br', { key: index }) : line)
    }),
  },
]

const weeks = {
  SUNDAY: 0,
  MONDAY: 1,
  TUESDAY: 2,
  WEDNESDAY: 3,
  THURSDAY: 4,
  FRIDAY: 5,
  SATURDAY: 6,
}

export const rowStyle = targetDate => {
  const style: React.CSSProperties = { verticalAlign: 'top' }
  switch (dayjs(targetDate).day()) {
    case weeks.SUNDAY:
      style.color = colors.red['500']
      break
    case weeks.SATURDAY:
      style.color = colors.blue['500']
      break
  }

  return style
}
