import { Option } from './Options';

export interface QuizQuestion {
  questionId: number;
  questionText: string;
  options: Option[];
  answer: string;
  explanation: string;
  selectedOption: string;
}
