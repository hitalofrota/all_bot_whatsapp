module.exports = {
    session: 'apizap',
    multidevice: true, 
    headless: 'new',
    browserPath: "/usr/bin/google-chrome-stable",
    executablePath: "/usr/bin/google-chrome-stable",
    disableWelcome: true,
    logQR: true,  // Exibe o QR Code no console
    sessionPath: "./tokens/",
    autoClose: false,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-gpu'
    ]
  };
  