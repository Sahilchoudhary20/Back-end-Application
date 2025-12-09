import { firestore } from '../config/firebase';
import { Project } from '../models/project.model';

const COLLECTION = 'projects';

export class ProjectRepository {
  private coll = firestore.collection(COLLECTION);

  async create(project: Project): Promise<Project> {
    const now = new Date().toISOString();
    const docRef = await this.coll.add({ ...project, createdAt: now, updatedAt: now });
    const snapshot = await docRef.get();
    return { id: snapshot.id, ...(snapshot.data() as Project) };
  }

  async findById(id: string): Promise<Project | null> {
    const doc = await this.coll.doc(id).get();
    if (!doc.exists) return null;
    return { id: doc.id, ...(doc.data() as Project) };
  }

  async findAll(): Promise<Project[]> {
    const snap = await this.coll.orderBy('createdAt', 'desc').get();
    return snap.docs.map((d) => ({ id: d.id, ...(d.data() as Project) }));
  }

  async update(id: string, data: Partial<Project>): Promise<Project | null> {
    const now = new Date().toISOString();
    const ref = this.coll.doc(id);
    await ref.update({ ...data, updatedAt: now });
    const updated = await ref.get();
    if (!updated.exists) return null;
    return { id: updated.id, ...(updated.data() as Project) };
  }

  async delete(id: string): Promise<boolean> {
    await this.coll.doc(id).delete();
    return true;
  }
}
