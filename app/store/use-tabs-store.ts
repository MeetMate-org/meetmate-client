import { create } from 'zustand';

type Tab = 'board' | 'calendar';

interface TabsState {
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
}

export const useTabsStore = create<TabsState>((set) => ({
  activeTab: 'board',
  setActiveTab: (tab) => set({ activeTab: tab })
})); 