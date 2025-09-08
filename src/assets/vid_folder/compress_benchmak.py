import os
import time
import zipfile
import json
from tkinter import Tk, filedialog, Button, Label, messagebox

STORAGE_DIR = "power_units"
os.makedirs(STORAGE_DIR, exist_ok=True)

# --- 123 Formula Computation ---
def compute_c_123(power_level=8):
    TEN = 3*3 + 1  # = 10
    epsilon = (
        (2 / TEN**3) +
        ((6 + 1) / TEN**4) +
        ((3 + 2) / TEN**5) +
        ((3 + 1) / TEN**6) +
        (2 / TEN**8)
    )
    mantissa = 3 - epsilon
    c = mantissa * (TEN ** power_level)
    return mantissa, epsilon, c

# --- File Split ---
def split_file(filepath, chunk_size=1024):
    with open(filepath, "rb") as f:
        while True:
            chunk = f.read(chunk_size)
            if not chunk:
                break
            yield chunk

# --- Compression ---
def compress_file(input_file):
    start_time = time.time()
    base_name = os.path.basename(input_file)
    out_name = base_name + ".123"

    mantissa, epsilon, c = compute_c_123()

    # Prepare .123 archive
    with zipfile.ZipFile(out_name, "w", zipfile.ZIP_DEFLATED) as zipf:
        # Store chunks
        for i, chunk in enumerate(split_file(input_file, 2048)):
            zipf.writestr(f"chunks/chunk_{i}", chunk)

        # Store manifest metadata
        manifest = {
            "original": base_name,
            "mantissa": mantissa,
            "epsilon": epsilon,
            "c": c,
            "power_units": [epsilon],  # can be extended
            "chunks": i + 1
        }
        zipf.writestr("manifest.json", json.dumps(manifest, indent=2))

    duration = round(time.time() - start_time, 6)
    target_path = os.path.join(STORAGE_DIR, out_name)
    os.replace(out_name, target_path)

    messagebox.showinfo(
        "Compression Complete",
        f"File: {base_name}\nChunks: {i+1}\n"
        f"Epsilon (power unit): {epsilon}\n"
        f"C ≈ {c:.0f} m/s\n"
        f"Saved as: {target_path}\n"
        f"Time: {duration}s"
    )

# --- Decompression ---
def decompress_file(archive_path):
    start_time = time.time()
    with zipfile.ZipFile(archive_path, "r") as zipf:
        manifest = json.loads(zipf.read("manifest.json").decode("utf-8"))
        original_name = manifest["original"]
        epsilons = manifest["power_units"]

        # Recompute c with higher powers
        recon_c_values = []
        for i, eps in enumerate(epsilons, start=1):
            mantissa, _, c = compute_c_123(8+i)  # increase power
            recon_c_values.append(c)

        # Ensure decompression folder exists
        DECOMP_DIR = "decompressed_files"
        os.makedirs(DECOMP_DIR, exist_ok=True)

        # Build full output path
        output_path = os.path.join(DECOMP_DIR, original_name)

        # Rebuild file from chunks
        with open(output_path, "wb") as out_f:
            for i in range(manifest["chunks"]):
                chunk = zipf.read(f"chunks/chunk_{i}")
                out_f.write(chunk)

    duration = round(time.time() - start_time, 6)
    messagebox.showinfo(
        "Decompression Complete",
        f"Rebuilt: {output_path}\n"
        f"Recomputed C values: {recon_c_values}\n"
        f"Time: {duration}s"
    )


# --- File Selection ---
def select_and_compress():
    file_path = filedialog.askopenfilename(title="Select a file to compress")
    if file_path:
        compress_file(file_path)

def select_and_decompress():
    file_path = filedialog.askopenfilename(title="Select a .123 file", filetypes=[("123 Files", "*.123")])
    if file_path and file_path.endswith(".123"):
        decompress_file(file_path)
    else:
        messagebox.showerror("Error", "Invalid file selected.")

# --- GUI ---
def main():
    root = Tk()
    root.title("123 Compression System")
    root.geometry("420x220")

    Label(root, text="123 Compression System", font=("Arial", 16, "bold")).pack(pady=10)
    Button(root, text="Compress File", command=select_and_compress, width=25, height=2).pack(pady=5)
    Button(root, text="Decompress File", command=select_and_decompress, width=25, height=2).pack(pady=5)
    Button(root, text="Exit", command=root.quit, width=25, height=2).pack(pady=5)

    root.mainloop()

if __name__ == "__main__":
    main()
