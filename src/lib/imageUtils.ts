import { getPaletteFromURL } from 'color-thief-node';
import chroma from 'chroma-js'

/**
  * Given an image URL, returns the most vibrant color from the image in hex format.
  * @param imageUrl the URL of the image
  * @returns the most vibrant color in hex format
  */
export async function getMostVibrantColor(imageUrl: string) {
    const palette = await getPaletteFromURL(imageUrl, 5); 
    let mostVibrantColor = null;
    let maxChroma = -1;

    palette.forEach(color => {
        const lchColor = chroma(color).lch();  // Convert to LCH [L, C, H]
        const chromaValue = lchColor[1];       // Get chroma (perceptual saturation)

        if (chromaValue > maxChroma) {
            maxChroma = chromaValue;
            mostVibrantColor = color;
        }
    });

    return mostVibrantColor;
}

/**
  * Mixes an array of colors together and returns the resulting color in hex format.
  * The colors are mixed in LCH space to maintain better saturation.
  * The resulting color is then increased in saturation to make it more vibrant.
  * @param colors an array of colors to mix, each in the format [red, green, blue]
  * @returns the mixed color in hex format
  */
export function mixColors(colors: [number, number, number][]) {
  // Mix the colors in LCH space to keep better saturation
  let mixedColor = chroma.average(colors, 'lch');
  
  // Increase the saturation of the mixed color to make it more vibrant
  let saturatedColor = mixedColor.saturate(1.5);  // You can adjust the saturation value if you want
  
  return saturatedColor.hex();  // Return the final color in HEX format
}
