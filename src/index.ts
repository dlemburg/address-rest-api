import 'dotenv/config';
import { startServer } from './server';

async function main() {
  await startServer();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
