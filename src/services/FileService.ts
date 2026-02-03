import * as FileSystem from 'expo-file-system';

const BASE_DIR = (FileSystem.documentDirectory || '') + 'scans/';

export interface ScanMetadata {
  device: string;
  timestamp: number;
  sdk: string;
  model: string;
}

export const ensureDirExists = async () => {
  const dirInfo = await FileSystem.getInfoAsync(BASE_DIR);
  if (!dirInfo.exists) {
    await FileSystem.makeDirectoryAsync(BASE_DIR, { intermediates: true });
  }
};

export const saveFaceScan = async (_scanId: string, _step: string, _imageUri: string, _faceData?: any) => {
  try {
    await ensureDirExists();
    const filePath = `${BASE_DIR}scan-${Date.now()}.json`;
    await FileSystem.writeAsStringAsync(filePath, JSON.stringify({ savedAt: Date.now() }));
    return filePath;
  } catch (error) {
    console.error('Error saving scan (stub):', error);
    throw error;
  }
};
