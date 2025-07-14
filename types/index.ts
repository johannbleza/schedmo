export interface Course {
  id?: string;
  name: string;
  course_code?: string;
  instructor?: string;
  location?: string;
  days: string[];
  start_time: string;
  end_time: string;
  schedule_id: string;
  color: string;
}
export interface GeminiApiResponse {
  candidates?: Array<{
    content?: {
      // The 'text' part will now contain a JSON string representing an array of Course objects
      parts?: Array<{
        text?: string;
      }>;
    };
  }>;
}
