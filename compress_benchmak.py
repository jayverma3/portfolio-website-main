import math
import time
import random
from rich.progress import Progress, BarColumn, TimeElapsedColumn, TimeRemainingColumn, TextColumn

# ================================
# Power Unit Class
# ================================
class PowerUnit:
    def __init__(self):
        self.lowest_time = None  # Stores the lowest observed compression time
    
    def capture(self, comp_time):
        """Capture the lowest compression time seen so far."""
        if self.lowest_time is None or comp_time < self.lowest_time:
            self.lowest_time = comp_time
    
    def get_multiplier(self):
        """Generate a dynamic multiplier based on the lowest saved time."""
        if self.lowest_time is None:
            return 1.0
        return 1 + (1 / (self.lowest_time * 100))

# ================================
# Compression Simulation
# ================================
def simulate_compression(file_size_kb):
    """
    Simulates file compression using a progress bar.
    Returns the simulated compression time.
    """
    total = file_size_kb
    chunk_size = max(1, file_size_kb // 100)  # Break into 100 steps

    with Progress(
        TextColumn("[bold green]Compressing[/bold green]"),
        BarColumn(),
        "[progress.percentage]{task.percentage:>3.1f}%",
        TimeElapsedColumn(),
        TimeRemainingColumn(),
        transient=True
    ) as progress:
        task = progress.add_task("Compression", total=total)
        processed = 0
        while processed < total:
            # Simulate processing speed variability
            time.sleep(0.01)
            processed += chunk_size + random.randint(0, chunk_size)
            progress.update(task, advance=chunk_size)

    # Simulate compression time based on random system conditions
    return round(random.uniform(0.005, 0.05), 3)

# ================================
# 1-2-3 Formula with Power Unit
# ================================
def compute_c_123_with_power_unit(comp_time, power_unit):
    TEN = 3 * 3 + 1  # 10 using 1,2,3
    
    # Capture lowest compression time
    power_unit.capture(comp_time)
    
    # Retrieve dynamic multiplier
    multiplier = power_unit.get_multiplier()
    
    # Main epsilon calculation with added complexity
    epsilon = (
        (2 / TEN**3) +
        ((6 + 1) / TEN**4) +
        ((3 + 2) / TEN**5) +
        ((3 + 1) / TEN**6) +
        ((2 + 1) / TEN**7) +
        ((1 + 2) / TEN**8) +
        (2 / TEN**9) +
        ((math.sqrt(3) * multiplier) / TEN**10)
    )
    
    # Apply epsilon to mantissa
    mantissa = (3 - epsilon) * multiplier
    
    # Final computed speed of light
    c = mantissa * TEN**8
    return c

# ================================
# Main Benchmark Loop
# ================================
def run_benchmark():
    file_size_kb = 50000  # 50 MB simulated file
    power_unit = PowerUnit()
    target_time = 0.0001  # Target minimum compression time

    print("\n--- Compression Benchmark with Power Unit Feedback ---\n")

    # Initial compression run
    comp_time = simulate_compression(file_size_kb)
    print(f"\nInitial compression finished in {comp_time} seconds")

    # Compute speed of light using formula
    c_value = compute_c_123_with_power_unit(comp_time, power_unit)
    print(f"Computed speed of light (initial run): {c_value:.0f} m/s")
    print(f"Lowest compression time recorded: {power_unit.lowest_time:.6f} sec")

    # Advanced loop
    while True:
        user_input = input("\nWould you like to run in Advanced Mode using Power Unit? (y/n): ").strip().lower()
        if user_input != "y":
            print("Exiting benchmark.")
            break

        # Advanced run uses stored lowest_time
        advanced_time = simulate_compression(file_size_kb)

        # Multiply with the lowest recorded time to refine the formula
        refined_time = advanced_time * power_unit.lowest_time
        print(f"\nAdvanced compression finished in {advanced_time:.6f} seconds (refined: {refined_time:.6f})")

        # Compute updated speed of light with refinement
        c_value = compute_c_123_with_power_unit(refined_time, power_unit)
        print(f"Computed speed of light (refined): {c_value:.0f} m/s")
        print(f"Updated lowest compression time: {power_unit.lowest_time:.6f} sec")

        # Check for target time
        if power_unit.lowest_time <= target_time:
            print("\nTarget time of 0.0001 sec reached! Benchmark complete.")
            break

# ================================
# Run Script
# ================================
if __name__ == "__main__":
    run_benchmark()
