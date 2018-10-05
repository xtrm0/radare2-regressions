#!/usr/bin/env node

const NeoSuite = require('../lib');
console.error('[NEOSUITE] Refactored r2r.js from the ground');
const dbDir = process.argv[2] || 'db/cmd';

async function main() {
  const ns = new NeoSuite(dbDir);
  try {
    const tests = await ns.load();
    // console.log(JSON.stringify(tests, null, 2));
    // what do with those tests?
    for (let test of tests) {
      testToText(test);
    }
console.error();
  } catch (e) {
    console.error(e);
  } finally {
    console.error('done');
  }
  return 0;
}

main().then(process.exit).catch(console.error);

function testToText(test) {
  console.log('NAME=' + test.name);
  console.log('FILE=' + test.file);
  if (test.path) {
    console.log('PATH=' + test.path);
  }
  if (test.arch) {
    console.log('ARCH=' + test.arch);
  }
  if (test.bits) {
    console.log('BITS=' + test.bits);
  }
  if (test.broken) {
    console.log('BROKEN=1');
  }
  // console.log('CMDS=' + test.cmds.join(';'));
  console.log('CMDS=<<EOF\n' + test.cmds.join('\n') + '\nEOF');
  console.log('EXPECT=<<EOF\n' + test.expect + '\nEOF');
  console.log('RUN\n');
}
