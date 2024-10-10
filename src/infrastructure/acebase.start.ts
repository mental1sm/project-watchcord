import { AceBase } from 'acebase';

export const runAcebase = async (databaseName: string) => {
  const db = new AceBase(databaseName, {
    storage: {
      removeVoidProperties: true
    }
  });
  await db.ready();
  return db;
}