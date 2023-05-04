output_dir=".output"
output_live_dir=".output-live"

# Check if the .output directory exists
if [ -d "$output_dir" ]; then
  # If .output-live directory exists, remove it
  if [ -d "$output_live_dir" ]; then
    rm -rf "$output_live_dir"
  fi

  # Rename .output directory to .output-live
  mv "$output_dir" "$output_live_dir"
else
  echo "Error: $output_dir does not exist."
fi