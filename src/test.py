from ascii_magic import AsciiArt

# Load and quickly print the image to your terminal
try:
    my_art = AsciiArt.from_image('Portfolio\src\silky-final.png')
    my_art.to_terminal(columns=80)
except FileNotFoundError:
    print("Please check your image path!")
