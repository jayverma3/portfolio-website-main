# compress_decision_demo.py
# Python 3.8+
import zlib
import time
import os
import argparse
from math import cos, radians

# ---------- 123-constructed c (exact expression) ----------
def compute_c_from_123():
    TEN = 3*3 + 1  # = 10
    # Build epsilon step by step
    term1 = 2 / (TEN**3)         # 2 / 10^3 = 0.002
    term2 = (3 * (3**3 - 2)) / (TEN**6)  # 3*(27-2)/10^6 = 75 / 10^6
    term3 = ((1*2*3) * ((1*2*3) + 1)) / (TEN**8)  # 3!*(3!+1)/10^8 = 42 / 10^8

    epsilon = term1 + term2 + term3

    mantissa = 3 - epsilon
    c = mantissa * (TEN**8)  # 10^8 multiplier

    return round(c)  # ensures exact integer: 299792458


# ---------- utilities ----------
def measure_compress_decompress(file_path, level=6):
    """Compress file with zlib at given level, measure times."""
    with open(file_path, "rb") as f:
        data = f.read()
    size_in = len(data)
    # compress
    t0 = time.perf_counter()
    comp = zlib.compress(data, level)
    t1 = time.perf_counter()
    dec = zlib.decompress(comp)
    t2 = time.perf_counter()
    assert dec == data, "Decompressed data mismatch!"
    comp_time = t1 - t0
    decomp_time = t2 - t1
    size_out = len(comp)
    return {
        "size_in": size_in,
        "size_out": size_out,
        "compress_time": comp_time,
        "decompress_time": decomp_time,
        "ratio": size_out / size_in
    }

def human_size(n):
    for u in ['B','KB','MB','GB','TB']:
        if abs(n) < 1024.0:
            return f"{n:3.2f}{u}"
        n /= 1024.0
    return f"{n:.2f}PB"

# ---------- main experiment ----------
def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("file", help="file to test")
    parser.add_argument("--bandwidth-mbps", type=float, default=100.0,
                        help="link bandwidth in megabits/sec")
    parser.add_argument("--distance-km", type=float, default=1000.0,
                        help="one-way distance to receiver in km (for propagation delay)")
    parser.add_argument("--level", type=int, default=6, help="zlib compression level 0-9")
    args = parser.parse_args()

    c = compute_c_from_123()
    print(f"Computed c from 123-expression: {c:.0f} m/s")

    print("Measuring compression...")
    res = measure_compress_decompress(args.file, level=args.level)
    S_in = res["size_in"]
    S_out = res["size_out"]
    print(f"Input: {human_size(S_in)}, Compressed: {human_size(S_out)}, ratio={res['ratio']:.4f}")
    print(f"Compress time = {res['compress_time']:.3f}s, Decompress time = {res['decompress_time']:.3f}s")
    # throughput MB/s
    comp_throughput = (S_in / (1024.0*1024.0)) / res['compress_time']
    decomp_throughput = (S_in / (1024.0*1024.0)) / res['decompress_time']
    print(f"Compress throughput ≈ {comp_throughput:.2f} MB/s, Decompress throughput ≈ {decomp_throughput:.2f} MB/s")

    # Transmission parameters
    B_bytes_per_s = (args.bandwidth_mbps * 1e6) / 8.0  # Mbps -> bytes/sec
    D_m = args.distance_km * 1000.0

    # Times
    T_comp = res['compress_time']
    T_decomp = res['decompress_time']
    T_tx_comp = S_out / B_bytes_per_s
    T_tx_raw = S_in / B_bytes_per_s
    T_prop = D_m / c  # one-way
    # total round-trip? Here we consider one-way propagation only, add as needed
    total_comp_path = T_comp + T_tx_comp + T_prop + T_decomp
    total_raw_path = T_tx_raw + T_prop

    print("\n--- Transfer Decision Summary ---")
    print(f"Bandwidth = {args.bandwidth_mbps} Mbps, Distance = {args.distance_km} km, Propagation (one-way) = {T_prop*1e3:.3f} ms")
    print(f"Total if compress first = {total_comp_path:.3f} s")
    print(f"Total if send raw        = {total_raw_path:.3f} s")
    if total_comp_path < total_raw_path:
        print("RECOMMENDATION: Compress before sending (saves time).")
    else:
        print("RECOMMENDATION: Send raw (compression overhead not worth it).")

if __name__ == "__main__":
    main()
