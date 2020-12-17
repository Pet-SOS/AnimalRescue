export interface IAPIConfig {
  API_URL: string;
  YOUTUBE_URL: string;
  YOUTUBE_API_KEY: string;
  YOUTUBE_CHANNEL_ID: string;
}

export async function fetchConfig(): Promise<IAPIConfig> {
  const res = await fetch(`${process.env.PUBLIC_URL}/config.json`);
  const data = await res.text();
  return JSON.parse(data);
}
