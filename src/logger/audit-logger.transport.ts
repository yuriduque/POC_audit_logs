import build from 'pino-abstract-transport';
import SonicBoom from 'sonic-boom';
import { once } from 'events';
import * as fs from 'fs';
import * as path from 'path';

export default async function (opts) {
  const logDir = path.dirname(opts.auditDestination || '');
  if (logDir) {
    fs.mkdirSync(logDir, { recursive: true });
  }

  console.log('Audit log destination:', opts.auditDestination);

  const destination = new SonicBoom({
    dest: opts.auditDestination || 1,
    sync: true,
  });

  await once(destination, 'ready');

  return build(
    async source => {
      for await (const obj of source) {
        if (obj.audit) {
          const toDrain = !destination.write(JSON.stringify(obj) + '\n');
          if (toDrain) {
            await once(destination, 'drain');
          }
        }
      }
    },
    {
      async close() {
        destination.end();
        await once(destination, 'close');
      },
    },
  );
}
