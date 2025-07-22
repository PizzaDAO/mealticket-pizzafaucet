import localtunnel from 'localtunnel';
import { spawn } from 'child_process';
import { createServer } from 'net';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Load environment variables
dotenv.config({ path: '.env.local' });

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(path.normalize(path.join(__dirname, '..')));

let tunnel;
let nextDev;
let isCleaningUp = false;

// Parse command line arguments for port
const args = process.argv.slice(2);
let port = 3000; // default port

// Look for --port=XXXX, --port XXXX, -p=XXXX, or -p XXXX
args.forEach((arg, index) => {
  if (arg.startsWith('--port=')) {
    port = parseInt(arg.split('=')[1]);
  } else if (arg === '--port' && args[index + 1]) {
    port = parseInt(args[index + 1]);
  } else if (arg.startsWith('-p=')) {
    port = parseInt(arg.split('=')[1]);
  } else if (arg === '-p' && args[index + 1]) {
    port = parseInt(args[index + 1]);
  }
});

async function checkPort(port) {
  return new Promise((resolve) => {
    const server = createServer();
    
    server.once('error', () => {
      resolve(true); // Port is in use
    });
    
    server.once('listening', () => {
      server.close();
      resolve(false); // Port is free
    });
    
    server.listen(port);
  });
}

async function killProcessOnPort(port) {
  try {
    if (process.platform === 'win32') {
      // Windows: Use netstat to find the process
      const netstat = spawn('netstat', ['-ano', '|', 'findstr', `:${port}`]);
      netstat.stdout.on('data', (data) => {
        const match = data.toString().match(/\s+(\d+)$/);
        if (match) {
          const pid = match[1];
          spawn('taskkill', ['/F', '/PID', pid]);
        }
      });
      await new Promise((resolve) => netstat.on('close', resolve));
    } else {
      // Unix-like systems: Use lsof
      const lsof = spawn('lsof', ['-ti', `:${port}`]);
      lsof.stdout.on('data', (data) => {
        data.toString().split('\n').forEach(pid => {
          if (pid) {
            try {
              process.kill(parseInt(pid), 'SIGKILL');
            } catch (e) {
              if (e.code !== 'ESRCH') throw e;
            }
          }
        });
      });
      await new Promise((resolve) => lsof.on('close', resolve));
    }
  } catch (e) {
    // Ignore errors if no process found
  }
}

async function startDev() {
  // Check if the specified port is already in use
  const isPortInUse = await checkPort(port);
  if (isPortInUse) {
    console.error(`Port ${port} is already in use. To find and kill the process using this port:\n\n` +
      (process.platform === 'win32' 
        ? `1. Run: netstat -ano | findstr :${port}\n` +
          '2. Note the PID (Process ID) from the output\n' +
          '3. Run: taskkill /PID <PID> /F\n'
        : `On macOS/Linux, run:\nnpm run cleanup\n`) +
      '\nThen try running this command again.');
    process.exit(1);
  }

  const useTunnel = process.env.USE_TUNNEL === 'true';
  let miniAppUrl;

  if (useTunnel) {
    // Start localtunnel and get URL
    tunnel = await localtunnel({ port: port });
    let ip;
    try {
      ip = await fetch('https://ipv4.icanhazip.com').then(res => res.text()).then(ip => ip.trim());
    } catch (error) {
      console.error('Error getting IP address:', error);
    }

    miniAppUrl = tunnel.url;
    console.log(`
🌐 Local tunnel URL: ${tunnel.url}

💻 To test on desktop:
   1. Open the localtunnel URL in your browser: ${tunnel.url}
   2. Enter your IP address in the password field${ip ? `: ${ip}` : ''} (note that this IP may be incorrect if you are using a VPN)
   3. Click "Click to Submit" -- your mini app should now load in the browser
   4. Navigate to the Warpcast Mini App Developer Tools: https://warpcast.com/~/developers
   5. Enter your mini app URL: ${tunnel.url}
   6. Click "Preview" to launch your mini app within Warpcast (note that it may take ~10 seconds to load)


❗️ You will not be able to load your mini app in Warpcast until    ❗️
❗️ you submit your IP address in the localtunnel password field ❗️


📱 To test in Warpcast mobile app:
   1. Open Warpcast on your phone
   2. Go to Settings > Developer > Mini Apps
   4. Enter this URL: ${tunnel.url}
   5. Click "Preview" (note that it may take ~10 seconds to load)
`);
  } else {
    miniAppUrl = `http://localhost:${port}`;
    console.log(`
💻 To test your mini app:
   1. Open the Warpcast Mini App Developer Tools: https://warpcast.com/~/developers
   2. Scroll down to the "Preview Mini App" tool
   3. Enter this URL: ${miniAppUrl}
   4. Click "Preview" to test your mini app (note that it may take ~5 seconds to load the first time)
`);
  }
  
  // Start next dev with appropriate configuration
  const nextBin = path.normalize(path.join(projectRoot, 'node_modules', '.bin', 'next'));

  nextDev = spawn(nextBin, ['dev', '-p', port.toString()], {
    stdio: 'inherit',
    env: { ...process.env, NEXT_PUBLIC_URL: miniAppUrl, NEXTAUTH_URL: miniAppUrl },
    cwd: projectRoot,
    shell: process.platform === 'win32' // Add shell option for Windows
  });

  // Handle cleanup
  const cleanup = async () => {
    if (isCleaningUp) return;
    isCleaningUp = true;

    console.log('\n\nShutting down...');

    try {
      if (nextDev) {
        try {
          // Kill the main process first
          nextDev.kill('SIGKILL');
          // Then kill any remaining child processes in the group
          if (nextDev?.pid) {
            try {
              process.kill(-nextDev.pid);
            } catch (e) {
              // Ignore ESRCH errors when killing process group
              if (e.code !== 'ESRCH') throw e;
            }
          }
          console.log('🛑 Next.js dev server stopped');
        } catch (e) {
          // Ignore errors when killing nextDev
          console.log('Note: Next.js process already terminated');
        }
      }
      
      if (tunnel) {
        try {
          await tunnel.close();
          console.log('🌐 Tunnel closed');
        } catch (e) {
          console.log('Note: Tunnel already closed');
        }
      }

      // Force kill any remaining processes on the specified port
      await killProcessOnPort(port);
    } catch (error) {
      console.error('Error during cleanup:', error);
    } finally {
      process.exit(0);
    }
  };

  // Handle process termination
  process.on('SIGINT', cleanup);
  process.on('SIGTERM', cleanup);
  process.on('exit', cleanup);
  if (tunnel) {
    tunnel.on('close', cleanup);
  }
}

startDev().catch(console.error); 