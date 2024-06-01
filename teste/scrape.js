// Importações necessárias
const scrape = require('website-scraper');
const PuppeteerPlugin = require('website-scraper-puppeteer');

// Função assíncrona para executar o scraping
async function scrapeWebsite() {
    try {
        await scrape({
            // URLs dos websites a serem raspados
            urls: ['https://www.instagram.com/gopro/'],
            // Diretório onde os dados raspados serão salvos
            directory: 'C:/Users/tiago/Desktop/bet/teste',
            // Plugin Puppeteer com configurações específicas
            plugins: [
                new PuppeteerPlugin({
                    launchOptions: { headless: false }, // Executa o browser visivelmente
                    scrollToBottom: { timeout: 10000, viewportN: 10 }, // Scroll automático até o fim da página
                    blockNavigation: true, // Bloqueia navegações fora da página inicial
                })
            ]
        });
        console.log('Scraping concluído com sucesso.');
    } catch (error) {
        console.error('Erro ao fazer scraping:', error);
    }
}

// Executa a função de scraping
scrapeWebsite();
