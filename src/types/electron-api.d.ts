export interface ElectronAPI {
    invokeSave: (data: any) => void;
    onSaveData: (callback: (data: any) => void) => void;
    saveData: (data: any) => Promise<void>;
    loadData: () => Promise<any>;
    onMenuSave: (callback: () => void) => void; // Make sure this matches the actual implementation
    onMenuLoad: (callback: () => void) => void; // Make sure this matches the actual implementation
    toggleDarkMode: (isDark: boolean) => void;
    getDarkMode: () => Promise<boolean>;
    onToggleTheme: (callback: (isDark: boolean) => void) => void;
  }