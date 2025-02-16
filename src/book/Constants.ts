const colorPalettes = [
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
    ["#D90368", "#820263", "#291720", "#04A777", "#F2A007"], // Neon
    ["#1C1C1C", "#383838", "#F1C40F", "#E74C3C", "#ECF0F1"], // Industrial
    ["#541388", "#D90368", "#F1E9DA", "#2E294E", "#FFD400"], // Urban Chic
    ["#F72585", "#7209B7", "#3A0CA3", "#4361EE", "#4CC9F0"], // Vivid
    ["#FF6F61", "#6B4226", "#F7C59F", "#618B4A", "#F2E394"], // Autumn
    ["#0081A7", "#00AFB9", "#FDFCDC", "#FED9B7", "#F07167"], // Soft Contrast
    ["#14213D", "#FCA311", "#E5E5E5", "#8D99AE", "#A8DADC"], // Modern
    ["#FFB400", "#FF7733", "#C30052", "#3A86FF", "#8338EC"], // High Contrast
    ["#9A031E", "#CBF3F0", "#FFBA08", "#8AC926", "#6A0572"], // Energetic
    ["#264653", "#2A9D8F", "#E9C46A", "#F4A261", "#E76F51"], // Mediterranean
    ["#E63946", "#F1FAEE", "#A8DADC", "#457B9D", "#1D3557"], // Serene
    ["#F8B400", "#FA7D09", "#E63946", "#58355E", "#00A6A6"], // Sunset
    ["#22223B", "#4A4E69", "#9A8C98", "#C9ADA7", "#F2E9E4"], // Muted Elegance
    ["#023047", "#219EBC", "#8ECAE6", "#FFB703", "#FB8500"], // Blue Sunset
    ["#012A4A", "#013A63", "#01497C", "#014F86", "#A9D6E5"], // Deep Ocean
    ["#FF006E", "#FB5607", "#FFBE0B", "#3A86FF", "#8338EC"], // Cyberpunk
    ["#231942", "#5E548E", "#9F86C0", "#BE95C4", "#E0B1CB"], // Royal
    ["#8D99AE", "#EDF2F4", "#EF233C", "#D90429", "#2B2D42"], // Strong Contrast
    ["#184E77", "#1E6091", "#1A759F", "#168AAD", "#34A0A4"], // Aquatic
    ["#222831", "#393E46", "#00ADB5", "#EEEEEE", "#D3E0EA"], // Cyber Minimal
    ["#7B2CBF", "#5A189A", "#3C096C", "#240046", "#10002B"]  // Purple Haze
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