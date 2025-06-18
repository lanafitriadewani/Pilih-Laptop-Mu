import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import Papa from 'papaparse';

export async function GET() {
  const cpuPath = path.join(process.cwd(), 'data', 'CPU_benchmark_v4.csv');
  const gpuPath = path.join(process.cwd(), 'data', 'GPU_benchmarks_v7.csv');
  const cpuCsv = fs.readFileSync(cpuPath, 'utf8');
  const gpuCsv = fs.readFileSync(gpuPath, 'utf8');
  const cpuParsed = Papa.parse(cpuCsv, { header: true }).data;
  const gpuParsed = Papa.parse(gpuCsv, { header: true }).data;
  return NextResponse.json({ cpu: cpuParsed, gpu: gpuParsed });
}
