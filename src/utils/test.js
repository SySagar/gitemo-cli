import { execa } from 'execa';
export async function runCommand(props) {
  try {
    await execa('echo', [`Hello, ${props}`], {
      stdio: 'inherit',
    });
  } catch (error) {
    console.error('Command failed:', error);
  }
}
