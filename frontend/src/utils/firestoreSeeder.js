/**
 * Disabled Firestore Seeder
 * All CyberSentinel metrics start strictly at 0 by default.
 */
export const seedInitialTelemetryIfEmpty = async () => {
  // Pure 0-base default state. No automatic seeding.
  return Promise.resolve();
};
