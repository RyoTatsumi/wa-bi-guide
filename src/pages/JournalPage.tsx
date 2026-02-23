import React from 'react';
import { ArrowLeft, MapPin, MessageSquare, Camera, Heart, BookOpen } from 'lucide-react';
import { useAppStore } from '../stores';
import { useJournalStore } from '../stores/journalStore';
import { useTranslation } from '../i18n';
import { JournalEntryType } from '../types';

const ICONS: Record<JournalEntryType, React.FC<any>> = {
  visit: MapPin,
  chat: MessageSquare,
  lens: Camera,
  discovery: Camera,
  favorite: Heart,
};

const COLORS: Record<JournalEntryType, string> = {
  visit: 'bg-blue-50 text-japan-blue',
  chat: 'bg-purple-50 text-purple-600',
  lens: 'bg-amber-50 text-kintsugi-gold',
  discovery: 'bg-green-50 text-green-600',
  favorite: 'bg-pink-50 text-pink-500',
};

const JournalPage: React.FC = () => {
  const { t } = useTranslation();
  const setSubView = useAppStore((s) => s.setSubView);
  const entries = useJournalStore((s) => s.entries);
  const updateNote = useJournalStore((s) => s.updateNote);
  const getStats = useJournalStore((s) => s.getStats);
  const stats = getStats();

  const grouped = entries.reduce<Record<string, typeof entries>>(
    (acc, entry) => {
      const dateKey = new Date(entry.date).toLocaleDateString();
      if (!acc[dateKey]) acc[dateKey] = [];
      acc[dateKey].push(entry);
      return acc;
    },
    {}
  );

  return (
    <div className="flex flex-col h-full bg-washi-white animate-fade-in">
      <header className="p-5 flex items-center justify-between bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100">
        <button onClick={() => setSubView('main')} className="text-japan-blue">
          <ArrowLeft size={22} />
        </button>
        <p className="text-lg text-japan-blue font-serif font-bold">
          {t('journal.title')}
        </p>
        <div className="w-6" />
      </header>

      <div className="flex justify-around py-4 bg-white border-b border-gray-100">
        <div className="text-center">
          <p className="text-lg font-bold text-japan-blue">{stats.totalEntries}</p>
          <p className="text-xs text-zen-gray">{t('journal.entries', { count: stats.totalEntries })}</p>
        </div>
        <div className="text-center">
          <p className="text-lg font-bold text-japan-blue">{stats.daysActive}</p>
          <p className="text-xs text-zen-gray">{t('journal.daysActive', { count: stats.daysActive })}</p>
        </div>
        <div className="text-center">
          <p className="text-lg font-bold text-japan-blue">{stats.placesVisited}</p>
          <p className="text-xs text-zen-gray">{t('journal.placesVisited', { count: stats.placesVisited })}</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-6 pb-24">
        {entries.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <BookOpen size={48} className="text-gray-200 mb-4" />
            <p className="text-base font-serif text-sumi-black mb-2">
              {t('journal.empty')}
            </p>
            <p className="text-sm text-zen-gray">{t('journal.emptyDesc')}</p>
          </div>
        ) : (
          Object.entries(grouped).map(([dateStr, dayEntries]) => (
            <div key={dateStr}>
              <h3 className="text-xs uppercase tracking-wider text-zen-gray font-bold mb-3 sticky top-0 bg-washi-white py-1 z-10">
                {dateStr}
              </h3>
              <div className="space-y-3">
                {dayEntries.map((entry) => {
                  const Icon = ICONS[entry.type] || MapPin;
                  const colorClass = COLORS[entry.type] || COLORS.visit;
                  return (
                    <div
                      key={entry.id}
                      className="p-4 bg-white border border-gray-100 rounded-xl shadow-sm"
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${colorClass}`}
                        >
                          <Icon size={16} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-bold text-sumi-black">
                            {entry.title}
                          </p>
                          <p className="text-xs text-zen-gray mt-1">
                            {entry.content}
                          </p>
                          <p className="text-[10px] text-zen-gray/50 mt-2">
                            {new Date(entry.date).toLocaleTimeString([], {
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </p>
                          <input
                            type="text"
                            placeholder={t('journal.addNote')}
                            value={entry.userNote || ''}
                            onChange={(e) => updateNote(entry.id, e.target.value)}
                            className="mt-2 w-full text-xs border-b border-gray-100 focus:border-japan-blue outline-none py-1 text-zen-gray bg-transparent"
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default JournalPage;
