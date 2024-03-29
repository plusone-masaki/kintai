import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from 'firebase/firestore/lite'
import { db } from '@/plugins/firebase'
import { Attendance, MonthlyReport } from '@/interfaces'

export default {
  /**
   * 勤怠表の取得
   *
   * @param {string} projectId
   * @param {string} month
   */
  show: async (projectId: string, month: string): Promise<MonthlyReport> => {
    const docRef = doc(db, 'projects', projectId, 'monthly_reports', month)
    const docSnap = await getDoc(docRef)
    return docSnap.data() as MonthlyReport | undefined
  },

  /**
   * 勤怠表の作成
   *
   * @param {string} projectId
   * @param {string} month
   * @param {MonthlyReport} data
   */
  create: async (projectId: string, month: string, data: MonthlyReport) => {
    const docRef = doc(db, 'projects', projectId, 'monthly_reports', month)
    await setDoc(docRef, data, { merge: true })
    return data
  },

  /**
   * 出退勤情報の編集
   *
   * @param {string} projectId
   * @param {string} month
   * @param {Attendance} data
   */
  updateAttendance: async (projectId: string, month: string, data: Attendance): Promise<MonthlyReport> => {
    const docRef = doc(db, 'projects', projectId, 'monthly_reports', month)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      const removeData = docSnap.data().attendances.find((a: Attendance) => a.date === data.date)
      removeData && await updateDoc(docRef, { attendances: arrayRemove(removeData) })
    }
    await updateDoc(docRef, { attendances: arrayUnion(data) })

    return (await getDoc(docRef)).data() as MonthlyReport
  },

  /**
   * 出退勤情報の削除
   *
   * @param {string} projectId
   * @param {string} month
   * @param {string} date
   */
  deleteAttendance: async (projectId: string, month: string, date: string): Promise<MonthlyReport> => {
    const docRef = doc(db, 'projects', projectId, 'monthly_reports', month)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      const removeData = docSnap.data().attendances.find((a: Attendance) => a.date === date)
      removeData && await updateDoc(docRef, { attendances: arrayRemove(removeData) })
    }

    return (await getDoc(docRef)).data() as MonthlyReport
  },
}
