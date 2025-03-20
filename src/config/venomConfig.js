module.exports = {
    session: 'apizap',
    headless: 'new',
    browserPath: "/usr/bin/google-chrome-stable",
    executablePath: "/usr/bin/google-chrome-stable",
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-gpu'
    ]
  };
  