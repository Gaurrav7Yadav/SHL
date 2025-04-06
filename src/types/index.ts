
export interface MockTest {
  id: string;
  title: string;
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  questions: number;
  duration: string;
  url: string;
}
