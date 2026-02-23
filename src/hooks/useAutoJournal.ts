import { useCallback, useRef } from 'react';
import { useJournalStore } from '../stores/journalStore';

export function useAutoJournal() {
  const addEntry = useJournalStore((s) => s.addEntry);
  const chatCountRef = useRef(0);

  const logVisit = useCallback(
    (locationId: string, locationName: string, kanji: string) => {
      addEntry({
        type: 'visit',
        title: locationName,
        content: `${kanji} (${locationName})`,
        locationId,
      });
    },
    [addEntry]
  );

  const logChatSummary = useCallback(
    (topic: string) => {
      chatCountRef.current += 1;
      if (chatCountRef.current % 5 !== 0) return;
      addEntry({
        type: 'chat',
        title: 'Chat Discovery',
        content: topic,
      });
    },
    [addEntry]
  );

  const logLensDiscovery = useCallback(
    (itemName: string, locationName?: string) => {
      addEntry({
        type: 'lens',
        title: itemName,
        content: locationName
          ? `Found near ${locationName}`
          : `Scanned with Wa-Bi Lens`,
      });
    },
    [addEntry]
  );

  const logFavorite = useCallback(
    (locationId: string, locationName: string) => {
      addEntry({
        type: 'favorite',
        title: locationName,
        content: `Added to favorites`,
        locationId,
      });
    },
    [addEntry]
  );

  return { logVisit, logChatSummary, logLensDiscovery, logFavorite };
}
