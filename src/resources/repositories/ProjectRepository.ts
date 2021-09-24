import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  deleteDoc,
  query,
  where,
} from 'firebase/firestore/lite'
import { db } from '@/plugins/firebase'
import { Project } from '@/interfaces'
import { User } from 'firebase/auth'

const resource = collection(db, 'projects')

export default {
  list: async (user: User): Promise<Project[]> => {
    if (!user) return []

    const projects = []
    const results = await getDocs(query(resource, where('userId', '==', user.uid)))
    results.forEach(doc => projects.push({
      id: doc.id,
      ...doc.data(),
    } as Project))

    return projects
  },

  show: async (projectId: string): Promise<Project|null> => {
    const docRef = doc(db, 'projects', projectId)
    const docSnap = await getDoc(docRef)
    return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } as Project : null
  },

  add: (project: Project) => {
    return addDoc(resource, project)
  },

  delete: (projectId: string): Promise<void> => {
    return deleteDoc(doc(resource, projectId))
  },
}
