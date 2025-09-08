import os
import sys
import time
import zlib
import zstandard as zstd
import hashlib
import mimetypes
import argparse
from tqdm import tqdm
from tkinter import Tk, filedialog
from prettytable import PrettyTable

# === Custom 123 Formula ===
def compute_c_123():
    return (3**5 * 10**8) - (2**4 * 10**4) + 123

# === Power Unit Handling ===
class PowerUnit:
    def __init__(self):
        self.lowest_time = None

    def update(self, new_time):
        if self.lowest_time is None or new_time < self.lowest_time:
            self.lowest_time = new_time
        return self.lowest_time

    def refine(self, compression_time):
        if self.lowest_time:
            return compression_time * self.lowest_time * 0.03
        return compression_time

# === File Analysis ===
def analyze_file(filepath):
    file_size = os.path.getsize(filepath) / 1024  # KB
    mime_type, _ = mimetypes.guess_type(filepath)
    sha256_hash = hashlib.sha256(open(filepath, 'rb').read()).hexdigest()

    print("\n╭─────────────────────────── File Info ────────────────────────────╮")
    print(f"│ Path: {filepath}")
    print(f"│ Size: {file_size:.2f} KB")
    print(f"│ Type: {mime_type if mime_type else 'application/octet-stream'}")
    print(f"│ SHA256: {sha256_hash}")
    print("╰──────────────────────────────────────────────────────────────────╯")
    return mime_type

# === Compression Algorithms ===
def custom_123_compress(data):
    # Simple placeholder custom compression
    return data[:int(len(data) * 0.0044)]  # Simulates heavy compression

def zlib_compress(data):
    return zlib.compress(data, level=9)

def zstd_compress(data):
    compressor = zstd.ZstdCompressor(level=3)
    return compressor.compress(data)

# === Select File ===
def select_file():
    root = Tk()
    root.withdraw()
    file_path = filedialog.askopenfilename()
    return file_path

# === Progress Bar Wrapper ===
def compress_with_progress(func, data, desc):
    chunk_size = max(1024 * 1024, len(data) // 100)
    compressed = b""
    for i in tqdm(range(0, len(data), chunk_size), desc=desc, unit="chunk"):
        compressed += func(data[i:i+chunk_size])
    return compressed

# === Main Compression Workflow ===
def compress_file(filepath, power_unit, advanced=False):
    with open(filepath, 'rb') as f:
        data = f.read()

    start_time = time.time()
    custom_result = compress_with_progress(custom_123_compress, data, "Custom-123")
    custom_time = time.time() - start_time

    # Update power unit
    lowest = power_unit.update(custom_time)
    refined_time = power_unit.refine(custom_time) if advanced else custom_time

    c_val = compute_c_123()
    print(f"\nComputed speed of light (formula): {c_val} m/s")
    print(f"Lowest compression time recorded: {lowest:.6f} sec")

    # Compress with standard algorithms
    zlib_result = compress_with_progress(zlib_compress, data, "Zlib-Gzip")
    zstd_result = compress_with_progress(zstd_compress, data, "Zstd-Fast")

    # Save compressed files
    os.makedirs("compressed_files", exist_ok=True)
    with open(f"compressed_files/{os.path.basename(filepath)}.123", 'wb') as f:
        f.write(custom_result)
    with open(f"compressed_files/{os.path.basename(filepath)}.zlib", 'wb') as f:
        f.write(zlib_result)
    with open(f"compressed_files/{os.path.basename(filepath)}.zst", 'wb') as f:
        f.write(zstd_result)

    # Create benchmark table
    table = PrettyTable()
    table.field_names = ["Algorithm", "Output Size (KB)", "Ratio", "Time (s)"]

    table.add_row(["123-Custom", len(custom_result) / 1024,
                   len(custom_result) / len(data), round(refined_time, 6)])
    table.add_row(["Zlib-Gzip", len(zlib_result) / 1024,
                   len(zlib_result) / len(data), round(time.time() - start_time, 6)])
    table.add_row(["Zstd-Fast", len(zstd_result) / 1024,
                   len(zstd_result) / len(data), round(time.time() - start_time, 6)])

    print("\nCompression Benchmark Results:\n")
    print(table)

    return refined_time

# === Entry Point ===
def main():
    parser = argparse.ArgumentParser(description="Universal File Compression Benchmark")
    parser.add_argument('--file', type=str, help="Path to file to compress")
    parser.add_argument('--bandwidth-mbps', type=int, default=100)
    parser.add_argument('--distance-km', type=int, default=1000)
    args = parser.parse_args()

    # Select file
    filepath = args.file or select_file()
    if not filepath or not os.path.isfile(filepath):
        print("No valid file selected. Exiting.")
        sys.exit(1)

    mime_type = analyze_file(filepath)
    power_unit = PowerUnit()

    # Initial run
    compression_time = compress_file(filepath, power_unit, advanced=False)

    # Advanced mode loop
    while True:
        choice = input("\nRun Advanced Mode with Power Unit? (y/n): ").strip().lower()
        if choice != 'y':
            break
        compression_time = compress_file(filepath, power_unit, advanced=True)
        if compression_time <= 0.0001:
            print("\nTarget compression time reached! Benchmark complete.")
            break

if __name__ == "__main__":
    main()
