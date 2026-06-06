import base64

def generate_svg_dither(level, fill_color='#000000'):
    # 4x4 pixel grid representations (16 pixels total)
    # We define which coordinates are filled (1) or empty (0)
    # 0 = transparent, 1 = filled
    grids = {
        85: [
            [0, 1, 1, 1],
            [1, 1, 1, 1],
            [1, 1, 0, 1],
            [1, 1, 1, 1]
        ],
        75: [
            [0, 1, 0, 1],
            [1, 1, 1, 1],
            [0, 1, 0, 1],
            [1, 1, 1, 1]
        ],
        60: [
            [0, 1, 0, 1],
            [1, 1, 1, 0],
            [0, 1, 0, 1],
            [1, 0, 1, 1]
        ],
        50: [  # Checkerboard
            [1, 0, 1, 0],
            [0, 1, 0, 1],
            [1, 0, 1, 0],
            [0, 1, 0, 1]
        ],
        40: [
            [1, 0, 1, 0],
            [0, 0, 0, 1],
            [1, 0, 1, 0],
            [0, 1, 0, 0]
        ],
        25: [
            [1, 0, 1, 0],
            [0, 0, 0, 0],
            [1, 0, 1, 0],
            [0, 0, 0, 0]
        ],
        12: [
            [1, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 1, 0],
            [0, 0, 0, 0]
        ]
    }
    
    if level not in grids:
        return ""
        
    grid = grids[level]
    svg_content = f'<svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 4 4" shape-rendering="crispEdges">\n'
    for y in range(4):
        for x in range(4):
            if grid[y][x] == 1:
                svg_content += f'  <rect x="{x}" y="{y}" width="1" height="1" fill="{fill_color}"/>\n'
    svg_content += '</svg>'
    
    encoded = base64.b64encode(svg_content.encode('utf-8')).decode('utf-8')
    return f"data:image/svg+xml;base64,{encoded}"

def main():
    print("Generating dither CSS patterns...")
    
    # We generate dither patterns for both Black (on white bg) and White (on black bg)
    levels = [85, 75, 60, 50, 40, 25, 12]
    
    css_content = "/* Pixel-Perfect Dither Patterns (Generated) */\n\n"
    
    # Black dither patterns
    for lvl in levels:
        data_uri = generate_svg_dither(lvl, '#000000')
        css_content += f".dither-blk-{lvl} {{\n  background-image: url('{data_uri}');\n  background-size: 8px 8px;\n  background-repeat: repeat;\n}}\n\n"
        
    # White dither patterns
    for lvl in levels:
        data_uri = generate_svg_dither(lvl, '#ffffff')
        css_content += f".dither-wht-{lvl} {{\n  background-image: url('{data_uri}');\n  background-size: 8px 8px;\n  background-repeat: repeat;\n}}\n\n"
        
    # CSS helper classes for dither transitions
    css_content += """
/* Dither Gradient Patterns */
.dither-gradient-down {
  display: flex;
  flex-direction: column;
  width: 100%;
}
.dither-gradient-down > div {
  height: 8px;
  width: 100%;
}

.dither-gradient-up {
  display: flex;
  flex-direction: column-reverse;
  width: 100%;
}
.dither-gradient-up > div {
  height: 8px;
  width: 100%;
}

.dither-gradient-right {
  display: flex;
  flex-direction: row;
  height: 100%;
}
.dither-gradient-right > div {
  width: 8px;
  height: 100%;
}

.dither-gradient-left {
  display: flex;
  flex-direction: row-reverse;
  height: 100%;
}
.dither-gradient-left > div {
  width: 8px;
  height: 100%;
}
"""
    
    out_path = "src/dither.css"
    with open(out_path, "w") as f:
        f.write(css_content)
        
    print(f"Successfully generated dither CSS file: {out_path}")

if __name__ == '__main__':
    main()
