import { redirect } from 'react-router-dom';

export async function adminAuthLoader() {
  // Fake admin check – always allow for now
  return null;
}
