import fs from 'fs';
import path from 'path';
import os from 'os';

async function updateScopeForOS() {
  // Load the existing Tauri config
  const configPath = path.join(process.cwd(), 'src-tauri', 'tauri.conf.json');
  const configData = await fs.promises.readFile(configPath, 'utf8');
  const config = JSON.parse(configData);

  // Define scopes for different OSes
  const scopes = {
    win32: ["C:/Users/**/*"],  // Windows
    darwin: ["/Users/**/*"],   // macOS
    linux: ["/home/**/*"]      // Linux
  };

  // Detect the OS using Node's os module
  const osType = os.platform(); // This will return 'win32' for Windows, 'darwin' for macOS, and 'linux' for Linux

  // Update the scope based on the detected OS
  config.tauri.allowlist.fs.scope = scopes[osType] || scopes['linux']; // Default to Linux if OS is unknown

  // Write the updated configuration back to the file
  await fs.promises.writeFile(configPath, JSON.stringify(config, null, 2));
  console.log(`Config updated for ${osType} with scope: ${scopes[osType]}`);
}

// Call the function to update the config
updateScopeForOS();
