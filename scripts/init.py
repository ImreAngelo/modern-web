import os
import platform
import subprocess
import sys

def create_virtualenv():
    '''Create a virtual environment'''
    subprocess.run("python -m venv .venv", shell=True, check=True)

def activate_virtualenv():
    '''Determine the appropriate activation command based on the platform'''
    if platform.system() == "Windows":
        activate_cmd = ".venv\\Scripts\\activate"
    else:
        activate_cmd = "source .venv/bin/activate"

    # Run the activation command
    subprocess.run(activate_cmd, shell=True, check=True)

def main():
    # Check if the virtual environment directory exists
    if not os.path.exists(".venv"):
        print("Creating a virtual environment...")
        create_virtualenv()

    print("Activating the virtual environment...")
    activate_virtualenv()
    ssl()
    
def ssl():
    print("Generating local Root CA")
    subprocess.run(["python", "./scripts/ssl/ssl.py"])

if __name__ == "__main__":
    main()