export const colorPalettes = [
    ["#2C3E50", "#BDC3C7", "#8E44AD", "#ECF0F1", "#34495E"], // Elegant
    ["#A8E6CF", "#DCEDC1", "#FFD3B6", "#FFAAA5", "#FF8B94"], // Relaxing
    ["#0D0D0D", "#1A1A1A", "#00FFFF", "#00FF99", "#FF00FF"], // Tech
    ["#000000", "#3700FF", "#00F6ED", "#FA00FF", "#FFFFFF"], // Futuristic
    ["#FF5E78", "#FF9A8C", "#FFD3B4", "#FFF5D7", "#FF7597"], // Romantic
    ["#000000", "#FFFFFF", "#FF0000", "#00FF00", "#0000FF"], // Brutalist
    ["#F4A261", "#E76F51", "#2A9D8F", "#264653", "#E9C46A"], // Earthy
    ["#3E92CC", "#2A628F", "#13293D", "#F9C80E", "#F86624"], // Oceanic
    ["#6A0572", "#AB83A1", "#E5C3D1", "#F5E6E8", "#FFB5A7"], // Pastel
    ["#3D348B", "#7678ED", "#F7B801", "#F35B04", "#A4036F"], // Bold
    ["#1B1B1B", "#525252", "#969696", "#DADADA", "#FFFFFF"], // Monochrome
    ["#FF9F1C", "#FFBF69", "#CBF3F0", "#2EC4B6", "#E71D36"], // Playful
    ["#0F4C81", "#00A8E8", "#7A77B9", "#B8C5D6", "#F3E8EE"], // Cool Tones
    ["#1A1423", "#3D314A", "#684756", "#96705B", "#AB8476"], // Vintage
    ["#ED6A5A", "#F4F1BB", "#9BC1BC", "#5D576B", "#E6EBE0"], // Warm & Cozy
    ["#D90368", "#820263", "#291720", "#04A777", "#F2A007"]  // Neon
];

export const colorsSeparator = ',';

export const getRandomPalette = () => {
    const randomIndex = Math.floor(Math.random() * colorPalettes.length);
    return colorPalettes[randomIndex];
};

export const getContrastColor = (color: string) => {
    const hex = color.charAt(0) === '#' ? color.substring(1, 7) : color;
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness > 155 ? 'black' : 'white';
};