// Mock do MongoDB para desenvolvimento sem banco de dados real
class MockSubmission {
  private static submissions: any[] = [];
  private static idCounter = 1;

  constructor(data: any) {
    Object.assign(this, data);
  }

  async save() {
    // Simular delay de banco de dados
    await new Promise(resolve => setTimeout(resolve, 50));
    const submission = {
      _id: String(MockSubmission.idCounter++),
      ...this,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    MockSubmission.submissions.push(submission);
    return submission;
  }

  static async create(data: any) {
    const instance = new MockSubmission(data);
    return await instance.save();
  }

  static async findOne(query: any) {
    // Simular delay de banco de dados
    await new Promise(resolve => setTimeout(resolve, 50));
    return MockSubmission.submissions.find(sub => {
      for (const key in query) {
        if (sub[key] !== query[key]) return false;
      }
      return true;
    }) || null;
  }

  static async find() {
    // Simular delay de banco de dados
    await new Promise(resolve => setTimeout(resolve, 50));
    return {
      sort: (order: any) => ({
        skip: (n: number) => ({
          limit: (l: number) => {
            const sorted = [...MockSubmission.submissions].sort((a, b) => {
              if (order.createdAt === -1) {
                return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
              }
              return 0;
            });
            return sorted.slice(n, n + l);
          }
        })
      }),
      countDocuments: async () => {
        await new Promise(resolve => setTimeout(resolve, 50));
        return MockSubmission.submissions.length;
      },
      lean: () => [...MockSubmission.submissions].sort((a, b) => 
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )
    };
  }

  static async countDocuments(query?: any) {
    // Simular delay de banco de dados
    await new Promise(resolve => setTimeout(resolve, 50));
    if (!query) return MockSubmission.submissions.length;
    return MockSubmission.submissions.filter(sub => {
      for (const key in query) {
        if (key === 'createdAt' && query[key].$gte) {
          if (new Date(sub.createdAt) < new Date(query[key].$gte)) return false;
        } else if (sub[key] !== query[key]) {
          return false;
        }
      }
      return true;
    }).length;
  }

  static async deleteMany() {
    // Simular delay de banco de dados
    await new Promise(resolve => setTimeout(resolve, 100));
    const count = MockSubmission.submissions.length;
    MockSubmission.submissions = [];
    return { deletedCount: count };
  }
}

// Importar o modelo real
import { Submission as RealSubmission } from './Submission.js';

// Usar mock se estiver em modo memory
export const Submission = process.env.MONGODB_URI === 'memory' 
  ? MockSubmission as any
  : RealSubmission;