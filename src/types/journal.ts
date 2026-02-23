export type JournalEntryType = 'visit' | 'chat' | 'discovery' | 'lens' | 'favorite';

export interface JournalEntry {
  id: string;
  date: number;
  type: JournalEntryType;
  title: string;
  content: string;
  locationId?: string;
  imageBase64?: string;
  mood?: string;
  userNote?: string;
}
