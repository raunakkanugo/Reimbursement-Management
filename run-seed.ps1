$env:TS_NODE_COMPILER_OPTIONS = '{"module":"CommonJS"}'
npx ts-node prisma/seed.ts 2>&1 | Out-String | Write-Host
