/**
 * Configuration for Dubai2Djib
 * Number is split to reduce bot scraping
 */
const CONFIG = {
    get whatsappNumber() {
        // Reconstructed number to avoid direct scraping
        const p1 = '971';    // Country code
        const p2 = '529';    // First part
        const p3 = '096';    // Middle part  
        const p4 = '058';    // Last part
        return p1 + p2 + p3 + p4;
    }
};