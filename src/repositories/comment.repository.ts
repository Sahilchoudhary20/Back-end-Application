import { firestore } from '../config/firebase';
import { Comment } from '../models/comment.model';

const COLLECTION = 'comments';

export class CommentRepository {
  private coll = firestore.collection(COLLECTION);

  async create(comment: Comment): Promise<Comment> {
    const now = new Date().toISOString();
    const docRef = await this.coll.add({ ...comment, createdAt: now });
    const snapshot = await docRef.get();
    return { id: snapshot.id, ...(snapshot.data() as Comment) };
  }

  async findByResource(resourceType: string, resourceId: string): Promise<Comment[]> {
    const snap = await this.coll
      .where('resourceType', '==', resourceType)
      .where('resourceId', '==', resourceId)
      .orderBy('createdAt', 'desc')
      .get();
    return snap.docs.map((d) => ({ id: d.id, ...(d.data() as Comment) }));
  }

  async delete(id: string): Promise<boolean> {
    await this.coll.doc(id).delete();
    return true;
  }
}
