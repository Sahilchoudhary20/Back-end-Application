
import { firestore } from '../config/firebase';
import { Task } from '../models/task.model';

const COLLECTION = 'tasks';

export class TaskRepository {
  private coll = firestore.collection(COLLECTION);

  async create(task: Task): Promise<Task> {
    const now = new Date().toISOString();
    const docRef = await this.coll.add({ ...task, createdAt: now, updatedAt: now });
    const snapshot = await docRef.get();
    return { id: snapshot.id, ...(snapshot.data() as Task) };
  }

  async findById(id: string): Promise<Task | null> {
    const doc = await this.coll.doc(id).get();
    if (!doc.exists) return null;
    return { id: doc.id, ...(doc.data() as Task) };
  }

  async findByProject(projectId: string): Promise<Task[]> {
    const snap = await this.coll.where('projectId', '==', projectId).orderBy('createdAt', 'desc').get();
    return snap.docs.map((d) => ({ id: d.id, ...(d.data() as Task) }));
  }

  async update(id: string, data: Partial<Task>): Promise<Task | null> {
    const now = new Date().toISOString();
    const ref = this.coll.doc(id);
    await ref.update({ ...data, updatedAt: now });
    const updated = await ref.get();
    if (!updated.exists) return null;
    return { id: updated.id, ...(updated.data() as Task) };
  }

  async delete(id: string): Promise<boolean> {
    await this.coll.doc(id).delete();
    return true;
  }
}
