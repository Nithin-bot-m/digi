import os
import zipfile

def create_cloudflare_zip(zip_filename="digiartha-cloudflare-pages.zip"):
    out_dir = "out"
    functions_dir = "functions"
    
    if not os.path.exists(out_dir):
        print(f"Error: {out_dir} directory does not exist.")
        return False
        
    print(f"Creating {zip_filename} from '{out_dir}' and '{functions_dir}'...")
    total_files = 0
    
    with zipfile.ZipFile(zip_filename, 'w', zipfile.ZIP_DEFLATED, compresslevel=6) as z:
        # Add all files from out/ at the root of the zip archive
        for root, dirs, files in os.walk(out_dir):
            for file in files:
                file_path = os.path.join(root, file)
                # Ensure Unix forward slashes for Cloudflare Pages compatibility
                arcname = os.path.relpath(file_path, out_dir).replace('\\', '/')
                z.write(file_path, arcname)
                total_files += 1

    size_mb = os.path.getsize(zip_filename) / (1024 * 1024)
    print(f"Successfully created {zip_filename}: {total_files} files, {size_mb:.2f} MB")
    return True

if __name__ == "__main__":
    create_cloudflare_zip()
