import platform
import subprocess
import os

def run_shell_script(script_path):
    try:
        subprocess.run(script_path, shell=True, check=True)
        print("mkcert installed successfully.")
    except subprocess.CalledProcessError as e:
        print(f"Error while installing mkcert: {e}")

def main():
    os_name = platform.system()
    dir = os.path.dirname(os.path.realpath(__file__))

    if os_name == "Windows":
        run_shell_script(os.path.join(dir, "mkcert.bat"))
    elif os_name in ["Linux", "Darwin"]:
        run_shell_script(os.path.join(dir, "mkcert.sh"))
    else:
        print(f"Unsupported operating system: {os_name}")

if __name__ == "__main__":
    main()