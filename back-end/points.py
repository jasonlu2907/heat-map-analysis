import pandas as pd

def read_csv_and_generate_ts(csv_file: str, output_ts_file: str):
    # Read the CSV file into a DataFrame
    df = pd.read_csv(csv_file)

    # Validate the required columns
    required_columns = {"Latitude", "Longitude"}
    if not required_columns.issubset(df.columns):
        raise ValueError(f"CSV file must contain columns: {required_columns}")

    # Build the heatmap data array
    heatmap_data = []
    for _, row in df.iterrows():
        heatmap_data.append([row["Latitude"], row["Longitude"], 0.5])

    # Generate TypeScript array string
    ts_data = "const heatmapData: number[][] = [\n"
    for point in heatmap_data:
        ts_data += f"    [{point[0]}, {point[1]}, {point[2]}],\n"
    ts_data += "];\n\nexport default heatmapData;\n"

    # Write the TypeScript data to a file
    with open(output_ts_file, "w") as ts_file:
        ts_file.write(ts_data)

    print(f"TypeScript heatmap data written to {output_ts_file}")

# Example usage
read_csv_and_generate_ts("../HistoricalFireIncidents.csv", "heatmapData.ts")
