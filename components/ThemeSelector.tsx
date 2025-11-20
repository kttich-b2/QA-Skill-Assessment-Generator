import React from 'react';
import { Theme } from '../types';

interface ThemeSelectorProps {
  themes: Theme[];
  selectedThemes: string[];
  onThemeToggle: (themeId: string) => void;
}

const ThemeSelector: React.FC<ThemeSelectorProps> = ({ themes, selectedThemes, onThemeToggle }) => {
  const groupedThemes = themes.reduce((acc, theme) => {
    // FIX: The original logic for grouping themes was confusing TypeScript's type inference.
    // This more explicit version ensures `groupedThemes` has the correct type, which resolves the downstream error.
    const category = theme.category;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(theme);
    return acc;
  }, {} as Record<string, Theme[]>);

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-slate-200">
      <h2 className="text-xl font-bold text-slate-800 mb-1">Step 1: Select Key Themes</h2>
      <p className="text-slate-500 mb-6">Choose one or more themes to generate a tailored test scenario.</p>
      
      <div className="space-y-6">
        {Object.entries(groupedThemes).map(([category, themeItems]) => (
          <div key={category}>
            <h3 className="text-lg font-semibold text-slate-700 mb-3 border-b pb-2">{category}</h3>
            <div className="flex flex-wrap gap-2">
              {themeItems.map((theme) => {
                const isSelected = selectedThemes.includes(theme.id);
                return (
                  <button
                    key={theme.id}
                    onClick={() => onThemeToggle(theme.id)}
                    className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
                      ${isSelected 
                        ? 'bg-indigo-600 text-white shadow-md' 
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                  >
                    {theme.title}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ThemeSelector;
