export interface IAPIConfig {
  API_URL: string;
  YOUTUBE_URL: string;
  YOUTUBE_API_KEY: string;
  YOUTUBE_CHANEL_ID: string;
}

export async function fetchConfig(): Promise<IAPIConfig> {
  const res = await fetch(`${process.env.PUBLIC_URL}/api/config.json`);
  const data = await res.text()
  return JSON.parse(data)
}